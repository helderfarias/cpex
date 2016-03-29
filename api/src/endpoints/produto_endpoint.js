'use strict';

const ProdutoService = require('../services/produto_service');

module.exports = function(router) {

    router.get('/produtos', function(req, res) {
	  	var service = new ProdutoService({ db: req.db });

	   	service.obterTodos().then(function(rows) {
			res.status(200).json(rows);
	   	});
    });

}