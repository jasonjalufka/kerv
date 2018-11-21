const Barista = require('../models/barista');
const Menu = require('./menu');
const Order = require('../models/order')
const OrderCtrl = require('./order');
const UserSession = require('../models/userSession');

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
    Barista.findOne({ name: req.body.user })
        .then(user => {
            if (user.validPassword(req.body.password)) {
                session = new UserSession({ userId: user._id, isDeleted: false })
                session.save()
                    .then(userSession => {
                        req.body['token'] = userSession._id
                        Menu.get(req,res)
                        
                    })
                    .catch(err => {
                        console.log('error saving the session...', err)
                    })
            }
            else
                res.sendStatus(401)
        })
        .catch(err => {
            console.log('error finding user..', err)
            res.sendStatus(401)
        })


}

exports.createUser = (req, res) => {
    const { user } = req.body;
    const { password } = user;
    let { name, number } = user;

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
        number: number
    }, (err, prevUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if (prevUsers.length > 0) {
            exports.getAll(req, res);
            // TODO handle if user exists response
            // return res.send({
            //     success: false,
            //     message: `Error: Account with number "${number} already exists`
            // });
        }
        else {
            // Save the new user
            const newBarista = new Barista();
            newBarista.name = name;
            newBarista.number = number;
            newBarista.password = newBarista.generateHash(password);

            newBarista.save()
                .then(user => {
                    console.log('new user added: ', user)
                    exports.getAll(req, res);

                })
                .catch(err => {
                    console.log('error adding user', err)
                })
        }
    })

}

exports.addUser = (req, res) => {
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
    Barista.deleteOne({ number: req.body.user.number })
        .then(() => {
            exports.getAll(req, res)
        })
        .catch(err => {
            console.log('err: ', err)
            exports.getAll(req, res)
        })
}

exports.getAll = (req, res) => {
    Barista.find({}, 'name number')
        .then(users => {
            let response = { users: [] }
            users.map(user => {
                response.users.push({ 'name': user.name, 'number': user.number })
            })
            res.send(response)
        })
}