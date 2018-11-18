const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = BaristaSchema = new mongoose.Schema(
    {
        name: String,
        password: String,
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
    },
    {
        collection: 'barista'
    }
);

BaristaSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

BaristaSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = exports = mongoose.model('Barista', BaristaSchema);