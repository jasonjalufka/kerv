Drink = require('../models/drink');

exports.get = () => {
	let drink = []
    return Drink.find()
	.then(drinkDocs =>{
		drinkDocs.map(drinkDocs => {
			let drinkIndex = {}
			drinkIndex = {'name' : drinkDocs.name, 'milkReq' : drinkDocs.milkReq, 'price': drinkDocs.price}
            drink.push(drinkIndex)       
        })
        return ({'drink': drink});    
    })
	.catch(err => {
		console.log("DRINK FIND ERROR: ", err)
    })
}