const express = require('express');
const app = express();
const router = require('./route/route');
require('dotenv').config()

const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, function () {
    console.log('Nodejs Express Example App listening on port ' + port)
})