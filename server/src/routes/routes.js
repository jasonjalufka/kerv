const Menu = require('../controllers/menu');
const Order = require('../controllers/order');
const OrderItem = require('../controllers/orderItem');
module.exports = app => {
    app.route('/api/kerv').get(Menu.get);
    app.route('/api/sales').post(Order.post);
    app.route('/api/sales').get(OrderItem.get);
};
