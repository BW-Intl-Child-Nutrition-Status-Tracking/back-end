module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/tracker.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test_tracker.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'nutrition_tracker',
      user:     'RecolitusMorbus',
      password: 'N01anrad'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'nutrition_tracker',
      user:     'RecolitusMorbus',
      password: 'N01anrad'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
