const mongoose = require('mongoose');


const vehicleSchema = mongoose.Schema({
    vehicleId:mongoose.Types.ObjectId,
    driverId:{type:String,required:true},
    vehicleRegNumber:{type:String,required:true},
    vehicleEngineCC:{type:String,required:true},
    vehicleSittingCapacity:{type:String,required:true},
    vehicleRegCertificateImg:{type:String,required:true}
  
})
module.exports  = mongoose.model('Vehicle',vehicleSchema);