exports.up = function(knex) {
  return knex.schema
    .createTable('global_admin', global => {
      global.increments();
      global
        .string('username', 20)
        .notNullable()
        .unique();
      global
        .string('password', 255)
        .notNullable();
      global
        .string('first_name', 255)
        .notNullable();
      global
        .string('last_name', 255)
        .notNullable()
      global
        .string('email')
        .notNullable()
        .unique();
    })
    .createTable('countries', count => {
      count.increments();
      count
        .string('name', 255)
        .notNullable()
        .unique();
    })
    .createTable('local_admin', local => {
      local.increments();
      local
        .string('username', 20)
        .notNullable()
        .unique();
      local
        .string('password', 255)
        .notNullable();
      local
        .string('first_name', 255)
        .notNullable();
      local
        .string('last_name', 255)
        .notNullable()
      local
        .string('email')
        .notNullable()
        .unique();
      local
        .string('country_access')
        .unsigned()
        .references('name')
        .inTable('countries')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
      local
        .integer('creator')
        .unsigned()
        .references('id')
        .inTable('global_admin')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
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
    })
    .createTable('children', tbl => {
      tbl.increments();
      tbl
        .string('name', 255)
        .notNullable();
      tbl
        .string('gender')
        .notNullable();
      tbl
        .date('dob')
        .notNullable();
      tbl
        .decimal('weight_kg')
        .notNullable();
      tbl
        .decimal('height_cm')
        .notNullable();
      tbl
        .date('screening_date')
        .notNullable();
      tbl
        .string('screening_country')
        .unsigned()
        .references('name')
        .inTable('countries')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
      tbl
        .integer('community_id')
        .unsigned()
        .references('id')
        .inTable('communities')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
      tbl.string('parent_name');
      tbl.string('res_country');
      tbl.string('res_state');
      tbl.string('res_city');
      tbl.string('res_address')
      tbl
        .timestamp('created_at', { useTz: true })
        .defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('children')
    .dropTableIfExists('communities')
    .dropTableIfExists('local_admin')
    .dropTableIfExists('countries')
    .dropTableIfExists('global_admin');
};
