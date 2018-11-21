const Order = require('../controllers/order');
const OrderItem = require('../controllers/orderItem');
const Barista = require('../controllers/barista');
const Menu = require('../controllers/menu');
const UserSession = require('../controllers/userSession');
module.exports = app => {
    app.route('/').post(Menu.get)
    app.route('/api/sales').post(Order.post);
    app.route('/api/sales').get(OrderItem.getTotal);
    app.route('/api/sales/:barista/dates').get(Barista.getSalesDates);
    app.route('/api/sales/dates').get(Order.getSalesDates);
    app.route('/api/sales/by/:type').get(OrderItem.getSalesByType);
    app.route('/api/account/create').post(Barista.createUser);
    app.route('/api/login/').post(Barista.login);
    app.route('/api/config').get(Menu.get);
    app.route('/api/menu').post(Menu.update);
    app.route('/api/user').get(Barista.getAll);
    app.route('/api/user').post(Barista.createUser);
    app.route('/api/user').delete(Barista.removeUser);
};
