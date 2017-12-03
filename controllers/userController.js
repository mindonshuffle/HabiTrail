const db = require("../models");
const moment = require("moment");

// Defining methods for the userController
module.exports = {
  //find user by user id
  find: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //find habits associated with 
  findHabits: function(req, res) {
    db.Habit
      .find({ userId: req.params.id })
      .sort({ createdDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCheckins: function(req, res) {
    db.Checkin
      .find({ userId: req.params.id })
      .sort({ createdDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCheckinsByDate: function(req, res) {
    
    findDate = moment.utc(req.params.date, 'YYYYMMDD').toDate();

    db.Checkin
      .find({ userId: req.params.id , date: findDate })
      .populate('habitId')
      .sort({ createdDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(`Update ${req.params.id}`, req.body);
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },  
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
