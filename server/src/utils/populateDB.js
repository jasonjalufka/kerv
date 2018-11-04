const Inventory = require('../models/inventory');
const Drink = require('../models/drink');

exports.populate = () => {
let saveThis = []

let espressoDrink = new Drink({name: 'espresso', price: 3})
saveThis.push(espressoDrink)

let macchiatoDrink = new Drink({name: 'macchiato', milkReq: 1, price: '3.5'})
saveThis.push(macchiatoDrink)

let cortadoDrink = new Drink({name: 'cortado', milkReq: 2, price: '3.75'})
saveThis.push(cortadoDrink)

let cappuccinoDrink = new Drink({name: 'cappuccino', milkReq: 4, price: 4})
saveThis.push(cappuccinoDrink)

let latteDrink = new Drink({name: 'latte', milkReq: 6, price: '4.25'})
saveThis.push(latteDrink)


let wholeInv = new Inventory({name: 'whole', type: 'milk', amount: 200})
saveThis.push(wholeInv)

let oatInv = new Inventory({name: 'oat', type: 'milk', price: 1, amount: 100})
saveThis.push(oatInv)

let almountInv = new Inventory({name: 'almond', type: 'milk', price: '.5', amount: 100})
saveThis.push(almountInv)

let ethiopianInv = new Inventory({name: 'ethiopian', type: 'bean', amount: 300})
saveThis.push(ethiopianInv)

let columbianInv = new Inventory({name: 'columbian', type: 'bean', amount: 300})
saveThis.push(columbianInv)

let kenyanInv = new Inventory({name: 'kenyan', type: 'bean', amount: 300})
saveThis.push(kenyanInv)

saveThis.map(saveItem =>{
    saveItem.save((err, data) => {
        if(err)
            console.log("Error in saving item: ", err);
        else
            console.log('this was saved: ', data);
    })
})

}






