var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: [],
    instrument: acousticPiano,
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false
  }
});

