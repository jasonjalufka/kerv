const Inventory = require('../models/inventory');

exports.get = () => {
	let milk = []
	let bean = []
	return Inventory.find()
		.then(inventoryDocs => {
			inventoryDocs.map(inventoryDoc => {
				let index = {}
				if (inventoryDoc.type === 'milk') {
					index = { 'name': inventoryDoc.name, 'amount': inventoryDoc.amount, 'type': inventoryDoc.type, 'price': inventoryDoc.price }
					milk.push(index);
				}
				else if (inventoryDoc.type === 'bean') {
					index = { 'name': inventoryDoc.name, 'amount': inventoryDoc.amount, 'type': inventoryDoc.type }
					bean.push(index);
				}
			})
			return ({ 'milk': milk, 'bean': bean });
		})
		.catch(err => {
			console.log("ERROR IN GETTING INVENTORY", err);
		})
};

exports.getId = name => {
	return Inventory.findOne({ name: name }, '_id')
		.then(inventoryDoc => inventoryDoc._id)
		.catch(err => console.log('Could not find inventory item by name: ', err));
}

exports.findAndUpdate = (name, update) => {
	return Inventory.findOneAndUpdate({name: name}, update)
		.then(inventoryDoc => console.log('update', inventoryDoc))
		.catch(err => console.log('error updating', err))
}