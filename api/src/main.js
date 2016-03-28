'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const endpoints = require('./endpoints');
const http = require('http');
const port = process.env.PORT || 5000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', endpoints);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = server;