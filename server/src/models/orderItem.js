const mongoose = require('mongoose');

module.exports = OrderItemSchema = new mongoose.Schema(
    {
        drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink'},
        milk: {type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
        bean: {type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
        total: String
    }
)

module.exports = exports = mongoose.model('OrderItem', OrderItemSchema);