/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var userController = require('./api/user/user.controller.js');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.route('/signup')
    .post(function(req, res) {
      //call create()
      console.log('on routes post');
      userController.create(req,res);
    });

  app.route('/login')
    .post(function(req, res) {
      console.log('on routes login');
      userController.me(req,res);
    });

  app.route('/specRunner')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra/test/unit/specRunner.html');
    });
  app.route('/lib/*')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra/test/unit' + req.originalUrl);
    });
  app.route('/public/*')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra' + req.originalUrl);
    });
  app.route('/bower_components/*')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra/test' + req.originalUrl);
    });
  app.route('/spec.js')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra/test/unit/spec.js');
    });
  app.route('/transportSpec.js')
    .get(function(req, res) {
      res.sendFile('/Users/albertlee/HackReactor/WorldOrchestra/test/unit/transportSpec.js');
    });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
