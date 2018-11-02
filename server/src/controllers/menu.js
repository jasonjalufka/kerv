const Drink = require('./drink');
const Inventory = require('./inventory');

exports.get = (req, res) => {
	let kerv = {}
	Drink.get(req, res).then(drink =>{
		kerv['drink'] = drink.drink;
		Inventory.get(req, res).then(inventory =>{
			kerv['milk'] = inventory.milk;
			kerv['bean'] = inventory.bean;
			res.send({'kerv': kerv});
		});
	});
};