'use strict'

/* IMPORT DEPENDENCIES */
const server = require('./api/server/server.js');

/* DEFINE : CONSTANT */
const PORT = process.env.PORT || 8000;

/* START SERVER */
server.listen(PORT, () => {
  console.log(`/*** Listening on PORT ${PORT} ***/`);
});