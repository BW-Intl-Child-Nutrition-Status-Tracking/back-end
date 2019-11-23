module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/nutrition_tracker.db3'
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
      filename: './data/nutrition_tracker.db3'
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

  production: {
    client: 'pg',
    debug: true,
    connection: 'postgres://xgpxerjglleira:202be4ae54c0c01e86b6417e85c74725253e4646ac1cc60ed4bab00c6d8683ba@ec2-23-21-94-99.compute-1.amazonaws.com:5432/dtkvfqpdloabq',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    ssl: true
  },

};
