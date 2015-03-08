var request = require('request');

/************************************************************/
// Add additional utility functions below
/************************************************************/


var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  console.log("running auth");
  if (!isLoggedIn(req)) {
    console.log("you are not logged in");
    res.redirect('/login');
  } else {
    console.log("you are logged in");
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};
