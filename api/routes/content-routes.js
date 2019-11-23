const router = require('express').Router();

const Content = require('../models/content-models.js');
const restricted = require('../auth/middleware/restricted-middleware.js');

router.get('/countries', restricted, (req, res) => {
  Content
    .findCountries()
    .then(countries => {
      res.status(200).json(countries);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/countries/:id', restricted, async (req, res) => {
  const { id } = req.params;
  
  try {
    const country = await Content.findCountryById(id);
    if(country.id) {
      res.status(200).json(country);
    } else if(!country.id) {
      res.status(404).json({ message: `Country could not be found.` });
    };
  } catch(err) {
    res.status(500).json(err);
  };
});

router.get('/communities', restricted, (req, res) => {
  Content
    .findCommunities()
    .then(communities => {
      res.status(200).json(communities);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/communities/:id', restricted, async (req, res) => {
  const { id } = req.params;
  
  try {
    const community = await Content.findCommunityById(id);
    if(community.id) {
      res.status(200).json(community);
    } else if(!community.id) {
      res.status(404).json({ message: `Community could not be found.` });
    };
  } catch(err) {
    res.status(500).json(err);
  };
});

router.get('/children', restricted, (req, res) => {
  Content
    .findChildren()
    .then(countries => {
      res.status(200).json(countries);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/children/:id', restricted, async (req, res) => {
  const { id } = req.params;
  
  try {
    const child = await Content.findChildById(id);
    if(child.id) {
      res.status(200).json(child);
    } else if(!child.id) {
      res.status(404).json({ message: `Child could not be found.` });
    };
  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;