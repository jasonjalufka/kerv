const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

let milk = [
    {
        "id": 0, 
        "name": "oat",
        "amount": 100, 
        "type" : "milk",
        "price" : 1
    },
    {
        "id": 1, 
        "name": "whole",
        "amount": 200, 
        "type" : "milk",
    }]
    let bean = [
    {
        "id": 2, 
        "name": "ethiopian",
        "amount": 100, 
        "type" : "bean",
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
        "milkReq": 0, 
        "price" : 3
    },
    {
        "id": 1, 
        "name": "cappuccino",
        "milkReq": 4,
        "price" : 4.5
    }
]

let kerv = {
    "bean" : bean, 
    "drink": drink, 
    "milk": milk
}
app.get('/api/getKerv', (req, res) => {
    res.send({ kerv: kerv });
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

