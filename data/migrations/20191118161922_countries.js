exports.up = function(knex) {
  return knex.schema
    .createTable('countries', count => {
      count.increments();
      count
        .string('country_name', 255)
        .notNullable()
        .unique();
    })
    .createTable('communities', comm => {
      comm.increments();
      comm
        .string('community_name', 255)
        .notNullable();
      comm
        .integer('country_id')
        .unsigned()
        .references('id')
        .inTable('countries')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('communities')
    .dropTableIfExists('countries');
};
