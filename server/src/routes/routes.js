const Menu = require('../controllers/menu');

module.exports = app => {
     app.route('/api/getKerv').get(Menu.get);
};

