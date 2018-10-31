const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

const config = require('./config');
// import config from './config';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let milk = [
//     {
//         "id": 0,
//         "name": "oat",
//         "amount": 100,
//         "type": "milk",
//         "price": 1
//     },
//     {
//         "id": 1,
//         "name": "whole",
//         "amount": 200,
//         "type": "milk",
//     }]
// let bean = [
//     {
//         "id": 2,
//         "name": "ethiopian",
//         "amount": 100,
//         "type": "bean",
//     },
//     {
//         "id": 3,
//         "name": "columbian",
//         "amount": 100,
//         "type": "bean"
//     }
// ]

// let drink = [
//     {
//         "id": 0,
//         "name": "espresso",
//         "milkReq": 0,
//         "price": 3
//     },
//     {
//         "id": 1,
//         "name": "cappuccino",
//         "milkReq": 4,
//         "price": 4.5
//     }
// ]

// let kerv = {
//     "bean": bean,
//     "drink": drink,
//     "milk": milk
// }



// loop through all routes and dynamically require them – passing api
fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(app);
});

app.listen(config.port, config.host, () => {
    console.log("Listening on http://", config.host, ":", config.port);
    require('./utils/db');
})

module.exports = app;