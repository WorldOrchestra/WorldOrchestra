// Filename: models/project
define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var Track = Backbone.Model.extend({
		initialize: function(){
			console.log('initialized!');
		}
	});

	return Track;
});