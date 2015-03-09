var WO = WO || {};

WO.midi = {
  'midi'    : null,
  'inputs'  : null,
  'outputs' : null,
  'input'   : null,
  'output'  : null,
  'log'     : null,

  enableMidiController : function() {
    if (!WO.midi.log){
      WO.midi.log = document.getElementById("log");
    }
    log.innerHTML = "Starting up MIDI...\n";
    if(navigator.requestMIDIAccess){
      navigator.requestMIDIAccess().then( WO.midi.success, WO.midi.failure );
    }else{
      WO.midi.failure();
      return "Please enable web-midi by navigating here: chrome://flags/#enable-web-midi";
    }
  },

  handleMIDIMessage : function( ev ) {
    // testing - just reflect.
    // log.innerHTML += "Message: " + ev.data.length + " bytes, timestamp: " + ev.timeStamp;
    if (ev.data.length === 3)
      // console.log(ev.data);
      // log.innerHTML += " 0x" + ev.data[0].toString(16) + " 0x" + ev.data[1].toString(16) + " 0x" + ev.data[2].toString(16);
      var note = WO.midi.midiHexToNote[ev.data[1]];
      if(ev.data[0]  === 144){ //note on
        WO.appView.songView.collection.settings.activeTrack.get('instrument').triggerAttack(note);
        $('body').trigger('pianoKeyOn', note);
        if (WO.transport.recording){
            WO.methods.recordNotes(note, Tone.Transport.getTransportTime(), 1.00);
        }
      }else{
        WO.appView.songView.collection.settings.activeTrack.get('instrument').triggerRelease(note);
        $('body').trigger('pianoKeyOff', [note]);
        if (WO.transport.recording){
            WO.methods.recordNotes(note, Tone.Transport.getTransportTime(), 0.00);
        }
      }
    // WO.midi.log.innerHTML += "\n";
    if (WO.midi.output)
      WO.midi.output.send( ev.data );
  },

  success : function( midiAccess ) {
      var i, iterator, data, port;
      midiAccess.onconnect = function(){
        console.log('connected');
      };

      midiAccess.ondisconnect = function(){
        console.log('disconnected');
      };

      WO.midi.log.innerHTML += "MIDI ready!\n";
      WO.midi.midi = midiAccess;
      WO.midi.inputs = WO.midi.midi.inputs;
      WO.midi.log.innerHTML += WO.midi.inputs.size+" inputs:\n";
  /*
      // forEach doesn't yet work in WebMIDI/Chrome
      i = 0;
      inputs.forEach(function(key, value){
          log.innerHTML += i++ + ": " + value.name + "; manufacturer: " + value.manufacturer + "; version: " + value.version + "\n";
      });
  */
      // but the iterator does, so we use the iterator:
      i = 0;
      iterator = WO.midi.inputs.values();
      while((data = iterator.next()).done === false){
          console.log(data);
          port = data.value;
          WO.midi.log.innerHTML += i++ + ": " + port.name + "; manufacturer: " + port.manufacturer + "; version: " + port.version + "\n";
      }
      if(WO.midi.inputs.size > 0) {
          iterator = WO.midi.inputs.values();
          WO.midi.input = iterator.next().value;
          // input.onmidimessage = handleMIDIMessage;
          WO.midi.input.addEventListener("midimessage", WO.midi.handleMIDIMessage);
          WO.midi.log.innerHTML += "Hooked up first input.\n";
      }else{
          WO.midi.log.innerHTML += "No Midi devices found.\n";
      }
      WO.midi.outputs = WO.midi.midi.outputs;
      // log.innerHTML += outputs.size+" outputs:\n";
  /*
      i = 0;
      outputs.forEach(function(key, value){
          WO.midi.log.innerHTML += i++ + ": " + value.name + "; manufacturer: " + value.manufacturer + "; version: " + value.version + "\n";
      });
  */
    //   i = 0;
    //   iterator = outputs.values();
    //   while((data = iterator.next()).done === false){
    //       port = data.value;
    //       WO.midi.log.innerHTML += i++ + ": " + port.name + "; manufacturer: " + port.manufacturer + "; version: " + port.version + "\n";
    //   }
    //   if(WO.midi.outputs.size > 0) {
    //       WO.midi.iterator = WO.midi.outputs.values();
    //   WO.midi.output = iterator.next().value;
    //       WO.midi.output.send( [0xb0, 0x00, 0x7f] );  // If the first device is a Novation Launchpad, this will light it up!
    // }
  },

  failure : function( error ) {
    alert( "MIDI failed to start. Did you forget to enable web-midi in chrome? chrome://flags/#enable-web-midi");
  },

  midiHexToDec : function(hexVel){
    return parseInt(hexVel, 16);
  },

  midiHexToNote : {
    0x01: "C#1",
    0x02: "D1",
    0x03: "Eb1",
    0x04: "E1",
    0x05: "F1",
    0x06: "F#1",
    0x07: "G1",
    0x08: "G#1",
    0x09: "A1",
    0x0A: "Bb1",
    0x0B: "B1",
    0x0C: "C0",
    0x0D: "C#0",
    0x0E: "D0",
    0x0F: "Eb0",
    0x10: "E0",
    0x11: "F0",
    0x12: "F#0",
    0x13: "G0",
    0x14: "G#0",
    0x15: "A0",
    0x16: "Bb0",
    0x17: "B0",
    0x18: "C1",
    0x19: "C#1",
    0x1A: "D1",
    0x1B: "Eb1",
    0x1C: "E1",
    0x1D: "F1",
    0x1E: "F#1",
    0x1F: "G1",
    0x20: "G#1",
    0x21: "A1",
    0x22: "Bb1",
    0x23: "B1",
    0x24: "C2",
    0x25: "C#2",
    0x26: "D2",
    0x27: "Eb2",
    0x28: "E2",
    0x29: "F2",
    0x2A: "F#2",
    0x2B: "G2",
    0x2C: "G#2",
    0x2D: "A2",
    0x2E: "Bb2",
    0x2F: "B2",
    0x30: "C3",
    0x31: "C#3",
    0x32: "D3",
    0x33: "Eb3",
    0x34: "E3",
    0x35: "F3",
    0x36: "F#3",
    0x37: "G3",
    0x38: "G#3",
    0x39: "A3",
    0x3A: "Bb3",
    0x3B: "B3",
    0x3C: "C4",
    0x3D: "C#4",
    0x3E: "D4",
    0x3F: "Eb4",
    0x40: "E4",
    0x41: "F4",
    0x42: "F#4",
    0x43: "G4",
    0x44: "G#4",
    0x45: "A4",
    0x46: "Bb4",
    0x47: "B4",
    0x48: "C5",
    0x49: "C#5",
    0x4A: "D5",
    0x4B: "Eb5",
    0x4C: "E5",
    0x4D: "F5",
    0x4E: "F#5",
    0x4F: "G5",
    0x50: "G#5",
    0x51: "A5",
    0x52: "Bb5",
    0x53: "B5",
    0x54: "C6",
    0x55: "C#6",
    0x56: "D6",
    0x57: "Eb6",
    0x58: "E6",
    0x59: "F6",
    0x5A: "F#6",
    0x5B: "G6",
    0x5C: "G#6",
    0x5D: "A6",
    0x5E: "Bb6",
    0x5F: "B6",
    0x60: "C7",
    0x61: "C#7",
    0x62: "D7",
    0x63: "Eb7",
    0x64: "E7",
    0x65: "F7",
    0x66: "F#7",
    0x67: "G7",
    0x68: "G#7",
    0x69: "A7",
    0x6A: "Bb7",
    0x6B: "B7",
    0x6C: "C8",
    0x6D: "C#8",
    0x6E: "D8",
    0x6F: "Eb8",
    0x70: "E8",
    0x71: "F8",
    0x72: "F#8",
    0x73: "G8",
    0x74: "G#8",
    0x75: "A8",
    0x76: "Bb8",
    0x77: "B8"
  }
};
