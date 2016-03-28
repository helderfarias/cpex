'use strict';

const pg = require('pg');

module.exports = function(router) {

    router.get('/produtos', function(req, res) {
    	var urlCon = 'postgres://user:pass@192.168.25.20/bd';
 		var results = [];
    	var data = {text: req.body.text, complete: false};

	    pg.connect(urlCon, function(err, client, done) {
	        if (err) {
	          done();
	          console.log(err);
	          return res.status(500).json({ success: false, data: err});
	        }

	        var query = client.query("SELECT * FROM contratos_cliente  LIMIT 10 OFFSET 10");

	        query.on('row', function(row) {
				results.push(row);
	        });

	        query.on('end', function() {
	            done();
	            return res.json(results);
	        });
	    });    	
    });

}
