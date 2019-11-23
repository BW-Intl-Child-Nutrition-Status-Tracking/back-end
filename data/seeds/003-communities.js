exports.seed = function(knex) {
  return knex('communities')
    .del()
    .then(function () {
      return knex('communities').insert([
        {
          community_name: 'Khartoum',
          country_id: 2
        },
        {
          community_name: 'Cairo',
          country_id: 1
        },
      ]);
    });
};