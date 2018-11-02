const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loop through all routes and dynamically require them – passing api
fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(app);
});

app.listen(config.port, config.host, () => {
    console.log("Listening on http://", config.host, ":", config.port);
    require('./utils/db');
})

module.exports = app;