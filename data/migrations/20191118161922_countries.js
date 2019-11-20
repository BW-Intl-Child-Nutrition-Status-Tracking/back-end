exports.up = function(knex) {
  return knex.schema
    .createTable('countries', count => {
      count.increments();
      count
        .string('name', 255)
        .notNullable()
        .unique();
    })
    .createTable('communities', comm => {
      comm.increments();
      comm
        .string('name', 255)
        .notNullable();
      comm
        .string('country_name')
        .unsigned()
        .references('name')
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
