var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: ['[["0:0:0","C4",1],["0:0:2","Ab4",1],["0:0:3","C4",0],["10:0:4","Ab4",0]]'],
    instrument: acousticPiano,
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false,
    octave: 4,
    volume: 0.75
  }
});

