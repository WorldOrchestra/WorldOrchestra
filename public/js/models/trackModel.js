var WO = WO || {};
WO.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',
  idAttribute: '_id',
  
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

  genObjectId: (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return function() {
      return s4() + s4() + s4();
    };
  })(),

  changeInstrument: function(instrumentName) {
    var instType = {
      'Acoustic Piano': 'MIDI', 
      'Audio File': 'Audio', 
      'Microphone': 'Microphone', 
      'Acoustic Guitar Steel': 'MIDI',
      'Alto Sax': 'MIDI',
      'Church Organ': 'MIDI',
      'Distortion Guitar': 'MIDI',
      'Electric Piano 1': 'MIDI',
      'Flute': 'MIDI',
      'Muted Trumpet': 'MIDI',
      'Oboe': 'MIDI',
      'Overdriven Guitar': 'MIDI',
      'Pad 3 Polysynth': 'MIDI',
      'Synth': 'MIDI', 
      'Synth Bass 1': 'MIDI',
      'Synth Strings 2': 'MIDI',
      'Viola': 'MIDI',
      'Violin': 'MIDI',
      'Xylophone': 'MIDI'
    };
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
  },

  saveTrack: function(){
    var instrument = this.get('instrument');
    var mRender = this.get('mRender');
    this.set('instrument', '');
    this.set('mRender', '');
    var that = this;
    var newlySaveTrack = $.when(that.save()).done(function(){
      that.set('instrument', instrument);
      that.set('mRender', mRender);
      return that;
    });
    return newlySaveTrack;
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
