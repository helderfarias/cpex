// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'croquil',
      user:     'croquil',
      password: 'croquil00'
    },
    pool: {
      min: 1,
      max: 2
    },
    migrations: {
      tableName: 'evolucao_schema'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'pcroquil',
      user:     'pcroquil',
      password: 'pcroquil00'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'evolucao_schema'
    }
  }

};
