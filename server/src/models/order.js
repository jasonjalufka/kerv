const mongoose = require('mongoose');

module.exports = OrderSchema = new mongoose.Schema(
    {
        orderItems: [mongoose.Schema.Types.ObjectId],
        date: Date,
        tip: Number,
        subtotal: Number,
        totalCost: Number
    }
)

module.exports = exports = mongoose.model('Order', OrderSchema);