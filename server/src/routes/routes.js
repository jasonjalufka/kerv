
module.exports = app => {
    console.log("Inside routes");
    app.route('/api/getKerv').get((req, res) => {
        res.send({ "kerv": "hi world" });

    });

    app.route('/api/addSale').post((req, res) => {
        console.log("hi");
    });
};

