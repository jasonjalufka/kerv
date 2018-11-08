const Order = require('../controllers/order');
const OrderItem = require('../controllers/orderItem');
const Barista = require('../controllers/barista');

module.exports = app => {
    app.route('/api/sales').post(Order.post);
    app.route('/api/sales').get(OrderItem.getTotal);
    app.route('/api/sales/dates').get(Order.getSalesDates);
    app.route('/api/sales/by/:type').get(OrderItem.getSalesByType);
    app.route('/api/login/').post(Barista.login);
};
