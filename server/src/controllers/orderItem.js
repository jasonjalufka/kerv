const OrderItem = require('../models/orderItem');

exports.post = (orderItems) => {
    // Only map over keys that are numeric (orderkeys)
    const orderItemDocs = [];
    Object.keys(orderItems).filter(element => parseInt(element) == element).map((itemKey, index) => {
        let orderItemDoc = new OrderItem({
            drink: orderItems[itemKey].drinkOption,
            milk: orderItems[itemKey].milkOption,
            bean: orderItems[itemKey].beanOption,
            total: orderItems[itemKey].total
        })
        orderItemDocs.push(orderItemDoc);
    })

    return OrderItem.insertMany(orderItemDocs)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log("ERROR TRYING TO ADD ORDERITEMS");
        })

}