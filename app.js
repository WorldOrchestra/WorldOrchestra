var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');

var util = require('./server/lib/utility');

var mongoose = require('mongoose');
var db = require('./server/config');

var app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

var env = app.get('env');
if ('production' === env) {
  app.use(express.static(__dirname + '/dist'));
}
if ('development' === env || 'test' === env) {
  app.use(express.static(__dirname + '/public'));
}

app.use(session({
  secret: 'we\'re making music together',
  resave: false,
  saveUninitialized: true
}));

var logIt = function(req,res,next){
  console.log(req.method + " to " + req.url);
  next();
};

app.all("*", logIt);

app.use('/api/songs', require('./server/api/song'));
app.use('/api/tracks', require('./server/api/track'));
app.use('/api/users', require('./server/api/user'));

//serve up index on root
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

//test authentication with a route
app.get('/secret', util.checkUser, function(req, res){
  res.json({message: "super secret place"});
});

/************************************************************/
// Handle the wildcard route last - if all other routes fail
// send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  res.redirect('/');
});

var port = process.env.OPENSHIFT_NODEJS_PORT ||
           process.env.PORT ||
           9000;

console.log('listening on port ' + port);
app.listen(port);
