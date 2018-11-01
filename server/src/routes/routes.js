const Milk = require('../controllers/milk');

module.exports = app => {
    console.log("Inside routes");
    app.route('/api/getKerv').get((req, res) => {
        console.log(Milk.get);
        res.send(Milk.get);
    });
    //app.route('/api/getKerv').get(Milk.get);

    app.route('/api/addSale').post((req, res) => {
        console.log("hi");
    });
};

