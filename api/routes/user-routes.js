const router = require('express').Router();

const Users = require('../models/user-models.js');
const restricted = require('../auth/middleware/restricted-middleware.js');
const papers = require('../auth/middleware/papers-please.js');

router.get('/users', restricted, papers('global_admin'), (req, res) => {
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
});

module.exports = router;