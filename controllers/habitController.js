const db = require('../models');
const moment = require('moment');

//when new habit is created, habit checkins are created for the next 14 days
function populateCheckins(habitId, userId){
  // console.log(habitId);
  
  for(var i = 0; i < 14; i++){
  
    const checkinDate = moment().startOf('day').add(i, 'days').toDate();
    // console.log(checkinDate);
    db.Checkin
      .create({
        habitId: habitId,
        userId: userId,
        date: checkinDate
      })
      .catch(err => res.status(422).json(err));
  }
}

// Defining methods for the habitController
module.exports = {
  // find all habits matching id
  find: function(req, res) {
    db.Habit
      .find({ _id: req.params.id })
      .sort({ createdDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //create and populate new habit
  create: function(req, res) {
    db.Habit
      .create(req.body)
      .then(dbModel => {
        res.json(dbModel)
        populateCheckins(dbModel._id, dbModel.userId);
      })
      .catch(err => res.status(422).json(err));
  },
  // update existing habit
  update: function(req, res) {
    db.Habit
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },  

    // delete existing habit
    remove: function(req, res) {
      db.Habit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      db.Checkin
      .remove({ habitId : req.params.id }, function(err){
        if(err) throw err; 
      })
      // .find({ habitId: req.params.id })
      // .then(dbModel => {console.log(dbModel)})
    }
  };