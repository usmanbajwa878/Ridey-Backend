const express = require('express');
const router = express.Router();
const {
    TRIP,
    TRIPS_GET,
    TRIP_POST,
    TRIP_GET_BY_DRIVER,
    TRIP_GET_BY_USER,
    TRIP_COMPLETE,
    TRIP_ACCEPT


} = require('../Constants/Routes');

const { AddTrip, getAllTrips, getUserTrips, getDriverTrips,CompleteTrip,AcceptTrip } = require('../Routes/Trip');


exports.TRIP_ADD = router.post(TRIP_POST, AddTrip);
exports.TRIPS_GET_ALL = router.post(TRIPS_GET, getAllTrips);
exports.TRIPS_GET_USER = router.post(TRIP_GET_BY_USER, getUserTrips);
exports.TRIPS_GET_DRIVER = router.post(TRIP_GET_BY_DRIVER, getDriverTrips);
exports.COMPLETE_TRIP  = router.post(TRIP_COMPLETE,CompleteTrip)
exports.ACCEPT_TRIP  = router.post(TRIP_ACCEPT,AcceptTrip)