const Milk = require('../models/milk');

module.exports.get = (req, res) => {
    testMilk = {}
    Milk.find({}, function (err, milk) {
        console.log("Milk found from controller" + milk);
        testMilk = milk
    })
    testMilk.abby = 'barron';
    console.log("Inside GET controller");
    //res.send({ "kerv": "Hello World" });
    return testMilk;
}

// module.exports = exports = get = (req, res) => {
//     console.log("Inside controller");
//     res.send({ "kerv": "hi world" });
// }