
exports.seed = function(knex) {\
  return knex('children').del()
    .then(function () {
      return knex('children').insert([
        {
          name: 'Gary',
          gender: 'male',
          dob: '2009-04-18',
          weight_kg: 0.0,
          height_cm: 0.0,
          screening_date: '2019-07-01',
          screening_country: 'United States',
          community_id: 1,
        },
      ]);
    });
};
