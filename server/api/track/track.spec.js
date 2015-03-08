'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Track = require('./track.model');
var User = require('../user/track.model');
var util = require("util");

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var track = new Track({
  title: 'Riff',
  user: user._id
});

describe('Track Model', function() {

  before(function(done) {
    // Clear tracks before testing
    Track.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Track.remove().exec().then(function() {
      done();
    });
  });

  describe('GET /api/tracks', function() {
    it('should begin with no tracks', function(done) {
      Track.find({}, function(err, tracks) {
        tracks.should.have.length(0);
        done();
      });
    });

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/tracks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          console.log("JSON: " + res);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

  });

  describe("POST /api/tracks", function() {

    it('should save a track', function(done) {
      request(app)
      .post('/api/tracks')
      .send(track)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        res.body.title.should.equal(track.title);
        done();
      });
    });

    it('should fail when saving a duplicate track', function(done) {
      track.save(function() {
        var trackDup = new Track(track);
        trackDup.save(function(err) {
          Track.find({}, function(err, tracks){
            tracks.should.have.length(1);
          });  
          should.exist(err);
          done();
        });
      });
    });
  });
});
