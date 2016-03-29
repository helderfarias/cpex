'use strict';

const express = require('express');
const router = express.Router();

const versao = require('./versao_endpoint');
const produto = require('./produto_endpoint');
const markup = require('./markup_endpoint');

versao(router);
produto(router);
markup(router);

module.exports = router;
