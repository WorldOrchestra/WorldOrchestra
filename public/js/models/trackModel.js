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

  changeInstrument: function(instrumentName) {
    var instType = {'Acoustic Piano': 'MIDI', 'Audio File': 'Audio', 'Microphone': 'Microphone', 'Synth': 'MIDI'};
    var previousInstrumentType = this.get('type');

    WO.appView.unbindKeys();

    this.set('type', instType[instrumentName]);
    this.set('title', instrumentName);

    if (this.get('type') === 'MIDI') {
      this.set('instrument', WO.InstrumentFactory(instrumentName, this));
      WO.instrumentKeyHandler.create(this.get('instrument'));

      if (previousInstrumentType !== 'MIDI') {
        $('.active-track .track-notes').html('');
        this.set('mRender', new WO.MidiRender(this.cid + ' .track-notes'));
      }
    } else {
      this.set('notes', []);
      $('.active-track .track-notes').html('');
      this.set('instrument', WO.InstrumentFactory(instrumentName, this));
    }
  }
});


    //see what type of instrumetn current serection is
      // midi -> mic  =>  remove svg , add mic
      // midi -> audio  => remove svg , add audio
      // midi -> midi  => null
      // mic -> audio  => remove mic , add audio
      // mic -> midi  =>  remove mike, add svg
      // audio -> mic  =>  remove audio, add mic
      // audio -> midi  =>  remove audio,  add svg
      // keep notes only for midi change to hear different instruments.
