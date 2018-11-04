const mongoose = require('mongoose');

module.exports = InventorySchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        price: Number,
        amount: Number
    }
    )

module.exports = exports = mongoose.model('Inventory', InventorySchema);