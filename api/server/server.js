const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Auth = require('../auth/auth-routes.js');
const User = require('../routes/user-routes.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', Auth);
server.use('/r', User);

server.get('/', (req, res) => {
  res.send('You have reached the root directory.');
});

module.exports = server;