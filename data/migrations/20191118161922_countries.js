exports.up = function(knex) {
  return knex.schema
    .createTable('countries', tbl => {
      tbl.increments();
      tbl
        .string('country_name', 255)
        .notNullable()
        .unique();
    })
    .createTable('communities', tbl => {
      tbl.increments();
      tbl
        .string('community_name', 255)
        .notNullable();
      tbl
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
