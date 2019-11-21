const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Auth = require('../auth/auth-routes.js');
const Users = require('../routes/user-routes.js');
const Count = require('../routes/country-routers.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', Auth);
server.use('/r/users', Users);
server.use('/r', Count);

server.get('/', (req, res) => {
  res.send('You have reached the root directory.');
});

module.exports = server;