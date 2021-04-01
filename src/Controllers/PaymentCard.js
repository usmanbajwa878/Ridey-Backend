const express = require('express');
const router = express.Router();
const {
    REGISTER_PAYMENT_CARD,
    GET_USER_PAYMENT_CARD,
    GET_ALL_PAYMENT_CARD_USERS,
    DELETE_PAYMENT_CARD,
    MAKE_TRANSACTION,
    GET_USER_TRANSACTIONS
} = require('../Constants/Routes');

const {
    makeTransaction,
    getAllUsersPaymentCards,
    getUserCards,
    addUserCards,
    deleteUserCard,
    getAllUserTransactions
} = require('../Routes/PaymentCard');


exports.MAKE_TRANSACTION = router.post(MAKE_TRANSACTION, makeTransaction);
exports.ADD_CARD = router.post(REGISTER_PAYMENT_CARD,addUserCards);
exports.GET_USER_CARD = router.post(GET_USER_PAYMENT_CARD,getUserCards);
exports.GET_ALL_PAYMENT_CARD_USERS = router.post(GET_ALL_PAYMENT_CARD_USERS,getAllUsersPaymentCards);
exports.DELETE_PAYMENT_CARD = router.post(DELETE_PAYMENT_CARD,deleteUserCard);
exports.GET_USER_TRANSACTION = router.post(GET_USER_TRANSACTIONS,getAllUserTransactions)