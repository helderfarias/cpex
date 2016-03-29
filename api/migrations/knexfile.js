// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'croquil',
            user: 'croquil',
            password: 'croquil00'
        },
        pool: {
            min: 1,
            max: 2
        },        
        migrations: {
            directory: './database',
            tableName: 'evolucao_schema'
        },
        seeds: {
            directory: './seeds/development'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'croquil',
            user: 'croquil',
            password: 'croquil00'
        },
        pool: {
            min: 1,
            max: 2
        },
        migrations: {
            directory: './database',
            tableName: 'evolucao_schema'
        }        
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'pcroquil',
            user: 'pcroquil',
            password: 'pcroquil00'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './database',
            tableName: 'evolucao_schema'
        }
    }

};
