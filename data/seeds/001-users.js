const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'testuser1',
          password: bcrypt.hashSync('password', 14),
          first_name: 'Paul',
          last_name: 'Atreides',
          email: 'tabr4ever@sietchmail.com'
        },
        {
          username: 'testuser2',
          password: bcrypt.hashSync('password', 14),
          first_name: 'Korbin',
          last_name: 'Dallas',
          email: 'christucker@5thelement.com'
        },
      ]);
    });
};