'use strict'

/* DEPENDENCIES */
const jwt = require('jsonwebtoken');
const db = require('../../data/config/dbConfig.js');
const secrets = require('../../data/config/secrets.js');

/* DEFINE : MODEL */
class User {
  static async all() {
    return await this.bind('users');
  };

  static async create(user) {
    if(process.env.NODE_ENV === 'production') {
      const [ids] = await db('users').insert({
        username: user.username,
        password_hash: user.password_hash,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }, ['id']);
      const new_user = await db('users').where({ id: ids.id }).first();

      return new_user;
    } else {
      const [id] = await db('users').insert({
        username: user.username,
        password_hash: user.password_hash,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      const new_user = await db('users').where({ id: id }).first();

      return new_user;
    };
  };

  static async find(filter) {
    return await db('users').where(filter).first();
  };

  static async update(id, user) {
    const changes = {};
    changes.update_at = new Date();

    await db('users').where({ id: id }).update(changes);

    const new_user = await db('users').where({ id: id }).first();

    return new_user;
  };

  static async remove(id) {
    return await db('users').where({ id: id }).del();
  };

  static async email_uniqueness(email) {
    const user =await db('users').where({ email: email }).first();

    if(user) {
      return false;
    } else {
      return true;
    };
  };

  static async gen_token(user) {
    const payload = { 
      subject: user.id,
      username: user.username,
      roles: ['global_admin', 'local_admin']
    };
    const options = {
      expiresIn: '30d'
    };
  
    return jwt.sign(payload, secrets.jwtSecrets, options);
  };
};

/* EXPORT : User */
module.exports = User;

// module.exports = {
//   find,
//   findBy,
//   findById,
//   add,
//   update,
//   remove
// };

// function find() {
//   return db('users').select('id', 'username', 'first_name', 'last_name', 'email');
// };

// function findBy(filter) {
//   return db('users').where(filter);
// };

// function findById(id) {
//   return db('users')
//     .where({ id })
//     .first();
// };

// async function add(user) {
//   const [id] = await db('users').insert(user);

//   return findById(id);
// };

// function update(id, changes) {
//   return db('users')
//     .where({ id })
//     .update(changes, '*');
// };

// function remove(id) {
//   return db('users')
//     .where({ id })
//     .del();
// };