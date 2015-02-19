var WO = WO || {};
WO.appModel = new WO.WOModel();
WO.appView = new WO.WOView({model: WO.appModel});

var vent = _.extend({}, Backbone.Events);