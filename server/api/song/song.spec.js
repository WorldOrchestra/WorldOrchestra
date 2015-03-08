'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Song = require('./song.model');
var User = require('../user/user.model');
var util = require("util");

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var song = new Song({
  title: 'Play Music',
  user: user._id
});

describe('Song Model', function() {

  before(function(done) {
    // Clear songs before testing
    Song.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Song.remove().exec().then(function() {
      done();
    });
  });

  describe('GET /api/songs', function() {
    it('should begin with no songs', function(done) {
      Song.find({}, function(err, songs) {
        songs.should.have.length(0);
        done();
      });
    });

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/songs')
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

  describe("POST /api/songs", function() {

    it('should save a song', function(done) {
      request(app)
      .post('/api/songs')
      .send(song)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        res.body.title.should.equal(song.title);
        done();
      });
    });

    it('should fail when saving a duplicate song', function(done) {
      song.save(function() {
        var songDup = new Song(song);
        songDup.save(function(err) {
          Song.find({}, function(err, songs){
            songs.should.have.length(1);
          });  
          should.exist(err);
          done();
        });
      });
    });
  });
});
