const mongoose = require('mongoose');


const trip = mongoose.Schema({
    tripId: mongoose.Types.ObjectId,
    driverId: { type: String, required: true },
    userId: { type: String, required: true },
    user: { type: Object, required: true },
    driver: { type: Object, required: true },
    distance: { type: String, required: true },
    status: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: String, required: true },
    date: { type: String, required: true },
    vehicle: { type: Object, required: true },
    rating:{type:String},
    comments:{type:String},
    driverInitialCoords:{
        latitude:{type:String,required:true},
        longitude:{type:String,required:true}
    },
    userInitialCoords:{
        latitude:{type:String,required:true},
        longitude:{type:String,required:true}
    }
});



module.exports = mongoose.model('Trip', trip);