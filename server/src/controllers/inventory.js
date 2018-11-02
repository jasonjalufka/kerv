const Inventory = require('../models/inventory');

module.exports.get = () => {
    let milk = []
	let bean = []
    return Inventory.find()
		.then(inventoryDocs => {
			inventoryDocs.map(inventoryDoc => {
				let index = {}
				if(inventoryDoc.type === 'milk'){
					index = {'name': inventoryDoc.name, 'amount': inventoryDoc.amount, 'type': inventoryDoc.type, 'price': inventoryDoc.price}
					milk.push(index);
				}
				else if(inventoryDoc.type === 'bean'){
					index = {'name': inventoryDoc.name, 'amount': inventoryDoc.amount, 'type': inventoryDoc.type}
					bean.push(index);
				}
            })
            return ({'milk': milk, 'bean': bean});
        })
        .catch(err =>{
            console.log("ERROR IN GETTING INVENTORY", err);
        })
 };