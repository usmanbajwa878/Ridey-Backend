const Payment = require('../Models/Payment/Payment');
const Card = require('../Models/Card/Card');
const Transaction = require('../Models/Transaction/Transaction');
const mongoose = require('mongoose');


exports.createPaymentObject = (req,cardObj) => {
    const payment = new Payment({
        entryId: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        payments:[{...cardObj}]
    });
    return payment;
}

exports.createCardObject = (req) => {
    const card = new Card({
        cardId: mongoose.Types.ObjectId(),
        cardNumber: req.body.cardNumber,
        cvc:req.body.cvc,
        expiryMonth:req.body.expiryMonth,
        expiryYear:req.body.expiryYear,
    });
    return card;
}


// charge {
//     id: 'ch_1IS5kuJMCSB6b043ECMo913t',
//     object: 'charge',
//     amount: 200,
//     amount_captured: 200,
//     amount_refunded: 0,
//     application: null,
//     application_fee: null,
//     application_fee_amount: null,
//     balance_transaction: 'txn_1IS5kuJMCSB6b043NpmvkxrH',
//     billing_details: {
//       address: {
//         city: null,
//         country: null,
//         line1: null,
//         line2: null,
//         postal_code: null,
//         state: null
//       },
//       email: null,
//       name: null,
//       phone: null
//     },
//     calculated_statement_descriptor: 'Stripe',
//     captured: true,
//     created: 1615058740,
//     currency: 'usd',
//     customer: 'cus_J4EDCVUhUebFxW',
//     description: 'Paid for ride',
//     destination: null,
//     dispute: null,
//     disputed: false,
//     failure_code: null,
//     failure_message: null,
//     fraud_details: {},
//     invoice: null,
//     livemode: false,
//     metadata: {},
//     on_behalf_of: null,
//     order: null,
//     outcome: {
//       network_status: 'approved_by_network',
//       reason: null,
//       risk_level: 'normal',
//       risk_score: 63,
//       seller_message: 'Payment complete.',
//       type: 'authorized'
//     },
//     paid: true,
//     payment_intent: null,
//     payment_method: 'card_1IS5ksJMCSB6b0433zapBnvg',
//     payment_method_details: {
//       card: {
//         brand: 'visa',
//         checks: [Object],
//         country: 'US',
//         exp_month: 8,
//         exp_year: 2022,
//         fingerprint: 'MH4v7m75obDf9ysO',
//         funding: 'credit',
//         installments: null,
//         last4: '4242',
//         network: 'visa',
//         three_d_secure: null,
//         wallet: null
//       },
//       type: 'card'
//     },
//     receipt_email: null,
//     receipt_number: null,
//     receipt_url: 'https://pay.stripe.com/receipts/acct_1Ht7oBJMCSB6b043/ch_1IS5kuJMCSB6b043ECMo913t/rcpt_J4EDIYqz0eq4Ku9Jb0x9QmeTQLYMNNu',
//     refunded: false,
//     refunds: {
//       object: 'list',
//       data: [],
//       has_more: false,
//       total_count: 0,
//       url: '/v1/charges/ch_1IS5kuJMCSB6b043ECMo913t/refunds'
//     },
//     review: null,
//     shipping: null,
//     source: {
//       id: 'card_1IS5ksJMCSB6b0433zapBnvg',
//       object: 'card',
//       address_city: null,
//       address_country: null,
//       address_line1: null,
//       address_line1_check: null,
//       address_line2: null,
//       address_state: null,
//       address_zip: null,
//       address_zip_check: null,
//       brand: 'Visa',
//       country: 'US',
//       customer: 'cus_J4EDCVUhUebFxW',
//       cvc_check: 'pass',
//       dynamic_last4: null,
//       exp_month: 8,
//       exp_year: 2022,
//       fingerprint: 'MH4v7m75obDf9ysO',
//       funding: 'credit',
//       last4: '4242',
//       metadata: {},
//       name: null,
//       tokenization_method: null
//     },
//     source_transfer: null,
//     statement_descriptor: null,
//     statement_descriptor_suffix: null,
//     status: 'succeeded',
//     transfer_data: null,
//     transfer_group: null
//   }
exports.createTransactionObject = (req,charge) => {
    console.log("charge",charge)
    const transaction = new Transaction({
        entryId: mongoose.Types.ObjectId(),
        userId:req.body.user.userId,
        tripId:req.body.tripId,
        transactionId:charge.id,
        balanceTransactionId:charge.balance_transaction,
        amount:req.body.amount,
        cardNumber: charge.payment_method,
        customerId:charge.customer,
        description:charge.description,
        paymentMethod:charge.payment_method_details,
        source:charge.source,
        receipt_url:charge.receipt_url,
        user:req.body.user,
    });
    console.log("object to be saved",transaction)
    return transaction;
}



exports.deletePaymentCard = async (req) => {
    let status = false;
    console.log("deleteId IN REQUEST", id)
    const data = await Payment.findOneAndUpdate(
        { userId: req.body.userId },
        { $pull: { 'payments': { cardId: req.body.cardId } } }
    );
    console.log("delete", data);
    status = true;
    return status;
}

exports.addtoExistingPaymentCard = async (req,paymentObj) => {
    let status = false;
    const data = await Payment.findOneAndUpdate(
        { userId: req.body.userId },
        { $push: { 'payments': { paymentObj } } }
    );
    console.log("added", data);
    status = true;
    return status;
}





exports.findPaymentUser = async (req) => {
    let isExists = false;
    const data = await Payment.find({ userId: req.body.userId });
    if (data.length > 0) {
        isExists = true;
    }
    return { isExists, data };
}

exports.getAllPaymentUsers = async (req) => {
    let isExists = false;
    const data = await Payment.find({});
    if (data.length > 0) {
        isExists = true;
    }
    return { isExists, data };
}


exports.getAllUserTransactions = async (req) => {
    let isExists = false;
    const data = await Transaction.find({userId:req.body.userId});
    if (data.length > 0) {
        isExists = true;
    }
    return { isExists, data };
}