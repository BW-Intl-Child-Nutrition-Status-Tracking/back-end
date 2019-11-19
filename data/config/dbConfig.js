const knex = require('knex');

const knexConfig = require('../../knexfile.js');

let client
switch(process.env.NODE_ENV) {
  case 'production':
    client = knex(knexConfig.production) //for heroku postgres
    break
  case 'test':
    client = knex(knexConfig.testing)
    break
  default:
    client = knex(knexConfig.development) //for testing and running SQLite
}

module.exports = client;