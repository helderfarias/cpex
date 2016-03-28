'use strict';

// function query(sql) {
//     return new Promise(function(resolve, reject) {
//         var urlCon = 'postgres://user:pass@192.168.25.20/db';

//         pg.connect(urlCon, function(err, client, done) {
//             if (err) {
//                 done();
//                 return reject(err);
//             }

//             var result = [];

//             client.query(sql).on('row', function(row) {
//                 result.push(row);
//             }).on('end', function() {
//                 done();
//                 resolve(result);
//             });
//         });
//     });
// }

class Repository {

}

module.exports = Repository;
