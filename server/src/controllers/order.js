Order = require('../models/order');
OrderItem = require('../controllers/orderItem');
Barista = require('../models/barista');

const mongoose = require('mongoose');

exports.post = (req, res) => {
    let orderDoc = new Order()
    orderDoc.subtotal = req.body.order.orderTotal;
    orderDoc.tip = req.body.order.tip;
    orderDoc.date = new Date("2018-09-25");
    orderDoc.totalCost = orderDoc.subtotal + orderDoc.tip;

    OrderItem.post(req.body.order)
        .then(orderItems => {
            orderItems.map(orderItem => {
                orderDoc.orderItems.push(orderItem._id);
            })
            // //save or insert here
            orderDoc.save()
                .then(doc => {
                    Barista.findOneAndUpdate({name: req.body.order.barista},{$push: {orders: doc}}, {new: true})
                    .then(baristaUpdate => {
                        console.log('Added this order to ', baristaUpdate.name, 'Data: ', baristaUpdate);
                        res.sendStatus(201)
                    })
                    .catch(err => {
                        console.log('error adding order to barista: ', req.body.order.barista, 'ERROR: ', err)
                        res.sendStatus(201);
                    })
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

exports.aggregateOrderItems = () => (
    { 'agg':[
    {
        $lookup: {
            from: 'orderitems',
            localField: 'orderItems',
            foreignField: '_id',
            as: 'orderItems'
        }
    },
    {
         $unwind: '$orderItems'
    },
    {
        $lookup: {
            from: 'drinks',
            localField: 'orderItems.drink',
            foreignField: '_id',
            as: 'orderItems.drink'
        }
     },
     {
        $lookup: {
            from: 'inventories',
            localField: 'orderItems.milk',
            foreignField: '_id',
            as: 'orderItems.milk'
        }
     },
     {
        $lookup: {
            from: 'inventories',
            localField: 'orderItems.bean',
            foreignField: '_id',
            as: 'orderItems.bean'
        }
     },
     {
         $project: {
            '_id': 1,
            'orderItems.total': 1,
            'orderItems.drink.name': 1,
            'orderItems.drink.price': 1, 
            'orderItems.bean.name': 1, 
            'orderItems.milk.name': 1, 
            'orderItems.milk.price': 1 
        }
    }]
}
)
exports.parseAggregation = (err, results, res, tips) => {
    if (err) throw err;
    let response = {}
    results.map(month => {
        if(!response.hasOwnProperty(month._id)){
            response[month._id] = {'drinkCount': 1, 'totalRevenue': parseFloat(month.orderItems.total), drinks : {}, milk : {}}
        }
        else{
            response[month._id].drinkCount += 1;
            response[month._id].totalRevenue += parseFloat(month.orderItems.total)
        }

        if(!response[month._id].drinks.hasOwnProperty(month.orderItems.drink[0].name)){
            response[month._id].drinks[month.orderItems.drink[0].name] = {'drinkCount': 1, 'totalDrinkRevenue' : parseFloat(month.orderItems.drink[0].price)}
        }
        else {
            response[month._id].drinks[month.orderItems.drink[0].name].drinkCount += 1;
            response[month._id].drinks[month.orderItems.drink[0].name].totalDrinkRevenue += parseFloat(month.orderItems.drink[0].price);
        }
        if(month.orderItems.milk.length > 0){
            if(!response[month._id].milk.hasOwnProperty(month.orderItems.milk[0].name))
                response[month._id].milk[month.orderItems.milk[0].name] = {'milkCount': 1, 'totalMilkRevenue' : parseFloat(month.orderItems.milk[0].price)}
            else {
                response[month._id].milk[month.orderItems.milk[0].name].milkCount += 1;
                response[month._id].milk[month.orderItems.milk[0].name].totalMilkRevenue += parseFloat(month.orderItems.milk[0].price);
            }
        }
    })
    if(tips)
        tips.map(tip => {
            response[tip._id]['tips'] = tip.tip
        })
    res.send(response)
}
exports.getSalesDates = (req, res) => {
    let agg = [{
        $unwind: '$orderItems'
     },
     {
         $group: {
             _id: {$month: '$date'},
             orderItems: {$addToSet: '$orderItems'} ,
         }
     }]
     agg=agg.concat(exports.aggregateOrderItems()['agg'])
    Order.aggregate(
        agg, (err, results) => exports.parseAggregation(err, results, res)
    )
}