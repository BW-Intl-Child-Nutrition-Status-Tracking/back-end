exports.seed = function(knex) {
  return knex('table_name')
    .del()
    .then(function () {
      return knex('table_name').insert([
        {
          name: 'Nellis AFB',
          country_name: 'United States'
        },
        {
          name: 'Las Vegas',
          country_name: 'United States'
        }
      ]);
    });
};
