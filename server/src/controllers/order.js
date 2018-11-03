const mongoose = require('mongoose');
Order = require('../models/order');
OrderItem = require('../controllers/orderItem');

exports.post = (req, res) => {
    OrderItem.post(req.body.order)
        .then(orderItems => {
            let orderDoc = new Order()
            orderDoc.subtotal = 0;
            orderDoc.tip = 0;
            orderItems.map((value, index) => {
                orderDoc.orderItems.push(mongoose.Types.ObjectId(value._id));
                orderDoc.subtotal += parseFloat(value.total);
            })
            orderDoc.date = new Date();
            orderDoc.totalCost = orderDoc.subtotal + orderDoc.tip;

            //save or insert here
            orderDoc.save()
                .then(doc => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    console.log("ERROR TRYING TO SAVE ORDER", err);
                })
        });
}