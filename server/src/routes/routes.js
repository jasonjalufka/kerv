const Menu = require('../controllers/menu');

module.exports = app => {
     app.route('/api/getKerv').get(Menu.get);

     app.route('/api/addSale').post((req, res) => {
        res.send(req.body.order);
    });

};
