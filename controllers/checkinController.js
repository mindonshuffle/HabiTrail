const db = require("../models");

// Defining methods for the checkinController
module.exports = {
  find: function(req, res) {
    db.Checkin
      .findById({ _id: req.params.id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Find all checkins for user with specific date
  findByDate: function(req, res) {
    db.Checkin
      .find(req.body)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Checkin
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(`Update ${req.params.id}`, req.body);
    db.Checkin
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },  
  remove: function(req, res) {
    db.Checkin
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
