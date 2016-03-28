'use strict';

const pg = require('pg');
const Promise = require('promise');
const dao = require('../dao');

function query(sql) {
	return new Promise(function(resolve, reject) {
		var urlCon = 'postgres://user:pass@192.168.25.20/db';

		pg.connect(urlCon, function(err, client, done) {
	        if (err) {
				done();
				return reject(err);
	        }

	        var result = [];

	        client.query(sql).on('row', function(row) {
				result.push(row);
	        }).on('end', function() {
	            done();
	            resolve(result);
	        });
	    });
	});
}

module.exports = function(router) {

    router.get('/produtos', function(req, res) {
	   	query("SELECT * FROM contratos_cliente LIMIT 10 OFFSET 10").then(function(rows) {
			return res.status(200).json(rows);
	   	}).catch(function(err) {
	   		console.log(err);
			return res.status(500).json({ success: false, data: err});
	   	});
    });

}
