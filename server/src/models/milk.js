const mongoose = require('mongoose');

module.exports = MilkSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        price: Number,
        amount: Number
    })

module.exports = exports = mongoose.model('Milk', MilkSchema);