const OrderItem = require('../models/orderItem');
const Drink = require('../controllers/drink');
const Inventory = require('../controllers/inventory');
const mongoose = require('mongoose');


exports.post = (orderItems) => {
    // console.log(orderItems);
    // Only map over keys that are numeric (orderkeys)
    let orderItemsKeys = Object.keys(orderItems).filter(element => parseInt(element) == element); // [0, 1, 2, ...]

    // map over all the order Items and call populate doc on each
    let orderItemDocsPromises = orderItemsKeys.map(orderItemKey => (
        populateOrderItemDoc(orderItems[orderItemKey])
            .then(orderItemDoc => orderItemDoc)
    )
    )

    return Promise.all(orderItemDocsPromises)
        .then(orderItemDocs => (
            OrderItem.insertMany(orderItemDocs)
                .then(data => data)
                .catch(err => console.log('error happened after inserting many orderItems', err))
        )
        )
}

exports.get = (req, res) => {
    OrderItem.find()
        .then(orderItem => {
            orderItem.map((orderItemEntry, index) => {
                console.log('Entry: ', index, 'OrderItemEntry: ', orderItemEntry);
            })
        })
        .catch(err => {
            console.log('ERROR READING DOCUMENTS FROM ORDER', err)
        })
}

let populateOrderItemDoc = (orderItem) => {
    // call getId for milk, bean, and drink
    let orderItemDoc = new OrderItem({ total: orderItem.total });
    return Drink.getId(orderItem.drinkOption)
        .then(drinkId => {
            orderItemDoc.drink = drinkId;
            // promise 2
            return Inventory.getId(orderItem.beanOption)
                .then(beanId => {
                    orderItemDoc.bean = beanId;
                    // promise 3
                    if (orderItem.milkOption) {
                        return Inventory.getId(orderItem.milkOption)
                            .then(milkId => {
                                orderItemDoc.milk = milkId;
                                return orderItemDoc;
                            });
                    }
                    else
                        return orderItemDoc
                });
        });
}