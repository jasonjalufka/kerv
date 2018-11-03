const Menu = require('../controllers/menu');
const Order = require('../controllers/order');

module.exports = app => {
    app.route('/api/getKerv').get(Menu.get);

    app.route('/api/addSale').post(Order.post);
};
