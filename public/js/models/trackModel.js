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
    this.set('instrument', WO.InstrumentFactory( "Acoustic Piano" ));
    WO.instrumentKeyHandler(this.get('instrument'));
    this.on('changeInstrument', function(instrumentName){this.changeInstrument(instrumentName);}, this);
  },

  changeInstrument: function(instrumentName){
    $(document).unbind('keydown');
    $(document).unbind('keyup');
    this.set('instrument', WO.InstrumentFactory(instrumentName));
    WO.instrumentKeyHandler(this.get('instrument'));    
  }

});
