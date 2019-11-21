exports.seed = function(knex) {
  return knex('countries')
    .del()
    .then(function () {
      return knex('countries').insert([
        {
          name: 'Nigeria'
        },
        {
          name: 'Egypt'
        },
        {
          name: 'United States'
        }
      ]);
    });
};
