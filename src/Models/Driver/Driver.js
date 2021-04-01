const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    driverId:mongoose.Types.ObjectId,
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    profileImg:{type:String,required:true},
    liscenceNumber:{type:String,required:true},
    liscenceImage:{type:String,required:true},
    nicNumber:{type:String,required:true},
    nicImage:{type:String,required:true},
    online:{type:Boolean,default:'false'}
    
});

module.exports = mongoose.model("drivers",driverSchema)