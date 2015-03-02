'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackSchema = new Schema({

  modified: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: String
  },
  song: {
    type: String
  },
  notes: {
    type: Array
  },
  title: {
    type: String
  },
  isMuted: {
    type: Boolean
  },
  solo: {
    type: Boolean
  },
  octave: {
    type: Number
  },
  volume: {
    type: Number
  },
  instrument: {
    type: String
  },
  type: {
    type: String
  }

});

//Validations
TrackSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
TrackSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

module.exports = mongoose.model('Track', TrackSchema);
