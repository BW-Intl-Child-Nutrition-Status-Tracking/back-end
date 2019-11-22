'user strict'

/* DEFINE : MIDDLEWARE */
function req_body(keys) {
  return (req, res, next) => {
    if(!req.body || Objects.keys(req.body).lenth === 0) {
      return res.status(422).json({ error: { message: `Missing request body.` } });
    };

    let missing_keys = keys.filter(key => !Object.keys(req.body).includes(key));

    if(missing_keys.lenth > 0) {
      return res.status(422).json({ error: {
        message: `Missing fields: ${missing_keys.join(' ')}`
      }});
    };

    return next();
  };
};

/* EXPORT: req_body */
module.exports = req_body;