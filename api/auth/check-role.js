module.exports = function(role) {
  return function(req, res, next) {
    if(req.user) {
      if (
        req.user.roles &&
        Array.isArray(req.user.roles) &&
        req.user.roles.includes(role)
      ) {
        next();
      } else {
        res.status(403).json({ message: `User Not Authorized` });
      };
    } else {
      res.status(402).json({ message: `Invalid Credentials` });
    };
  };
};