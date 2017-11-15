const express = require('express');
const app = express();
const router = require("./routes/noteroutes.js");

const hostname = '127.0.0.1';
const port = 3001;


// siehe Vorlesung 07_Express-Ajax Folien 53/54
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(allowCrossDomain);

app.use('/managenote', router);
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });