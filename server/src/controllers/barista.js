const Barista = require('../models/barista');
const Menu = require('./menu');
const Order = require('../models/order')
const OrderCtrl = require('./order');
exports.getSalesDates = (req, res) => {
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
    Barista.aggregate([
        {
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
            $group: {
                _id: {$month: '$orders.date'},
                tip: {$sum: '$orders.tip'} 
            }
        }
    ],(err, tips)=> {
        if(err) console.log('Error retreiving tips')
        else Barista.aggregate(agg, (err, results) => OrderCtrl.parseAggregation(err, results, res, tips))
    })
}

exports.login = (req, res) => {
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

exports.addUser= (req, res) =>{

    console.log(req.body.user);
    let newUser = new Barista(req.body.user)
    newUser.save()
    .then(user => {
        console.log('new user added: ', user)
        exports.getAll(req, res);

    })
    .catch(err => {
        console.log('error adding user', err)
    })
}

exports.removeUser = (req, res) => {
    Barista.deleteOne({number: req.body.user.number})
    .then(() => {
        exports.getAll(req, res)
    })
    .catch(err => {
        console.log('err: ', err)
        exports.getAll(req, res)
    })
}

exports.getAll = (req, res) =>{
    Barista.find({}, 'name number')
    .then(users =>{
        let response = {users: []}
        users.map(user => {
            response.users.push({'name': user.name, 'number': user.number})
        })
        res.send(response)
    })
}