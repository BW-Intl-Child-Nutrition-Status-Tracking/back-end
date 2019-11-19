exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users
        .string('username', 20)
        .notNullable()
        .unique();
      users
        .string('password', 255)
        .notNullable();
      users
        .string('first_name', 255)
        .notNullable();
      users
        .string('last_name', 255)
        .notNullable()
      users
        .string('email')
        .notNullable()
        .unique();
      // users
      //   .string('country_access')
      //   .unsigned()
      //   .references('name')
      //   .inTable('countries')
      //   .onDelete('NO ACTION')
      //   .onUpdate('NO ACTION')
      //   .notNullable();
    })
    .createTable('users_roles', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      tbl
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    })
    .createTable('roles', roles => {
      roles.increments();
      roles
        .string('title', 255)
        .notNullable();
      roles
        .boolean('is_global')
        .notNullable()
        .defaultTo(false);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('roles')
    .dropTableIfExists('users_roles')
    .dropTableIfExists('users');
};
