const db = require('../../data/config/dbConfig.js');

module.exports = {
  findCountries,
  findCommunities,
  findChildren,
  findCountryById,
  findCommunityById,
  findChildById
};

function findCountries() {
  return db('countries');
};

function findCommunities() {
  return db('communities');
};

function findChildren() {
  return db('children')
};

function findCountryById(id) {
  return db('countries')
    .where({ id })
    .first();
};

function findCommunityById(id) {
  return db('communities')
    .where({ id })
    .first();
};

function findChildById(id) {
  return db('children')
    .where({ id })
    .first();
};