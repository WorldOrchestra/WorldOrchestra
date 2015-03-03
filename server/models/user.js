var mongoose = require('mongoose');
var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  username: {
    type: String, 
    index: {unique: true},
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next){
  user = this;
  if(user.isModified('password')){
    bcrypt.hash(user.password, null, null, function(err, hash){
      if (err){
        next();
      }
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      throw err;
    }
    callback(isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);