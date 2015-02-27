var WO = WO || {};
WO.vent = _.extend({}, Backbone.Events);

WO.appModel = new WO.WOModel();
WO.appView = new WO.WOView({model: WO.appModel});

$('.add-track-button').on('click', function(){
  WO.vent.trigger('click:addTrack');
});

