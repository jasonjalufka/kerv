const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
let inventory = [
    {
        "id": 0, 
        "name": "oat",
        "amount": 100, 
        "type" : "milk"
    },
    {
        "id": 1, 
        "name": "whole",
        "amount": 200, 
        "type" : "milk"
    },
    {
        "id": 2, 
        "name": "ethiopian",
        "amount": 100, 
        "type" : "bean"
    },
    {
        "id": 3, 
        "name": "columbian",
        "amount": 100, 
        "type" : "bean"
    }
]

let drink = [
    {
        "id": 0, 
        "name": "espresso",
        "milkReq": 0
    },
    {
        "id": 1, 
        "name": "cappuccino",
        "milkReq": 4
    }
]

let cost = [
    {
        "id": 0, 
        "name": "espresso",
        "price": 3, 
        "type": "drink"
    },
    {
        "id": 1, 
        "name": "cappuccino",
        "price": 4.5, 
        "type": "drink"
    },
    {
        "id": 2, 
        "name": "oat", 
        "price": 1,
        "type": "milk"
    },
    {
        "id": 3, 
        "name": "whole", 
        "price": 0,
        "type": "milk"
    }
]
let kerv = {
    "inventory" : inventory, 
    "drink": drink, 
    "cost" : cost
}
app.get('/api/getKerv', (req, res) => {
    res.send({ kerv: kerv });
    console.log(kerv);
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

