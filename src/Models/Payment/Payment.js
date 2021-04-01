const mongoose = require('mongoose');


const paymentSchema = mongoose.Schema({
    entryId: mongoose.Types.ObjectId,
    userId: { type: String, required: true },
    payments: { type: Array, required: true },
   
})

module.exports = mongoose.model('Payment', paymentSchema);
