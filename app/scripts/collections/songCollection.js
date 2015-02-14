define([
    'jquery',
    'underscore',
    'backbone',
    'models/trackModel'
], function($, _, Backbone, Track) {
    Song = Backbone.Collection.extend({model: Track});

    return Song;
});
