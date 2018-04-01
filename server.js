const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); 
const routes = require("./routes");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// *** *** *** ALERT: CookieParser may cause errors *** verify
// app.use(express.cookieParser());

// For Passport
app.use(cookieParser());
require('./config/passport/passport.js')(passport,User);
app.use(session({ secret: 'madsesh',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/habitrail",
  {
    useMongoClient: true
  }
);

// use Express Router routes
app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
