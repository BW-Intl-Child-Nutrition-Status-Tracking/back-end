const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role.js');

const Countries = require('../models/country-models.js');
const Communities = require('../models/community-models.js');

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
        router.get('/:id/', (req, res) => {
          Communities
            .find()
            .then(communities => {
              res.status(200).json(communities);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        });
        
        router.get('/:id', (req, res) => {
          const { id } = req.params;
          
          Communities
            .findById(id)
            .then(communities => {
              const community = communities[0];
        
              if(community) {
                res.status(200).json(community);
              } else {
                res.status(404).json({ message: `Community could not be found.` });
              };
            })
            .catch(err => {
              res.status(500).json(err);
            });
        })
        
        router.post('/create', (req, res) => {
          Communities
            .add(community)
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
        
          Communities
            .findById(id)
            .then(country => {
              if(country) {
                Communities
                  .update(id, changes)
                  .then(updatedCommunity => {
                    res.status(201).json(updatedCommunity);
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
        
          Communities
            .findById(id)
            .then(community => {
              if(community) {
                Communities
                  .remove(id)
                  .then(deletedCommunity => {
                    res.status(200).json(deletedCommunity);
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
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(403).json({ message: `User Not Authorized` });
  };
})

module.exports = router;