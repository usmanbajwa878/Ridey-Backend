const mongoose = require('mongoose');

const onlineDriver = mongoose.Schema({
    driverId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: { type: Object, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    vehicle: { type: Object, required: true },
    driver: { type: Object, required: true },
})


module.exports = mongoose.model('OnlineDrivers', onlineDriver)