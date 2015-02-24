var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: "",
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false,
    octave: 4,
    volume: 0.75,
    instrument: ""
  },

  initialize : function(){
    this.set('notes', []);
    //set default instrument on load
    var instrumentTrack1 = WO.InstrumentFactory( "Acoustic Piano" );
    WO.instrumentKeyHandler(instrumentTrack1);
    this.set('instrument', instrumentTrack1);
  }

});
