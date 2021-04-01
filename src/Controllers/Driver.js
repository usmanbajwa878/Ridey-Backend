const express = require('express');
const router = express.Router();
const { SignUp, Login, updateDriverStatus } = require('../Routes/Driver');
const { DRIVER_LOGIN, DRIVER_SIGNUP, DRIVER_STATUS } = require('../Constants/Routes');


exports.LOGIN = router.post(DRIVER_LOGIN, Login);
exports.SIGNUP = router.post(DRIVER_SIGNUP, SignUp);
exports.UPDATE_STATUS = router.post(DRIVER_STATUS, updateDriverStatus);

