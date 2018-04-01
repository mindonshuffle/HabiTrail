var session = require('express-session');
//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport,user){

var User = user;
var LocalStrategy = require('passport-local').Strategy;

//creates a cookie for the user sessions
passport.serializeUser(
    function(user, done) {
        console.log('Serialize: ', user.id);
        done(null, user.id);
    }
);

// used to deserialize the user
//reads the cookie
passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      console.log('Deserialize: ', user);
      if(user){
        done(null, user);
      }
      else{
        done(user.errors,null);
      }
    });
});

passport.use('local-signup', new LocalStrategy(
  {           
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done){
    var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    
    User.findOne({email:email}).then(function(user){

        if(user)
        {
            return done(null, false, {message : 'That email is already taken'} );
        }

        else
        {
            var userPassword = generateHash(password);
            var data =
            { 
                email: email,
                password: userPassword,
                name: 'John Doe',
            };
            User.create(data).then(function(newUser,created){
                if(!newUser){
                    return done(null,false);
                }

                if(newUser){
                    // return done(null,newUser);
                    return done(null,newUser);
                }
            });
            }
        }); 
    }));
  
//LOCAL SIGNIN
passport.use('local-login', new LocalStrategy(
    {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var User = user;
        var isValidPassword = function(userpass,password){
            return bCrypt.compareSync(password, userpass);
        };
        User.findOne({email: email}).then(function (user) {
            if (!user) {
                console.log(email, "User does not exist");
                return done(null, false, { message: 'Email does not exist' });
            };
            if (!isValidPassword(user.password,password)) {
                console.log(user, "Incorrect Password");
                return done(null, false, { message: 'Incorrect password.' });
            };
            var userInfo = user;
            console.log('Passport user: ', userInfo);
            return done(null,userInfo);
        }).catch(function(err){
                console.log("Error:",err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));
};