// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('showProjects', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var projectListView = new ProjectListView();
      projectListView.render();
    });
      // As above, call render on our loaded module
      // 'views/users/list'
    app_router.on('showUsers', function(){
      var userListView = new UserListView();
      userListView.render();
    });
    app_router.on('defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    Backbone.history.stop();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});