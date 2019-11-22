'use strict'

/* DEPENDENCIES */
const Country = require('../models/country-model.js');
const Community = require('../models/community-models.js');
const Children = require('../models/child-models.js');

/* DEFINE CONTROLLER */
class CountryController {
  static async find_or404(req, res, next) {
    try {
      const country = await Country.find({ id: (req.params.country_id || req.params.id) });

      if(country) {
        next();
      } else {
        res.status(404).json({ error: { messgae: `Country Not Found` } });
      };
    } catch(err) {
      console.log(err)
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  static async country_index(req, res) {
    try {
      let filter = {}
      if(req.query.q) filter.q = req.query.q;
      if(req.query.country_id) filter.country_id = req.query.country_id;
      if(req.query.country) filter.country_name = req.query.country;
      let countries;

      if(Object.keys(filter).length > 0) {
        countries = await Country.all(filter);
      } else {
        countries = await Country.all();
      };

      res.status(200).json(countries);
    } catch(err) {
      console.error(err);
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  static async update(req, res) {
    try {
      const 
    }
  }
}