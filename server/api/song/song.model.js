'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({

  _id: {
    type: String
  },
  modified: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: String
  },
  tempo: {
    type: Number,
  },
  title: {
    type: String,
  },
  timeSignature: {
    type: Number,
  },
  length: {
    type: String,
  },
  activeTrack: {
    type: String,
  },
  tracks: {
    type: Array
  }

});

//Validations
SongSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
SongSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

module.exports = mongoose.model('Song', SongSchema);
