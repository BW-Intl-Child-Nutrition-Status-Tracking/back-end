'user strict'

/* DEFINE : MIDDLEWARE */
function catch_nf(req, res, next) {
  let err = new Error();
  err.status = 404;
  err.message = `Not Found`;

  next(err);
};

function catch_srverr(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || `Internal Server Error`;

  console.error(err.message);

  res.status(err.status).json({ err: {
    status: err.status,
    message: err.message
  }});
};

/* EXPORT : error_handlers */
module.exports = [ catch_nf, catch_srverr ];