exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 20)
        .notNullable()
        .unique();
      tbl
        .string('password', 255)
        .notNullable();
      tbl
        .string('first_name', 255)
        .notNullable();
      tbl
        .string('last_name', 255)
        .notNullable()
      tbl
        .string('email')
        .notNullable()
        .unique();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
