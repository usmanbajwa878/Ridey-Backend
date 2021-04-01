const stripe = require('stripe')('sk_test_51Ht7oBJMCSB6b0431pEJYaQ5U7CBlf2zmVjZu03mV4cgoKUG01xmi0pOV9kSvxT0Rrm0VveesmMHLHgIH7uEiSe800HTVCuST1');
const uuid = require('uuid').v4;
const {
    PAYMENT_SUCCESS,
    SUCCESS_TRUE,
    SUCCESS_FALSE,
    CARD_ADDED_SUCCESS,
    CARD_ADDED_FAILED,
    CARD_FOUND_SUCCESS,
    NO_CARD_FOUND,
    CARD_REQUEST_FAILED,
    CARD_DELETED_SUCCESS,
    NO_REGEISTERED_CARD,
    PAYMENT_INVALID_CARD,
    TRANSACTIONS_FOUND_EMPTY,
    TRANSACTIONS_REQUEST_FAILED,
} = require('../Constants/Message');
const { generateMessage } = require('../utils/generateMessage');
const { OK, SUCCESS, FAILED, NOT_FOUND } = require('../Constants/StatusCode');
const { createPaymentObject, createCardObject, findPaymentUser, getAllPaymentUsers, deletePaymentCard, addtoExistingPaymentCard, createTransactionObject,getAllUserTransactions } = require('../utils/PaymentCard');




exports.makeTransaction = async (req, res) => {
    console.log(req.body)
    const idempontencyKey = uuid();
    const { token } = req.body;
    try {
        const customer = await stripe.customers.create({
            description: "test Customer",
            phone: req.body.user.phoneNumber,
            source: token,
            name: req.body.user.name
        })
        console.log("cusotmer", customer)
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'Paid for ride',
            customer: customer.id,
        });
        console.log("charge", charge);
        if (charge.status === 'succeeded') {
            const transaction = await createTransactionObject(req,charge);
            await transaction.save();
            return res.status(SUCCESS).json(generateMessage(PAYMENT_SUCCESS, SUCCESS, SUCCESS_TRUE, null));
        } else {
            return res.status(FAILED).json(generateMessage(PAYMENT_INVALID_CARD, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        console.log(error)
        return res.status(FAILED).json(generateMessage(CARD_REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }

}



exports.getAllUserTransactions = async (req, res) => {
    try {
        const { isExists, data } = await getAllUserTransactions(req);
        if (isExists) {
            return res.status(SUCCESS).json(generateMessage(CARD_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(NOT_FOUND).json(generateMessage(NO_CARD_FOUND, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(CARD_REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}

exports.getAllUsersPaymentCards = async (req, res) => {
    try {
        const { isExists, data } = await getAllPaymentUsers(req);
        if (isExists) {
            return res.status(SUCCESS).json(generateMessage(TRANSACTIONS_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(NOT_FOUND).json(generateMessage(TRANSACTIONS_FOUND_EMPTY, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(TRANSACTIONS_REQUEST_FAILED , FAILED, SUCCESS_FALSE, null));
    }
}
exports.getUserCards = async (req, res) => {
    console.log("called", req.body)
    try {
        const { isExists, data } = await findPaymentUser(req);
        if (isExists) {
            return res.status(SUCCESS).json(generateMessage(CARD_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(NOT_FOUND).json(generateMessage(NO_CARD_FOUND, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(CARD_REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}
exports.addUserCards = async (req, res) => {
    try {
        const { isExists, data } = await findPaymentUser(req);
        if (isExists) {
            const cardObj = await createCardObject(req);
            const paymentObj = await addtoExistingPaymentCard(req, cardObj)
            await paymentObj.save();
            return res.status(OK).json(generateMessage(CARD_ADDED_SUCCESS, OK, SUCCESS_TRUE, null));
        } else {
            const cardObj = await createCardObject(req);
            const paymentObj = await createPaymentObject(req, cardObj)
            await paymentObj.save();
            return res.status(OK).json(generateMessage(CARD_ADDED_SUCCESS, OK, SUCCESS_TRUE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(CARD_REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}

exports.deleteUserCard = async (req, res) => {
    try {
        const { isExists, data } = await findPaymentUser(req);
        if (isExists) {
            await deletePaymentCard(req);
            return res.status(OK).json(generateMessage(CARD_DELETED_SUCCESS, OK, SUCCESS_TRUE, null));
        } else {
            return res.status(OK).json(generateMessage(NO_CARD_FOUND, FAILED, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(CARD_REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}