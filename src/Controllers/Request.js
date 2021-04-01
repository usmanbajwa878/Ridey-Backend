const express = require('express');
const router = express.Router();
const {
    REQUEST,
    REQUEST_GET,
    REQUEST_POST,
    REQUEST_GET_USER

} = require('../Constants/Routes');

const { getAllRequest,getUserRequests, addRequest } = require('../Routes/Request');


exports.REQUEST_ADD = router.post(REQUEST_POST, addRequest);
exports.REQUEST_GET = router.post(REQUEST_GET, getAllRequest);
exports.REQUEST_GET_USER = router.post(REQUEST_GET_USER,getUserRequests)