const OrderItem = require('../models/orderItem');
const Drink = require('../models/drink');
const Inventory = require('../models/inventory');
const mongoose = require('mongoose');

exports.post = (orderItems) => {
    // Only map over keys that are numeric (orderkeys)
    let orderItemDocs = []
    let orderItemsKeys = Object.keys(orderItems).filter(element => parseInt(element) == element);
    let orderSize = orderItemsKeys.length

     // map over all the order Items and call populate doc on each
     // check the orderSize and compare
}

exports.get = (req, res) => {

    OrderItem.find()
    .then(orderItem =>{
        orderItem.map((orderItemEntry, index) => {
            console.log('Entry: ', index, 'OrderItemEntry: ', orderItemEntry);
        })
    })
    .catch(err =>{
        console.log('ERROR READING DOCUMENTS FROM ORDER', err)
    })
}

exports.populateOrderItemDoc = () => {
    // call getId for milk, bean, and drink
}