const express = require('express');
const apiRouter = require('./routes');
const mysql = require('mysql');
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`FarkPlookTree Rest API listening on port ${port}`);
});

app.use('/api/fpt', apiRouter);
app.use(express.static('public'));
app.use('/Images', express.static(__dirname + '/Images'));