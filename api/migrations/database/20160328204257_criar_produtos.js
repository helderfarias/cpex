
exports.up = function(knex, Promise) {
  
	return knex.schema.createTableIfNotExists('produtos', function(table) {
		table.increments('id');
		table.string('nome');
	});

};

exports.down = function(knex, Promise) {

	return knex.schema.dropTable('produtos');

};