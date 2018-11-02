const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connection = mongoose.connect("mongodb://localhost:27017/kervTest");

connection
    .then(db => {
        console.log("connected to db");
        
        return db;
    }).catch(err => {
        console.log("ERROR UTIL/DB/INDEX", err);
    })
    
module.exports = connection;