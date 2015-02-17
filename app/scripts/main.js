/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        marionette: '../bower_components/marionette/lib/backbone.marionette'
    }
});

require([
    'app',
], function (App) {
    App.initialize();
});
