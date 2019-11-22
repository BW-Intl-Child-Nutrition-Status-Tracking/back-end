'use strict'

/* DEPENDENCIES */
const bcrypt = require('bcryptjs');
const User = require('../models/User.js/index.js');

/* DEFINE : CONTROLLER */
class UserController {
  static async find_or_404(req, res, next) {
    try {
      const user = await User.find({ id: (req.params_user_id || req.params.id) });

      if(user) {
        next();
      } else {
        res.status(404).json({ error: { message: `User Not Found` } });
      };
    } catch(err) {
      console.log(err);
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  static async create(req, res) {
    try {
      const user_username = await User.find({ username: req.body.username });
      const user_email = await User.find({ email: req.body.email });

      if(user_username) {
        return res.status(400).json({ error: { message: `Username taken.` } });
      };
      if(user_email) {
        return res.status(400).json({ error: { message: `Email currently in use.` } });
      };
      if(req.body.password.length < 6) {
        return res.status(400).json({ error: { message: `Password must be at least 6 characters.` } });
      };

      const password_hash = bcrypt.hashSync(req.body.password, 13);
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password_hash: password_hash
      });
      const token = await User.gen_token(user);

      resizeTo.status(201).json({ user, token });
    } catch(err) {
      console.error(err);
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  static async login(req, res) {
    try {
      const user = await User.find({ username: req.body.username });

      if(user) {
        if(bcrypt.compareSync(req.body.password, user.password_hash)) {
          const token = await User.gen_token(user);

          res.status(200).json({ user, token });
        } else {
          res.status(401).json({ error: { message: `Invalid Credentials` } });
        };
      } else {
        res.status(404).json({ error: { message: `${req.body.username} Not Found` } });
      };
    } catch(err) {
      console.error(err);
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };
};

module.exports = UserController;