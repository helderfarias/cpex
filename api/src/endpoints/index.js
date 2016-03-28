'use strict';

const express = require('express');
const router = express.Router();
const versao = require('./versao');
const produtos = require('./produtos');

versao(router);
produtos(router);

module.exports = router;