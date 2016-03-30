
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('markups').del(),

    // Inserts seed entries
    knex('markups').insert({id: 1, nome: 'Calculo Padrão 1'}),
    knex('markups').insert({id: 2, nome: 'Calculo Padrão 2'}),
    knex('markups').insert({id: 3, nome: 'Calculo Padrão 3'}),
    knex('markups').insert({id: 4, nome: 'Calculo Padrão 4'}),
    knex('markups').insert({id: 5, nome: 'Calculo Padrão 5'}),
    knex('markups').insert({id: 6, nome: 'Calculo Padrão 6'}),
    knex('markups').insert({id: 7, nome: 'Calculo Padrão 7'})
  );
};
