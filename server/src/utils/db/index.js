const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connection = mongoose.connect("mongodb://localhost:27017/kervTest");
const Populate = require('../populateDB');
connection
    .then(db => {
        console.log("connected to db");
        // Populate.populate();
        return db;
    }).catch(err => {
        console.log("ERROR UTIL/DB/INDEX", err);
    })

module.exports = connection;