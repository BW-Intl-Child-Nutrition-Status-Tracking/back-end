'user strict'

/* LOAD ENVIRONMENT VARIABLES */
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/* DEPENDENCIES */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

/* DEFINE : SERVER */
const server = express();

/* CONFIG : REMOVE 'x-power-by'(irregular header element) */
server.disable('x-powered-by');

/* MIDDLEWARE */
server.use(helmet());
server.use(cors());
server.use(express.json());

/* ROUTES */
server.use('/', require('../routes/root_router.js'));
server.use('/users', require('../routes/users_router.js'));
server.use('/countries', require('../routes/countries_router.js'));

/* ERROR HANDLER */
server.use(require('../../util/errors/error_handlers.js'));

/* SANITY CHECK */
server.get('/', (req, res) => {
  res.send('You have reached the root directory.');
});

/* EXPORT: server */
module.exports = server;