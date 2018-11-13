const Barista = require('../models/barista');
const Menu = require('./menu');
const Order = require('../models/order')
const OrderCtrl = require('./order');
exports.getSalesDates = (req, res) => {
    console.log('got ur request....', req.params.barista)
    let agg = [ {
        $match: { name: req.params.barista }
    },
    {
        $lookup: {
            from: 'orders',
            localField: 'orders',
            foreignField: '_id',
            as: 'orders'
        }
    },
    {
        $unwind: '$orders' 
    },
    {
        $unwind: '$orders.orderItems'
    },
     {
         $group: {
             _id: {$month: '$orders.date'},
             orderItems: {$addToSet: '$orders.orderItems'} 
         }
     }]
     agg = agg.concat(OrderCtrl.aggregateOrderItems()['agg'])
    
    Barista.aggregate(agg, (err, results) => OrderCtrl.parseAggregation(err, results, res))
         
}

exports.login = (req, res) => {
    console.log("inside barista controller with request", req);
    Barista.findOne({name: req.body.user, password: req.body.password})
    .then(user => {
        if(user)
            Menu.get(req, res);
        else
            res.sendStatus(401);
    })
    .catch(err => {
        console.log('error finding user..', err)
        res.sendStatus(401)
    })
};

exports.addUser= () =>{
    let baristaKorra = new Barista({name: 'korra', password: 'cwunchies'})
    baristaKorra.save()
    .then(korra => {
        console.log('saved korra', korra)
    })
    .catch(err => {
        console.log('couldnt save korra', err)
    })

    let baristaSamuel = new Barista({name: 'samuel', password: 'catnip'})
    baristaSamuel.save()
    .then(sam =>{
        console.log('saved sam', sam)
    })
    .catch(err => {
        console.log('couldnt save sam: ', err)
    })
}