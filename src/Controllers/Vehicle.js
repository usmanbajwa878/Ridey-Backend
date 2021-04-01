const express = require('express');
const router = express.Router();
const { getAllVehicle, getVehiclebyRegNo, createVehicle, getDriverVehicles } = require('../Routes/Vehicle');
const { VEHICLE_GET,VEHICLE_POST,VEHICLE_GET_BY_REG_NO, VEHICLE_GET_BY_DRIVER } = require('../Constants/Routes');


exports.GET_ALL_VEHICLES = router.post(VEHICLE_GET, getAllVehicle);
exports.GET_BY_REG_NO = router.post(VEHICLE_GET_BY_REG_NO, getVehiclebyRegNo);
exports.GET_BY_DRIVER = router.post(VEHICLE_GET_BY_DRIVER,getDriverVehicles);
exports.CREATE_VEHICLE = router.post(VEHICLE_POST,createVehicle);