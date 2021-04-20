const {
    DRIVER_EXISTS,
    DRIVER_NOT_EXISTS,
    DRIVER_SUCCESS_LOGIN,
    DRIVER_SUCCESS_SIGNUP,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    STATUS_UPDATE_SUCCESS,
    STATUS_UPDATE_FAILED
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    UN_AUTH,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { findDriver, createDriver,updateDriverStatus } = require('../utils/utilities');
const  {io}  =require('../server');




exports.SignUp = async (req, res) => {
    try {
        const result = await findDriver(req, res);
        const { data } = result;
        if (!data) {
            const user = createDriver(req);
            await user.save();
            return res.status(OK).json(generateMessage(DRIVER_SUCCESS_SIGNUP, OK, SUCCESS_TRUE, null));
        }
        return res.status(FAILED).json(generateMessage(DRIVER_EXISTS, FAILED, SUCCESS_FALSE, null))
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}


exports.Login = async (req, res) => {
    try {
        const result = await findDriver(req, res);
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(DRIVER_SUCCESS_LOGIN, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(UN_AUTH).json(generateMessage(DRIVER_NOT_EXISTS, UN_AUTH, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

exports.updateDriverStatus = async (req, res) => {
    try {
        const result = await updateDriverStatus(req, res);
        const { success } = result;
        if (success) {
            return res.status(OK).json(generateMessage(STATUS_UPDATE_SUCCESS, SUCCESS, SUCCESS_TRUE, null))
        } else {
            return res.status(UN_AUTH).json(generateMessage(DRIVER_NOT_EXISTS, UN_AUTH, SUCCESS_FALSE, null))
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

