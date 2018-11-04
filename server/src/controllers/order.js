Order = require('../models/order');
OrderItem = require('../controllers/orderItem');

exports.post = (req, res) => {
    let orderDoc = new Order()
    orderDoc.subtotal = req.body.order.orderTotal;
    orderDoc.tip = 0;
    orderDoc.date = new Date();
    orderDoc.totalCost = orderDoc.subtotal + orderDoc.tip;

    OrderItem.post(req.body.order)
        .then(orderItems => {
            orderItems.map(orderItem => {
                orderDoc.orderItems.push(orderItem._id)
            })
            // //save or insert here
            orderDoc.save()
                .then(doc => {
                    res.sendStatus(201);
                })
                .catch(err => {
                    res.sendStatus(500);
                })
        })
        .catch(err => {
            console.log('err trying to save all the orderitems ', err)
        })
}

exports.get = (req, res) => {
    Order.find()
        .then(data => {
            let dataTotal = data.map(item => {
                return item.totalCost
            }).reduce((grandTotal, currentTotal) => grandTotal + currentTotal).toFixed(2)
            res.send({ 'data': dataTotal })
        })
        .catch(err => {
            console.log('ERROR READING DOCUMENTS FROM ORDER', err);
        })
}