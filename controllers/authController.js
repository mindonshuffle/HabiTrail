const db = require("../models");

// Defining methods for the auth Controller
module.exports = {
  userId: function(req, res){
    if(!req.session.passport){
      res.redirect('/');
    }
    else{
      // console.log('authController: ', req.session.passport);
      res.json(req.session.passport);
    }
  },
  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },
};


/*
userId: function(req, res) {
    //   let id = {
  //     _id: '5a1f16bae5ece1c4dc4de68e',
  //     email: 'test@test.com',
  //   };
  //   console.log('calling sessionid')
  //   res.json(id);
    
  // db.User
  //   .findById({ _id: req.params.id })
  //   .sort({ date: -1 })
  //   .then(dbModel => res.json(dbModel))
  //   .catch(err => res.status(422).json(err));
  //body of the session
  
  var sessionUser = req.user;
  res.send(sessionUser);
  console.log(sessionUser);
  
  // db.User
  //      .findOne({id: sessionUser.passport.user})
  //      .then( dbModel => res.json(dbModel))
        //     .catch(err => res.status(422).json(err));
        // 
        
    //console.log the id of the user
    console.log(sessionUser.passport.user, " ======user id number=====");
  },
*/