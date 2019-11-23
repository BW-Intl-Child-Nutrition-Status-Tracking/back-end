exports.seed = function(knex) {
  return knex('countries')
    .del()
    .then(function () {
      return knex('countries').insert([
        {
          country_name: 'Egypt',
        },
        {
          country_name: 'Sudan',
        },
      ]);
    });
};