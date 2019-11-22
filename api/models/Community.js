'use strict'

/* DEPENDENCIES */
const db = require('../../data/config/dbConfig.js');

/* DEFINE : MODEL */
class Community {
  static async all(filter) {
    if(filter) {
      return await db('communities').where(filter).orderBy('name', 'asc');
    } else {
      return await db('communities').orderBy('name', 'asc');
    };
  };

  static async create(community) {
    if(process.env.NODE_ENV === 'production') {
      const [ids] = await db('communities').insert({ name: community.name }, ['id']);
      const new_community = await db('communities').where({ id: ids.id }).first();

      return new_community;
    } else {
      const [id] = await db('communities').insert({ name: community.name });
      const new_community = await db('communities').where({ id: id }).first();

      return new_community;
    };
  };

  static async find(filter) {
    return await db('communities').where(filter).first();
  };

  static async update(id, community) {
    const changes = {};
    changes.update_at = new Date();

    await db('communities').where({ id: id }).update(changes);

    const new_community = await db('communities').where({ id: id }).first();

    return new_community;
  };

  static async remove(id) {
    return await db('communities').where({ id: id }).del();
  };
};

/* EXPORT : Community */
module.exports = Community;

// module.exports = {
//   find,
//   findById,
//   add,
//   update,
//   remove
// };

// function find() {
//   return db('communities');
// };

// function findById(id) {
//   return db('communities')
//     .where({ id })
//     .first();
// };

// async function add(community) {
//   const [id] = await db('communities').insert(community);

//   return findById(id);
// };

// function update(id, changes) {
//   return db('communities')
//     .where({ id })
//     .update(changes, '*');
// };

// function remove(id) {
//   return db('communities')
//     .where({ id })
//     .del();
// };