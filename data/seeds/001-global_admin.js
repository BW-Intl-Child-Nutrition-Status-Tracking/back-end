const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('global_admin')
    .del()
    .then(function () {
      return knex('global_admin').insert([
        {
          username: 'testuser1',
          password: bcrypt.hashSync('password', 14),
          first_name: 'Geralt',
          last_name: 'of Rivia',
          email: 'monsterhunter@schoolofwolf.co.ked'
        },
      ]);
    });
};
