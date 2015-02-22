var WO = WO || {};
WO.vent = _.extend({}, Backbone.Events);

// WO.track = new WO.Track();
// WO.trackView = new WO.TrackView({model: WO.track});
WO.song = new WO.Song([WO.track]);

WO.appModel = new WO.WOModel();
WO.appView = new WO.WOView({model: WO.appModel});

$('.add-track-button').on('click', function(){
  WO.vent.trigger('click:addTrack');
});
