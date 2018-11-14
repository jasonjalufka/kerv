const mongoose = require('mongoose');

module.exports = BaristaSchema = new mongoose.Schema(
    {
        name: String,
        password: String,
        orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
        number: Number
    },
    {
        collection: 'barista'
    }
);

module.exports = exports = mongoose.model('Barista', BaristaSchema);