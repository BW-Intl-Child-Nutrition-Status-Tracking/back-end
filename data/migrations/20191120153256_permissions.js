exports.up = function(knex) {
  return knex.schema
    .createTable('permissions', perm => {
      perm.increments();
      perm
        .string('name', 255)
        .notNullable();
      perm.text('desc', 6000);
    })
    .createTable('role_permissions', tbl => {
      tbl
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
      tbl
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION')
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('permissions');
};
