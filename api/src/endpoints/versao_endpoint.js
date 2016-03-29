'use strict';

module.exports = function(router) {

	router.get('/versao', function(req, res) {
    	res.json({ "version": "1.0.0" });   
	});

}

