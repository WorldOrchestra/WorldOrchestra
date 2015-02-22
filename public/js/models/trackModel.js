var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: [],
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false,
    octave: 4,
    volume: 0.75,
    instrument: ""
  },

  initialize : function(){
    //set default instrument on load
    WO.instrumentTrack1 = WO.InstrumentFactory( "Acoustic Piano" );
    WO.instrumentKeyHandler(WO.instrumentTrack1);
    this.set('instrument', WO.instrumentTrack1);
  }

});

