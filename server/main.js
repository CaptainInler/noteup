const express = require('express');
const app = express();
const router = require("./routes/noteroutes.js");

const hostname = '127.0.0.1';
const port = 3001;

app.use('/notiz', router);
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });