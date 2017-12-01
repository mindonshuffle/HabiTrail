const db = require("../models");

// Defining methods for the checkinController
module.exports = {
  sessionId: function(req, res) {
    // db.User
    //   .findById({ _id: req.params.id })
    //   .sort({ date: -1 })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
    //body of the session
    
    var sessionUser = req.session;
    res.send(sessionUser);
    console.log(sessionUser);

        // db.User
        //      .findOne({id: sessionUser.passport.user})
        //      .then( dbModel => res.json(dbModel))
        //     .catch(err => res.status(422).json(err));
        // 
        
    //console.log the id of the user
    // console.log(sessionUser.passport.user, " ======user id number=====");
  },
  
};
