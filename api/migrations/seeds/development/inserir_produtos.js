exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('produtos').del(),

        // Inserts seed entries
        knex('produtos').insert({ id: 1, nome: 'Produto 1' }),
        knex('produtos').insert({ id: 2, nome: 'Produto 2' }),
        knex('produtos').insert({ id: 3, nome: 'Produto 3' }),
        knex('produtos').insert({ id: 4, nome: 'Produto 4' }),
        knex('produtos').insert({ id: 5, nome: 'Produto 5' }),
        knex('produtos').insert({ id: 6, nome: 'Produto 6' }),
        knex('produtos').insert({ id: 7, nome: 'Produto 7' })
    );
};
