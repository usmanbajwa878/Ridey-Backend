const User = require('../Models/User/User');
const Vehicle = require('../Models/Driver/Vehicle');
const Driver = require('../Models/Driver/Driver');
const mongoose = require('mongoose');
const { generateMessage } = require('./generateMessage');
const {
    USER_EXISTS,
    USER_NOT_EXISTS,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    VEHICLE_EXISTS,
    VEHICLE_NOT_EXISTS,
    DRIVER_EXISTS,
    DRIVER_NOT_EXISTS,
    STATUS_UPDATE_SUCCESS,
    STATUS_UPDATE_FAILED,
} = require('../Constants/Message');
const { OK, UN_AUTH, FAILED, NOT_FOUND, SUCCESS } = require('../Constants/StatusCode');




exports.createUser = (req) => {
    const user = new User({
        userId: mongoose.Types.ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        nicNumber: req.body.nicNumber,
        profileImg: req.body.profileImg
    });
    return user;
}


exports.createDriver = (req) => {
    const driver = new Driver({
        driverId: mongoose.Types.ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        profileImg: req.body.profileImg,
        liscenceNumber: req.body.liscenceNumber,
        liscenceImage: req.body.liscenceImage,
        nicNumber: req.body.nicNumber,
        nicImage: req.body.nicImage
    });
    return driver;
};




exports.findDriver = async (req) => {
    const data = await Driver.find({ phoneNumber: req.body.phoneNumber }).exec().then(driver => {
        if (driver.length !== 0) {
            return generateMessage(DRIVER_EXISTS, UN_AUTH, SUCCESS_TRUE, driver)
        }
        return generateMessage(DRIVER_NOT_EXISTS, OK, SUCCESS_FALSE, null)
    })
    return data;
}
exports.findDriverById = async (req) => {
    const data = await Driver.find({ driverId: req.body.driverId }).exec().then(driver => {
        if (driver.length !== 0) {
            return generateMessage(DRIVER_EXISTS, UN_AUTH, SUCCESS_TRUE, driver)
        }
        return generateMessage(DRIVER_NOT_EXISTS, OK, SUCCESS_FALSE, null)
    })
    return data;
}

exports.updateDriverStatus = async (req) => {
    const data = await Driver.updateOne(
        { driverId: req.body.driverId },
        {
            $set:
                { online: req.body.online }
        }
    ).exec().then(driver => {
        console.log("updated", driver)
        if (driver.ok !== 0) {
            return generateMessage(STATUS_UPDATE_SUCCESS, UN_AUTH, SUCCESS_TRUE, null)
        }
        return generateMessage(STATUS_UPDATE_FAILED, OK, SUCCESS_FALSE, null)
    })
    return data;
}

exports.createVehicle = (req) => {
    const vehicle = new Vehicle({
        vehicleId: mongoose.Types.ObjectId(),
        driverId: req.body.driverId,
        vehicleRegNumber: req.body.vehicleRegNumber,
        vehicleEngineCC: req.body.vehicleEngineCC,
        vehicleSittingCapacity: req.body.vehicleSittingCapacity,
        vehicleRegCertificateImg: req.body.vehicleRegCertificateImg
    });
    return vehicle;
}

exports.findUser = async (req, res) => {
    const data = await User.find({ phoneNumber: req.body.phoneNumber }).exec().then(user => {
        if (user.length !== 0) {
            return generateMessage(USER_EXISTS, UN_AUTH, SUCCESS_TRUE, user)
        }
        return generateMessage(USER_NOT_EXISTS, OK, SUCCESS_FALSE, null)
    })
    return data;
}



exports.getVehiclebyRegNo = async (req) => {
    const data = await Vehicle.find({ vehicleRegNumber: req.body.vehicleRegNumber }).exec().then(vehicle => {
        console.log("vehicle", req.body)
        if (vehicle.length !== 0) {
            return generateMessage(VEHICLE_EXISTS, FAILED, SUCCESS_TRUE, vehicle)
        }
        return generateMessage(VEHICLE_NOT_EXISTS, OK, SUCCESS_FALSE, null)
    });
    return data;
}

exports.getAllDriverVehicle = async (req) => {
    const data = await Vehicle.find({ driverId: req.body.driverId }).exec()
        .then(vehicle => {
            if (vehicle.length !== 0) {
                return generateMessage(VEHICLE_EXISTS, FAILED, SUCCESS_TRUE, vehicle)
            }
            return generateMessage(VEHICLE_NOT_EXISTS, OK, SUCCESS_FALSE, null)
        });
    return data;
}
exports.getAllVehicles = async (req) => {
    const data = await Vehicle.find().exec()
        .then(vehicle => {
            if (vehicle.length !== 0) {
                return generateMessage(VEHICLE_EXISTS, FAILED, SUCCESS_TRUE, vehicle)
            }
            return generateMessage(VEHICLE_NOT_EXISTS, OK, SUCCESS_FALSE, null)
        });
    return data;
}

