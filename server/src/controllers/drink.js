Drink = require('../models/drink');

exports.get = () => {
	let drink = []
	return Drink.find()
		.then(drinkDocs => {
			drinkDocs.map(drinkDocs => {
				let drinkIndex = {}
				drinkIndex = { 'name': drinkDocs.name, 'milkReq': drinkDocs.milkReq, 'price': drinkDocs.price }
				drink.push(drinkIndex)
			})
			return ({ 'drink': drink });
		})
		.catch(err => {
			console.log("DRINK FIND ERROR: ", err)
		})
}

exports.getId = (name) => {
	return Drink.findOne({ name: name }, '_id')
		.then(drinkDoc => {
			return drinkDoc._id
		})
		.catch(err => {
			console.log("Could not find drink by name", err);
		})
}

exports.findAndUpdate = (name, update) => {
	return Drink.findOneAndUpdate({name: name}, update)
		.then(drinkDoc => console.log('update', drinkDoc))
		.catch(err => console.log('error updating', err))
}