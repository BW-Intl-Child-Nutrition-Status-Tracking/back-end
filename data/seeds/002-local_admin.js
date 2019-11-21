const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('local_admin')
    .del()
    .then(function () {
      return knex('local_admin').insert([
        {
          username: 'testuser2',
          password: bcrypt.hashSync('password', 14),
          first_name: 'Gary',
          last_name: '...Gary?',
          email: 'garrryyyygary@vault75.vaulttec.com',
          country_access: 'United States',
          creator: 1
        },
      ]);
    });
};
