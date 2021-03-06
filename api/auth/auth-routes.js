const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../../data/config/secrets.js');
const Users = require('../models/user-models.js');

router.post('/add-user', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users
    .findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.name);

        Users
          .findById(user.id)
          .then(() => {
            res.status(200).json(token);
          });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function getJwtToken(username) {
  const payload = { username };
  const options = {
    expiresIn: '30d'
  };

  return jwt.sign(payload, secret.jwtSecrets, options);
};

module.exports = router;