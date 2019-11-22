'use strict'

/* DEFINE : CONTROLLER */
class RootController {
  static index(req, res) {
    res.sendStatus(200);
  };
};

/* EXPORT: RootRouter */
module.exports = RootController;