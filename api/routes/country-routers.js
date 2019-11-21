const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role.js');

const Countries = require('../models/country-models.js');

router.get('/', restricted, checkRole('global_admin'), (req, res) => {
  Countries
    .find()
    .then(countries => {
      res.status(200).json(countries);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:name', restricted, checkRole('global_admin', 'local_admin'), (req, res) => {
  const { name } = req.params;
  
  if(
    user.role === 'global_admin' ||
    user.role === 'local_admin' &&
    user.country === `${name}`
  ) {
    Countries
      .findByName(name)
      .then(countries => {
        const country = countries[0];

        if(country) {
          res.status(200).json(country);
        } else {
          res.status(404).json({ message: `Country could not be found.` });
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(403).json({ message: `User Not Authorized` });
  };
})

router.post('/create/country', restricted, checkRole('global_admin'), (req, res) => {
  Countries
    .add(country)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:name', restricted, checkRole('global_admin'), (req, res) => {
  const { name } = req.params;
  const changes = req.body;

  Countries
    .findByName(name)
    .then(country => {
      if(country) {
        Countries
          .update(name, changes)
          .then(updatedCountry => {
            res.status(201).json(updatedCountry);
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

router.delete('/:name', restricted, checkRole('global_admin'), (req, res) => {
  const { name } = req.params;

  Countries
    .findByName(name)
    .then(country => {
      if(country) {
        Countries
          .remove(name)
          .then(deletedCountry => {
            res.status(200).json(deletedCountry);
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

module.exports = router;