/**
/**
 * GET     /track              ->  index
 * POST    /track              ->  create
 * GET     /track/:id          ->  show
 * PUT     /track/:id          ->  update
 * DELETE  /track/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Track = require('./track.model');

// Get list of tracks
exports.index = function(req, res) {
  Track.find(function (err, tracks) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(tracks);
  });
};

// Get a single track
exports.show = function(req, res) {
  console.log('show track req.params.id ', req.params.id);
  Track.findById(req.params.id, function (err, track) {
    if(err) {
      return handleError(res, err);
    }
    if(!track) {
      return res.send(404);
    }
    return res.json(track);
  });
};

// Creates a new track in the DB.
exports.create = function(req, res) {
  console.log('create track req.body ', req.body);
  req.body.user_id = req.session.user._id;
  console.log('req.body = ', req.body);
  Track.create(req.body, function(err, track) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(201).json(track);
  });
};

// Updates an existing track in the DB.
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  console.log('update track req.params ', req.params);
  Track.findById(req.params.id, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if(!track) {
      return res.send(404);
    }

    var updated = _.merge(track, req.body);
    console.log(req.body);
    // Needed because merge does not affect the links array.
    if (req.body.links) {
      updated.links = req.body.links;
    }

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, track);
    });
  });
};

// Deletes a track from the DB.
exports.destroy = function(req, res) {
  Track.findById(req.params.id, function (err, track) {
    if(err) {
      return handleError(res, err);
    }
    if(!track) {
      return res.send(404);
    }
    track.remove(function(err) {
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
