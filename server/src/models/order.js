const mongoose = require('mongoose');

module.exports = OrderSchema = new mongoose.Schema(
    {
        orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
        date: Date,
        tip: Number,
        subtotal: Number,
        totalCost: Number
    }
)

module.exports = exports = mongoose.model('Order', OrderSchema);