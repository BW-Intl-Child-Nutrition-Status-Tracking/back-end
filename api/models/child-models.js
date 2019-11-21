const db = require('../../data/config/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('children');
};

function findById(id) {
  return db('children')
    .where({ id })
    .first();
};

async function add(child) {
  const [id] = await db('children').insert(child);

  return findById(id);
};

function update(id, changes) {
  return db('children')
    .where({ id })
    .update(changes, '*');
};

function remove(id) {
  return db('children')
    .where({ id })
    .del();
};