'use strict';

// const Promise = require('promise');

// function query(sql) {
	// return new Promise(function(resolve, reject) {
		// var urlCon = 'postgres://user:pass@192.168.25.20/db';

		// pg.connect(urlCon, function(err, client, done) {
	 //        if (err) {
		// 		done();
		// 		return reject(err);
	 //        }

	 //        var result = [];

	 //        client.query(sql).on('row', function(row) {
		// 		result.push(row);
	 //        }).on('end', function() {
	 //            done();
	 //            resolve(result);
	 //        });
	 //    });
	 	// resolve([]);
	// });
// }

class ProdutoService {

	constructor(props) {
		this.db = props.db;
	}

	obterTodos() {
		return this.db.select('*').from('produtos');
	}

}

module.exports = ProdutoService;