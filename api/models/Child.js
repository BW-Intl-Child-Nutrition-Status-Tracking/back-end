'use strict'

/* DEPENDENCIES */
const db = require('../../data/config/dbConfig.js');

/* DEFINE : MODEL */
class Child {
  static async all(filter) {
    if(filter) {
      return await db('children').where(filter).orderBy('name', 'asc');
    } else {
      return await db('children').orderBy('name', 'asc');
    };
  };

  static async create(child) {
    if(process.env.NODE_ENV === 'production') {
      const [ids] = await db('children').insert({
        name: child.name,
        gender: child.gender,
        dob: child.dob,
        weight_kg: child.weight_kg,
        height_cm: child.height_cm,
        screening_date: child.screening_date,
        screening_country: child.screening_country,
        community_id: child.community_id,
        parent_name: child.parent_name,
        res_country: child.res_country,
        res_state: child.res_state,
        res_city: child.res_city,
        res_address: child.res_address
      }, ['id']);
      const new_child = await db('children').where({ id: ids.id }).first();

      return new_child;
    } else {
      const [id] = await db('children').insert({
        name: child.name,
        gender: child.gender,
        dob: child.dob,
        weight_kg: child.weight_kg,
        height_cm: child.height_cm,
        screening_date: child.screening_date,
        screening_country: child.screening_country,
        community_id: child.community_id,
        parent_name: child.parent_name,
        res_country: child.res_country,
        res_state: child.res_state,
        res_city: child.res_city,
        res_address: child.res_address
      });
      const new_child = await db('children').where({ id: id }).first();

      return new_child;
    };
  };

  static async find(filter) {
    return await db('children').where(filter).first();
  };

  static async update(id, child) {
    const changes = {};
    changes.update_at = new Date();

    await db('children').where({ id: id }).update(changes);

    const new_child = await db('children').where({ id: id }).first();

    return new_child;
  };

  static async remove(id) {
    return await db('children').where({ id: id }).del();
  };
};

/* EXPORT : Child */
module.exports = Child;

// module.exports = {
//   find,
//   findById,
//   add,
//   update,
//   remove
// };

// function find() {
//   return db('children');
// };

// function findById(id) {
//   return db('children')
//     .where({ id })
//     .first();
// };

// async function add(child) {
//   const [id] = await db('children').insert(child);

//   return findById(id);
// };

// function update(id, changes) {
//   return db('children')
//     .where({ id })
//     .update(changes, '*');
// };

// function remove(id) {
//   return db('children')
//     .where({ id })
//     .del();
// };