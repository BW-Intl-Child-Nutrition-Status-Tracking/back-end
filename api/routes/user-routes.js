const router = require('express').Router();

const Users = require('../models/user-models.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/users', restricted, (req, res) => {
  Users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;