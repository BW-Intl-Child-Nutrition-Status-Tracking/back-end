const db = require('../../data/config/dbConfig.js');

module.exports = {
  find,
  findByName,
  add,
  update,
  remove
};

function find() {
  return db('countries');
};

function findByName(name) {
  return db('countries')
    .where({ name })
    .first();
};

async function add(country) {
  const [id] = await db('countries').insert(country);

  return findById(id);
};

function update(name, changes) {
  return db('countries')
    .where({ name })
    .update(changes, '*');
};

function remove(id) {
  return db('countries')
    .where({ id })
    .del();
};