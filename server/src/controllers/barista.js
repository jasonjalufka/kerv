const Barista = require('../models/barista');
const Menu = require('./menu');
const Order = require('../models/order')
const OrderCtrl = require('./order');
exports.getSalesDates = (req, res) => {
    let agg = [{
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
            _id: { $month: '$orders.date' },
            orderItems: { $addToSet: '$orders.orderItems' }
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
                _id: { $month: '$orders.date' },
                tip: { $sum: '$orders.tip' }
            }
        }
    ], (err, tips) => {
        if (err) console.log('Error retreiving tips')
        else Barista.aggregate(agg, (err, results) => OrderCtrl.parseAggregation(err, results, res, tips))
    })
}

exports.login = (req, res) => {
    console.log("inside barista controller with request", req);
    Barista.findOne({ name: req.body.user, password: req.body.password })
        .then(user => {
            if (user)
                Menu.get(req, res);
            else
                res.sendStatus(401);
        })
        .catch(err => {
            console.log('error finding user..', err)
            res.sendStatus(401)
        })
};

exports.createUser = (req, res) => {
    console.log('Creating new user');
    const { body } = req;
    const { password } = body;
    let { name } = body;

    if (!name) {
        return res.send({
            success: false,
            message: 'Error: Name cannot be blank'
        });
    }

    name = name.toLowerCase();
    name = name.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    Barista.find({
        name: name
    }, (err, prevUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if (prevUsers.length > 0) {
            return res.send({
                success: false,
                message: `Error: Account with name "${name} already exists`
            });
        }
    })

    // Save the new user
    const newBarista = new Barista();

    newBarista.name = name;
    newBarista.password = newBarista.generateHash(password);
}

exports.addUser = () => {
    let baristaKorra = new Barista({ name: 'korra', password: 'cwunchies' })
    baristaKorra.save()
        .then(korra => {
            console.log('saved korra', korra)
        })
        .catch(err => {
            console.log('couldnt save korra', err)
        })

    let baristaSamuel = new Barista({ name: 'samuel', password: 'catnip' })
    baristaSamuel.save()
        .then(sam => {
            console.log('saved sam', sam)
        })
        .catch(err => {
            console.log('couldnt save sam: ', err)
        })
}