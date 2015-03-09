/**
/**
 * GET     /user              ->  index
 * POST    /user              ->  create
 * GET     /user/:id          ->  show
 * PUT     /user/:id          ->  update
 * DELETE  /user/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var util = require('../../lib/utility');
var User = require('./user.model');

// Get list of users - admin use only - DISABLED
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(users);
  });
};

// login a user
exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err){
        res.send(401, err);
      }
      if (!user) {
        console.log("user does not exist");
        res.json({error: "user does not exist"});
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
            console.log("successfully logged in");
            // res.json({user_id: user._id});
          } else {
            console.log("incorrect password");
            res.json({error: "incorrect password"});
          }
        })
      }
  });
};

//logout a user
exports.logout = function(req, res) {
  req.session.destroy(function(){
    console.log("logged out");
    res.redirect('/');
  });
};

/************************************************************/
// setup RESTful routing
/************************************************************/

// Get a single user
exports.show = function(req, res) {
  // console.log(req.params);
  User.findById(req.params.id, function (err, user) {
    if(err) {
      return handleError(res, err);
    }
    if(!user) {
      return res.send(404);
    }
    return res.json(user);
  });
};

//create a new user
exports.create = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  // console.log(req.body);
  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err) {
        res.send(400, err);
      }
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          email: email
        });
        newUser.save(function(err, newUser) {
            if (err) {
              console.log('Error creating user!');
              res.status(400).json(err);
            }
            console.log('User successfully created');
            util.createSession(req, res, newUser);
          });
        // res.json({user_id: newUser._id});
      } else {
        console.log('Account already exists');
        res.json({error: "Account already exists"})
      }
    })
};

exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    if(!user) {
      return res.send(404);
    }

    var updated = _.merge(user, req.body);
    // console.log(req.body);
    // Needed because merge does not affect the links array.
    if (req.body.links) {
      updated.links = req.body.links;
    }

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(user);
    });
  });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) {
      return handleError(res, err);
    }
    if(!user) {
      return res.send(404);
    }
    user.remove(function(err) {
      if(err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
