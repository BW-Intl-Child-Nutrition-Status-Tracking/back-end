const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role.js');

const Countries = require('../models/country-models.js');
const Communities = require('../models/community-models.js');
const Children = require('../models/child-models.js');

router.get('/:name', restricted, checkRole('global_admin', 'local_admin'), (req, res) => {
  const { name } = req.params;

  if(
    user.role === 'global_admin' ||
    user.role === 'local_admin' &&
    user.country === `${name}`
  ) {
    Countries
      .findByName(name)
      .then(() => {
        router.get('/:id', (req, res) => {
          const { id } = req.params;

          Communities
            .findById(id)
            .then(communities => {
              const community = communities[0];

              if(community) {
                router.get('/', (req, res) => {
                  Children
                    .find()
                    .then(children => {
                      res.status(200).json(children);
                    })
                    .catch(err => {
                      res.status(500).json(err);
                    });
                });

                router.get('/:id', (req, res) => {
                  const { id } = req.params;
                  
                  Children
                    .findById(id)
                    .then(children => {
                      const child = children[0];

                      if(child) {
                        res.status(200).json(child);
                      } else {
                        res.status(404).json({ message: `Child could not be found.` });
                      };
                    })
                    .catch(err => {
                      res.status(500).json(err);
                    });
                });

                router.post('/add', (req, res) => {
                  Children
                    .add(child)
                    .then(saved => {
                      res.status(201).json(saved);
                    })
                    .catch(err => {
                      res.status(500).json(err);
                    });
                });

                router.put('/:id', (req, res) => {
                  const { id } = req.params;
                  const changes = req.body;

                  Children
                    .findById(id)
                    .then(child => {
                      if(child) {
                        Children
                          .update(id, changes)
                          .then(updatedChild => {
                            res.status(201).json(updatedChild);
                          })
                          .catch(err => {
                            res.status(500).json(err);
                          });
                      } else {
                        res.status(404)
                      };
                    })
                    .catch(err => {
                      res.status(500).json(err);
                    });
                });

                router.delete('/:id', (req, res) => {
                  const { id } = req.params;

                  Children
                    .findById(id)
                    .then(child => {
                      if(child) {
                        Children
                          .remove(id)
                          .then(deletedChild => {
                            res.status(200).json(deletedChild);
                          })
                          .catch(err => {
                            res.status(500).json(err);
                          });
                      } else {
                        res.status(404)
                      };
                    })
                    .catch(err => {
                      res.status(500).json(err);
                    });
                });
              } else {
                res.status(404).json({ message: `Community could not be found.` });
              };
            })
            .catch(err => {
              res.status(500).json(err);
            });
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(403).json({ message: `User Not Authorized` });
  };
})

module.exports = router;

