'use strict'

/* DEPENDENCIES */
const Country = require('../models/Country.js');

/* DEFINE : CONTROLLER */
class CountryController {
  static async find_or404(req, res, next) {
    try {
      const country = await Country.find({ id: (req.params.country_id || req.params.id) });

      if(country) {
        next();
      } else {
        res.status(404).json({ error: { message: `Country Not Found` } });
      };
    } catch(err) {
      console.log(err)
      res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  // static async country_index(req, res) {
  //   try {
  //     let filter = {}
  //     if(req.query.q) filter.q = req.query.q;
  //     if(req.query.country_id) filter.country_id = req.query.country_id;
  //     if(req.query.country) filter.country_name = req.query.country;
  //     let countries;

  //     if(Object.keys(filter).length > 0) {
  //       countries = await Country.all(filter);
  //     } else {
  //       countries = await Country.all();
  //     };

  //     res.status(200).json(countries);
  //   } catch(err) {
  //     console.error(err);
  //     res.status(500).json({ error: { message: `Internal Server Error` } });
  //   };
  // };

  static async create(req, res) {
    try {
      const country_name = await Country.find({ name: req.body.name });

      if(country_name) {
        return res.status(400).json({ error: { message: `Country already exists.` } });
      };

      const country = await Country.create({ name: req.body.name });

      resizeTo.status(201).json({ country });
    } catch(err) {
      console.error(err);
      return res.status(500).json({ error: { message: `Internal Server Error` } });
    };
  };

  static async find(filter) {
    return await db('countries').where(filter).first();
  };

  static async update(id, country) {
    const changes = {};
    changes.update_at = new Date();

    await db('countries').where({ id: id }).update(changes);

    const new_country = await db('countries').where({ id: id }).first();

    return new_country;
  };

  static async remove(id) {
    return await db('countries').where({ id: id }).del();
  };
};

/* EXPORT : CountryController */
module.exports = CountryController;