const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    requestId: mongoose.Types.ObjectId,
    userId: { type: String, required: true },
    distance: { type: String, required: true },
    status: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    user: { type: Object, required: true },
})

module.exports = mongoose.model('Request', requestSchema)