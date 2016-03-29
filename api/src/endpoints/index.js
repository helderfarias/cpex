'use strict';

const express = require('express');
const router = express.Router();
const versao = require('./versao_endpoint');
const produtos = require('./produto_endpoint');

versao(router);
produtos(router);

module.exports = router;