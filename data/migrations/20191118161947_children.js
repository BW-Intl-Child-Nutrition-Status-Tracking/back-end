exports.up = function(knex) {
  return knex.schema.createTable('children', tbl => {
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
  return knex.schema.dropTableIfExists('children')
};
