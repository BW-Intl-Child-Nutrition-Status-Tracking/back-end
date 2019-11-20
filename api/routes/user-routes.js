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

router.get('/users/:id', restricted, async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await Users.findById(id);
    if(user.id) {
      res.status(200).json(user);
    } else if(!user.id) {
      res.status(404).json({ message: `User could not be found.` });
    };
  } catch(err) {
    res.status(500).json(err);
  };

  // Users
  //   .findById(id)
  //   .then(users => {
  //     const user = users[0];

  //     if(user) {
  //       res.status(200).json(user);
  //     } else {
  //       res.status(404).json({ message: 'User not found.' });
  //     };
  //   })
  //   .catch(err => {
  //     res.status(500).json(err);
  //   });
});

module.exports = router;