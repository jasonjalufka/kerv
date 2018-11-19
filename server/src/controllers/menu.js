const Drink = require('./drink');
const Inventory = require('./inventory');
const UserSession = require('./userSession');
exports.get = (req, res) => {
	// call verify method from  usersession.ctrler
	console.log('inside menu get: ', req.body)
	UserSession.verify(req, res)
		.then(res => {
			console.log('RESPONSE: ', res)
			let kerv = {}
			Drink.get().then(drink => {
				kerv['drink'] = drink.drink;
				Inventory.get().then(inventory => {
					kerv['milk'] = inventory.milk;
					kerv['bean'] = inventory.bean;
					res.send({ 'kerv': kerv, 'user': req.body.user, 'token': req.body.token });
				});
			});
		})

};
exports.update = (req, res) => {
	console.log('inside menu controller with request: ', req.body.payload);
	let promises = []
	Object.keys(req.body.payload).map(type => {
		Object.keys(req.body.payload[type]).map(item => {
			type === 'drink' ?
				promises.push(Drink.findAndUpdate(item, req.body.payload[type][item]))
				: type === 'milk' ?
					promises.push(Inventory.findAndUpdate(item, req.body.payload[type][item]))
					: console.log('type: ', type, 'data: ', req.body.payload[type])
		})
	})

	Promise.all(promises)
		.then(data => {
			exports.get(req, res);
		})
		.catch(err => {
			console.log('error somewhere....', err)
		})

}