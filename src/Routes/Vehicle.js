const {
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    VEHICLE_SUCCESS_GET,
    VEHICLE_SUCCESS_POST,
    VEHICLE_NOT_EXISTS,
    VEHICLE_EXISTS,
    DRIVER_NOT_EXISTS
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { findDriver, findDriverById, createVehicle, getVehiclebyRegNo, getAllDriverVehicle, getAllVehicles } = require('../utils/utilities');



exports.createVehicle = async (req, res) => {
    console.log("request", req);
    try {
        const result = await findDriverById(req, res);
        const { success } = result;
        if (success !== false) {
            const isExists = await getVehiclebyRegNo(req);
            if (!isExists.data) {
                const vehicle = createVehicle(req);
                await vehicle.save();
                return res.status(OK).json(generateMessage(VEHICLE_SUCCESS_POST, OK, SUCCESS_TRUE, null));
            }
            return res.status(FAILED).json(generateMessage(VEHICLE_EXISTS, FAILED, SUCCESS_FALSE, null))
        } else {
            return res.status(FAILED).json(generateMessage(DRIVER_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(DRIVER_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
    }

}


exports.getVehiclebyRegNo = async (req, res) => {
    try {
        const result = await getVehiclebyRegNo(req)
        const { data, success } = result;
        console.log("data", result)
        if (success) {
            return res.status(OK).json(generateMessage(VEHICLE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(VEHICLE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }

}
exports.getDriverVehicles = async (req, res) => {
    try {
        const result = await getAllDriverVehicle(req)
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(VEHICLE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(VEHICLE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }

}
exports.getAllVehicle = async (req, res) => {
    try {
        const result = await getAllVehicles(req)
        const { data } = result;
        if (data) {
            return res.status(OK).json(generateMessage(VEHICLE_SUCCESS_GET, SUCCESS, SUCCESS_TRUE, data))
        } else {
            return res.status(FAILED).json(generateMessage(VEHICLE_NOT_EXISTS, FAILED, SUCCESS_FALSE, null))
        }
    } catch (error) {
        return res.status(FAILED).json(generateMessage(error.message, FAILED, SUCCESS_FALSE, null))
    }

}

