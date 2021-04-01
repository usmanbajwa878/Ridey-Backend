const OnlineDriver = require('../Models/Driver/OnlineDriver');
const { generateMessage } = require('./generateMessage');
const {
    SUCCESS_TRUE,
    TRIP_EMPTY,
    TRIP_FOUND_SUCCESS
} = require('../Constants/Message');
const { OK, UN_AUTH, FAILED, NOT_FOUND, SUCCESS } = require('../Constants/StatusCode');



exports.createOnlineDriver = (req) => {
    const onlineDriver = new OnlineDriver({
        driverId: req.body.driverId,
        vehicleId: req.body.vehicleId,
        location: req.body.location,
        coordinates: {
            type: 'Point',
            coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
        },
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString().slice(0, 10),
        vehicle: req.body.vehicle,
        driver: req.body.driver,
    })
    return onlineDriver;
}


exports.MakeDriverOffline= async (id) => {
    console.log("DELETE DRIVER OFFLINE ",id)
    let status = false;
    const data = await OnlineDriver.findOneAndDelete({ driverId:id });
    console.log("delete",data);
    if(data === null){
        status  = null
    }else{
        status = true;
    }
    return status;
}




exports.getSpecificOnlineDriver = async (req) => {
    let data;
    let onlineDriver = await OnlineDriver.find({ driverId: req.body.driverId });
    if (onlineDriver.length > 0) {
        data = generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, onlineDriver)
    } else {
        data = generateMessage(TRIP_EMPTY, NOT_FOUND, SUCCESS_TRUE, null)
    }
    return data;
}

exports.getAllOnlineDrivers = async (req) => {
    let data;
    let onlineDriverData = await OnlineDriver.find({});
    console.log(onlineDriverData)
    if (onlineDriverData) {
        data = generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, onlineDriverData)
    } else {
        data = generateMessage(TRIP_EMPTY, NOT_FOUND, SUCCESS_TRUE, null)
    }
    return data;
}

exports.getNearByOnlineDrivers = async (req) => {
    let nearData;
    let io = req.app.io
    const result = await this.getAllOnlineDrivers(req);
    
    let { data } = result;
    if (data) {
        nearData = await OnlineDriver.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)] },
                    spherical: true,
                    maxDistance: 2,
                    distanceField: "dist.calculated",
                }
            },
        ])
    }
    return nearData;
}



