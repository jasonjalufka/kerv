const mongoose = require('mongoose');

module.exports = DrinkSchema = new mongoose.Schema(
    {
        name: String,
        milkReq: Number,
        price: Number,
    },
    {
        collection: 'drink'
    })

module.exports = exports = mongoose.model('Drink', DrinkSchema);