const express = require('express');
const router = express.Router();
const {
    createOnlineDriver,
    getAllOnlineDrivers,
    getNearByDrivers,
    getSpecificOnlineDriver,
    makeDriverOffline
} = require('../Routes/OnlineDriver');
const {
    GET_DRIVER_ALL_ONLINE,
    GET_DRIVER_ONLINE,
    GET_NEARBY_DRIVER,
    MAKE_DRIVER_ONLINE,
    MAKE_DRIVER_OFFLINE
} = require('../Constants/Routes');


exports.GET_DRIVER_ONLINE = router.post(GET_DRIVER_ONLINE, getSpecificOnlineDriver);
exports.GET_DRIVER_ALL_ONLINE = router.post(GET_DRIVER_ALL_ONLINE, getAllOnlineDrivers);
exports.GET_NEARBY_DRIVER = router.post(GET_NEARBY_DRIVER, getNearByDrivers);
exports.MAKE_DRIVER_ONLINE = router.post(MAKE_DRIVER_ONLINE,createOnlineDriver)
exports.MAKE_DRIVER_OFFLINE =router.post(MAKE_DRIVER_OFFLINE,makeDriverOffline)
