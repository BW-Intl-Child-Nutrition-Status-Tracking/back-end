const db = require('../../data/config/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  add,
  // update,
  // remove
};

function find() {
  return db('users').select('id', 'username', 'first_name', 'last_name' /*, 'country_access'*/);
};

function findBy(filter) {
  return db('users').where(filter);
};

function findById(id) {
  return db('users')
    .where({ id })
    .first()
    .select('id', 'username', 'first_name', 'last_name' /*, 'country_access'*/);
};

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
};