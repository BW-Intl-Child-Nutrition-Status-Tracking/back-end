exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'testuser1',
          password: 'password',
          first_name: 'Paul',
          last_name: 'Atreides',
          email: 'tabr4ever@sietchmail.com'
        },
        {
          username: 'testuser2',
          password: 'password',
          first_name: 'Korbin',
          last_name: 'Dallas',
          email: 'christucker@5thelement.com'
        },
      ]);
    });
};
