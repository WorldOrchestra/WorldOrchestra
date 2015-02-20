var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: [],
    instrument: WO.acousticPiano,
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false,
    octave: 4,
    volume: 0.75
  }
});

