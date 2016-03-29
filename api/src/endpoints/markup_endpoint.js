'use strict';

const MarkupService = require('../services/markup_service');

module.exports = function(router) {

    router.get('/markups', function(req, res) {
	  	var service = new MarkupService({ db: req.db });

	   	service.obterTodos().then(function(rows) {
			res.status(200).json(rows);
	   	});
    });

}
