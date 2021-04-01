const Vehicle = require('../Models/Driver/Vehicle');
const Trip = require('../Models/Trip/Trip');
const mongoose = require('mongoose');
const { generateMessage } = require('./generateMessage');
const {
    SUCCESS_TRUE,
    TRIP_EMPTY,
    TRIP_FOUND_SUCCESS
} = require('../Constants/Message');
const { OK, UN_AUTH, FAILED, NOT_FOUND, SUCCESS } = require('../Constants/StatusCode');


exports.createTripSchema = (req, requestData) => {
    const trip = new Trip({
        tripId: requestData.requestId,
        driverId: req.body.driverId,
        userId: requestData.userId,
        distance: requestData.distance,
        status: req.body.status,
        source: requestData.source,
        destination: requestData.destination,
        fare: req.body.fare,
        date: requestData.date,
        vehicle: req.body.vehicle,
        user: requestData.user,
        driver: req.body.driver,
        rating:'',
        comments: ''
    })
    return trip;
}


exports.updateTripStatus = async (req) => {
    let responseData;
    const data = await Trip.find({ driverId: req.body.driverId });
    console.log("data",data)
    if (data.length !== 0) {
        responseData = await DriverTrip.findOneAndUpdate(
            { driverId: req.body.driverId },
            {
                $set: {
                    status: 'Accepted',
                }
            }, {
            safe: true,
            upsert: false,
            status: 200
        },
        )
    }
    return responseData

}

exports.makeTripComplete = async (req) => {
    let responseData;
    const data = await Trip.find({ tripId: req.body.tripId })
    if (data.length !== 0) {
        responseData = await Trip.updateOne(
            { tripId: req.body.tripId },
            {
                $set: {
                    status: 'Completed',
                    rating: req.body.rating,
                    comments: req.body.comments
                },
            }, {
            safe: true,
            upsert: false,
            status: 200
        },
        )
    }
    return responseData

}




exports.getDriverTrips = async (req) => {
    let data;
    let tripData = await Trip.find({ driverId: req.body.driverId });
    console.log("tripAraay", tripData)
    if (tripData.length > 0) {

        data = generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, tripData)
    } else {
        data = generateMessage(TRIP_EMPTY, NOT_FOUND, SUCCESS_TRUE, null)
    }
    return data;
}


exports.getUserTrips = async (req) => {
    let data;
    let tripData = await Trip.find({ userId: req.body.userId });
    if (tripData.length > 0) {
        data = generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, tripData)
    } else {
        data = generateMessage(TRIP_EMPTY, NOT_FOUND, SUCCESS_TRUE, null)
    }
    return data;
}

exports.getAllTrips = async (req) => {
    let data;
    let tripData = await Trip.find({});
    if (tripData.length > 0) {
        data = generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, tripData)
    } else {
        data = generateMessage(TRIP_EMPTY, NOT_FOUND, SUCCESS_TRUE, null)
    }
    return data;
}




