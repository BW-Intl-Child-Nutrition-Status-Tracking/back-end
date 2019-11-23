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
      // tbl
      //   .boolean('is_global')
      //   .defaultTo(false);
      tbl
        .string('role', 20)
        .notNullable();

    })
    .createTable('roles', roles => {
      roles.increments();
      roles
        .string('title', 255)
        .notNullable();
    })
    .createTable('users_roles', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
      tbl
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
};
