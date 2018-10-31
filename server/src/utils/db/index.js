const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

const connection = mongoose.connect("http://127.0.0.1:53982/kerv");

connection
    .then(db => {
        console.log("connected to db");
        return db;
    }).catch(err => {
        console.log("stupid err", err);
    })

module.exports = connection;