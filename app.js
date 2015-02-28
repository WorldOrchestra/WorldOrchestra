var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');

var util = require('./server/lib/utility');

var mongoose = require('mongoose');
var db = require('./server/config');
//User model
var User = require('./server/models/user.js');

var app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'we\'re making music together',
  resave: false,
  saveUninitialized: true
}));

app.use('/api/songs', require('./server/api/song'));

//serve up index on root
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

//test authentication with a route
app.get('/secret', util.checkUser, function(req, res){
  res.json({message: "super secret place"});
});
/************************************************************/
// Write your authentication routes here
/************************************************************/

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err){
        res.send(401, err);
      }
      if (!user) {
        console.log("User does not exist");
        res.redirect('/');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
            console.log("successfully logged in");
          } else {
            console.log("incorrect pasword");
            res.redirect('/');
          }
        })
      }
  });
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    console.log("logged out");
    res.redirect('/');
  });
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);
  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err) {
        res.send(400, err);
      }
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
            if (err) {
              res.send(400, err);
            }
            util.createSession(req, res, newUser);
          });
        console.log('User successfully created');
      } else {
        console.log('Account already exists');
        res.redirect('/');
      }
    })
});

/************************************************************/
// Handle the wildcard route last - if all other routes fail
// send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  res.redirect('/');
});


console.log('listening on port 9000');
app.listen(9000);
