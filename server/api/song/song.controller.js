/**
/**
 * GET     /song              ->  index
 * POST    /song              ->  create
 * GET     /song/:id          ->  show
 * PUT     /song/:id          ->  update
 * DELETE  /song/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Song = require('./song.model');

// Get list of songs
exports.index = function(req, res) {
  Song.find(function (err, songs) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(songs);
  });
};

// Get a single song
exports.show = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) {
      return handleError(res, err);
    }
    if(!song) {
      return res.send(404);
    }
    return res.json(song);
  });
};

// Creates a new song in the DB.
exports.create = function(req, res) {
  // console.log('create song req.body ', req.body);
  req.body.user_id = req.session.user._id;
  Song.create(req.body, function(err, song) {
    if(err) {
      return handleError(res, err);
    }
    return res.status(201).json(song);
  });
};

// Updates an existing song in the DB.
exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  Song.findById(req.params.id, function (err, song) {
    if (err) {
      return handleError(res, err);
    }
    if(!song) {
      return res.send(404);
    }

    var updated = _.merge(song, req.body);
    // console.log(req.body);
    // Needed because merge does not affect the links array.
    if (req.body.links) {
      updated.links = req.body.links;
    }

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, song);
    });
  });
};

// Deletes a song from the DB.
exports.destroy = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) {
      return handleError(res, err);
    }
    if(!song) {
      return res.send(404);
    }
    song.remove(function(err) {
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
