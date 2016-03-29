'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const endpoints = require('./endpoints');
const http = require('http');
const port = process.env.PORT || 5000; 

var createConnDatabase = function(req, res, next) {
	req.db = require('knex')(config.database);
	next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(createConnDatabase);
app.use('/api', endpoints);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = server;