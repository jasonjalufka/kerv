const mongoose = require('mongoose');

module.exports = OrderItemSchema = new mongoose.Schema(
    {
        drink: String,
        milk: String,
        bean: String,
        total: String
    }
)

module.exports = exports = mongoose.model('OrderItem', OrderItemSchema);