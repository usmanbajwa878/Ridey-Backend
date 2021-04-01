const {
    DRIVER_NOT_EXISTS,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    DRIVER_ONLINE_SUCCESS,
    DRIVER_ONLINE_EXISTS,
    NEARBY_DRIVER_FAILED,
    NEARBY_DRIVER_FOUND,
    DRIVER_OFFLINE_SUCCESS,
    DRIVER_OFFLINE_FAILED,
    DRIVER_OFFLINE_ALREADY
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    UN_AUTH,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const {
    createOnlineDriver,
    getAllOnlineDrivers,
    getNearByOnlineDrivers,
    getSpecificOnlineDriver,
    MakeDriverOffline
} = require('../utils/Driver');


exports.createOnlineDriver = async (req, res) => {
    try {
        const result = await getSpecificOnlineDriver(req);
        const { data } = result
        if (!data) {
            const driverOnline = await createOnlineDriver(req);
            await driverOnline.save();
            return res.status(OK).json(generateMessage(DRIVER_ONLINE_SUCCESS, OK, SUCCESS_TRUE, null));
        }
        return res.status(FAILED).json(generateMessage(DRIVER_ONLINE_EXISTS, FAILED, SUCCESS_FALSE, null));
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }
}

exports.getAllOnlineDrivers = async (req, res) => {

    const result = await getAllOnlineDrivers(req);
    const { data } = result
    if (!data) {
        return res.status(FAILED).json(generateMessage(DRIVER_NOT_EXISTS, FAILED, SUCCESS_FALSE, null));
    }
    return res.status(OK).json(generateMessage(DRIVER_ONLINE_EXISTS, OK, SUCCESS_FALSE, data));
}

exports.getSpecificOnlineDriver = async (req, res) => {
    const result = await getSpecificOnlineDriver(req);
    const { data } = result
    if (!data) {
        return res.status(FAILED).json(generateMessage(DRIVER_NOT_EXISTS, FAILED, SUCCESS_FALSE, null));
    }
    return res.status(OK).json(generateMessage(DRIVER_ONLINE_EXISTS, OK, SUCCESS_FALSE, data));
}


exports.getNearByDrivers = async (req, res) => {
    const result = await getNearByOnlineDrivers(req);
    if (result.length === 0) {
        return res.status(FAILED).json(generateMessage(NEARBY_DRIVER_FAILED, FAILED, SUCCESS_FALSE, null));
    }
    return res.status(OK).json(generateMessage(NEARBY_DRIVER_FOUND, OK, SUCCESS_TRUE, result));
}

exports.makeDriverOffline = async (req, res) => {
    const result = await MakeDriverOffline(req.body.driverId);
    console.log("resutt", result)
    if (result) {
        return res.status(OK).json(generateMessage(DRIVER_OFFLINE_SUCCESS, SUCCESS, SUCCESS_TRUE, null));
    } else if (result === null) {
        return res.status(OK).json(generateMessage(DRIVER_OFFLINE_ALREADY, FAILED, SUCCESS_FALSE, null));
    } else {
        return res.status(FAILED).json(generateMessage(DRIVER_OFFLINE_FAILED, FAILED, SUCCESS_FALSE, null));
    }

}

