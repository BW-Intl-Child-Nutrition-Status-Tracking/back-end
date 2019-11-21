const db = require('../../data/config/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('communities');
};

function findById(id) {
  return db('communities')
    .where({ id })
    .first();
};

async function add(community) {
  const [id] = await db('communities').insert(community);

  return findById(id);
};

function update(id, changes) {
  return db('communities')
    .where({ id })
    .update(changes, '*');
};

function remove(id) {
  return db('communities')
    .where({ id })
    .del();
};