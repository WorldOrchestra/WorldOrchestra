'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Plan = require('./plan.model');
var User = require('../user/user.model');
var util = require("util");

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var plan = new Plan({
  title: 'Learn Angular',
  synopsis: 'These are bookmarks to learn angular',
  links: [{
    url: 'https://thinkster.io/angulartutorial/a-better-way-to-learn-angularjs/',
    description: "A better way to learn angular"
  }, {
    url: 'http://www.engrish.com',
    description: 'Brogs of many fravor'
  },
  ],
  user: user._id
});

describe('Plan Model', function() {

  before(function(done) {
    // Clear plans before testing
    Plan.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Plan.remove().exec().then(function() {
      done();
    });
  });

  describe('GET /api/plan', function() {
    it('should begin with no plans', function(done) {
      Plan.find({}, function(err, plans) {
        plans.should.have.length(0);
        done();
      });
    });

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/plans')
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

  describe("POST /api/plans", function() {

    it('should save a plan', function(done) {
      request(app)
      .post('/api/plans')
      .send(plan)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        res.body.title.should.equal(plan.title);
        done();
      });
    });

    it('should fail when saving a duplicate plan', function(done) {
      plan.save(function() {
        var planDup = new Plan(plan);
        planDup.save(function(err) {
          Plan.find({}, function(err, plans){
            plans.should.have.length(1);
          });  
          should.exist(err);
          done();
        });
      });
    });
  });
});
