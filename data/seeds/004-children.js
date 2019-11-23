exports.seed = function(knex) {
  return knex('children')
    .del()
    .then(function () {
      return knex('children').insert([
        {
          child_name: 'Sekar Mouhammad',
          gender: 'Female',
          dob: '2011-05-22',
          weight_kg: 43,
          heigt_cm: 124,
          screening_date: '2019-11-23',
          community_id: 2,
          parent_name: 'Cecep Mouhammad',
          res_country: 'Sudan',
          res_state: '',
          res_city: 'Khartoum',
          res_address: ''
        },
      ]);
    });
};