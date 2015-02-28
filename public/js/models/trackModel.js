var WO = WO || {};
WO.Track = Backbone.Model.extend({
  defaults: {
    notes: "",
    title: 'Acoustic Piano',
    isMuted: false,
    solo: false,
    octave: 4,
    volume: 0.75,
    instrument: "",
    type: 'MIDI'
  },

  initialize : function(){
    this.set('notes', []);
    this.set('instrument', WO.InstrumentFactory( "Acoustic Piano", this.cid));
    WO.instrumentKeyHandler.create(this.get('instrument'));
    this.on('changeInstrument', function(instrumentName){this.changeInstrument(instrumentName);}, this);
  },

  changeInstrument: function(instrumentName){
    WO.methods.unbindKeys();
    this.set('instrument', WO.InstrumentFactory(instrumentName, this));
    this.set('title', this.attributes.instrument.title);
    //if audio or midi
    if (instrumentName === 'Audio File'){
      this.set('type', 'Audio');
    } else {
      this.set('type', 'MIDI');
      WO.instrumentKeyHandler.create(this.get('instrument'));
    }
  }

});
