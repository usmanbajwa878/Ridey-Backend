const {
    REQUEST_ADDED_SUCCESS,
    SUCCESS_TRUE,
    REQUEST_ADDED_FAILED,
    SUCCESS_FALSE,
    REQUEST_FOUND,
    REQUEST_EMPTY,
    REQUEST_FAILED,
    REQUEST_EXISTS
} = require('../Constants/Message');
const { generateMessage } = require('../utils/generateMessage');
const { OK, SUCCESS, FAILED, NOT_FOUND } = require('../Constants/StatusCode');
const { createReqObject, findRequest, getAllRequests } = require('../utils/Request');




exports.addRequest = async (req, res) => {
    try {
        const { isExists } = await findRequest(req);
        if (!isExists) {
            const reqObj = await createReqObject(req);
            await reqObj.save();
            return res.status(OK).json(generateMessage(REQUEST_ADDED_SUCCESS, OK, SUCCESS_TRUE, null));
        } else {
            return res.status(FAILED).json(generateMessage(REQUEST_EXISTS, FAILED, SUCCESS_FALSE, null));
        }
    } catch (error) {
        console.log(error)
        return res.status(FAILED).json(generateMessage(REQUEST_ADDED_FAILED, FAILED, SUCCESS_FALSE, null))
    }
}


exports.getAllRequest = async (req, res) => {
    try {
        const { isExists, data } = await getAllRequests(req);
        if (isExists) {
            return res.status(SUCCESS).json(generateMessage(REQUEST_FOUND, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(NOT_FOUND).json(generateMessage(REQUEST_EMPTY, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}
exports.getUserRequests = async (req, res) => {
    try {
        const { isExists, data } = await findRequest(req);
        if (isExists) {
            return res.status(SUCCESS).json(generateMessage(REQUEST_FOUND, SUCCESS, SUCCESS_TRUE, data));
        } else {
            return res.status(NOT_FOUND).json(generateMessage(REQUEST_EMPTY, NOT_FOUND, SUCCESS_FALSE, null));
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(REQUEST_FAILED, FAILED, SUCCESS_FALSE, null));
    }
}