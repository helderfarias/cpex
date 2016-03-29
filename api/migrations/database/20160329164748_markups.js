
exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists('markups', function(table) {
        table.increments('id');
        table.string('nome');
    });

};

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('markups');

};
