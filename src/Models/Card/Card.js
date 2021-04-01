const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    cardId: mongoose.Types.ObjectId,
    cardNumber: { type: String, required: true },
    cvc: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
})

module.exports = mongoose.model('Card', cardSchema);
