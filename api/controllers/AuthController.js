'use strict'

/* DEPENDENCIES */
const jwt = require('jsonwebtoken');
const secrets = require('../../data/config/secrets.js');

/* DEFINE : CONTROLLER */
class AuthController {
  static req_jwt(req, res, next) {
    const token = req.header('Authorization');

    if(token) {
      jwt.verify(token, secrets.jwtSecrets, (err, decoded) => {
        if(err) return res.status(401).json(err);
        req.user = { roles: decoded.roles, username: decoded.username };

        next();
      });
    } else {
      return res.status(400).json({
        error: { message: `No token provided. Ensure that the token is pushed to the Authorization Header before initiating anther attempt.`}
      });
    };
  };
};

/* EXPORT : AuthController */
module.exports = AuthController;

// const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const secret = require('../../data/config/secrets.js');
// const restricted = require('./restricted-middleware.js.js.js');
// const checkRole = require('./check-role.js.js.js');

// const Users = require('../models/users.js/index.js');

// router.post('/create/user', restricted, checkRole('global_admin'), (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 14);
//   user.password = hash;

//   Users
//     .create(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   Users
//     .findBy({ username })
//     .first()
//     .then(user => {
//       if(user && bcrypt.compareSync(password, user.password)) {
//         const token = getJwtToken(user.name);

//         Users
//           .findById(user.id)
//           .then(() => {
//             res.status(200).json(token);
//           });
//       } else {
//         res.status(401).json({ message: `Invalid credentials.` });
//       };
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// function getJwtToken(user) {
//   const payload = { 
//     subject: user.id,
//     username: user.username,
//     roles: ['global_admin', 'local_admin']
//   };
//   const options = {
//     expiresIn: '30d'
//   };

//   return jwt.sign(payload, secret.jwtSecrets, options);
// };

// module.exports = router;