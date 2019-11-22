'user strict'

/* DEPENDENCIES */

const express = require('express');
const req_body = require('../../util/middleware/req_body.js');
const roles_checker = require('../../util/middleware/roles_checker.js');
const AuthController = require('../controllers/AuthController.js');
const UserController = require('../controllers/UserController.js');
const CountryController = require('../controllers/CountryController.js');

/* DEFINE : ROUTER */
const router = express.Router({ mergeParams: true });

/* ROUTES : POST /users/create */
router.route('/create')
  .all(AuthController.req_jwt)
  .all(roles_checker('global_admin'))
  .all(UserController.find_or_404)
  .all(req_body(['username', 'password', 'first_name', 'last_name', 'email']))
  .post(UserController.create);

/* ROUTES : POST /users/login */
router.route('/login')
  .all(req_body(['username', 'password']))
  .post(UserController.login);

/* ROUTERS : GET,POST /users/:id */
router.route('/:id')

// const router = require('express').Router();
// const restricted = require('../auth/restricted-middleware.js');
// const checkRole = require('../auth/check-role.js');

// const Users = require('../models/user-models.js');

// router.get('/', (req, res) => {
//   Users
//     .find()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
  
//   Users
//     .findById(id)
//     .then(users => {
//       const user = users[0];

//       if(user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: `User could not be found.` });
//       };
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// })

// router.put('/:id', restricted, checkRole('global_admin', 'local_admin'), (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   if(
//     user.role === 'global_admin' ||
//     user.id === `${id}`
//   ) { 
//     Users
//       .findById(id)
//       .then(user => {
//         if(user) {
//           Users
//             .update(id, changes)
//             .then(updatedUser => {
//               res.status(201).json(updatedUser);
//             })
//             .catch(err => {
//               res.status(500).json(err);
//             });
//         } else {
//           res.status(404)
//         };
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   } else {
//     res.status(403).json({ message: `User Not Authorized` });
//   };
// });

// router.delete('/:id', restricted, checkRole('global_admin', 'local_admin'), (req, res) => {
//   const { id } = req.params;

//   if(
//     user.role === 'global_admin' ||
//     user.id === `${id}`
//   ) { 
//     Users
//       .findById(id)
//       .then(user => {
//         if(user) {
//           Users
//             .remove(id)
//             .then(deletedUser => {
//               res.status(200).json(deletedUser);
//             })
//             .catch(err => {
//               res.status(500).json(err);
//             });
//         } else {
//           res.status(404)
//         };
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   } else {
//     res.status(403).json({ message: `User Not Authorized` });
//   };
// });

// module.exports = router;