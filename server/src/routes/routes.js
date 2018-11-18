const Order = require('../controllers/order');
const OrderItem = require('../controllers/orderItem');
const Barista = require('../controllers/barista');
const Menu = require('../controllers/menu');

module.exports = app => {
    app.route('/api/sales').post(Order.post);
    app.route('/api/sales').get(OrderItem.getTotal);
    app.route('/api/sales/:barista/dates').get(Barista.getSalesDates);
    app.route('/api/sales/dates').get(Order.getSalesDates);
    app.route('/api/sales/by/:type').get(OrderItem.getSalesByType);
    app.route('/api/account/create').post(Barista.create);
    app.route('/api/login/').post(Barista.login);
    app.route('/api/config').get(Menu.get);
    app.route('/api/menu').post(Menu.update);
};
