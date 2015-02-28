var WO = WO || {};

WO.transport = {
  recording: false,

// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

  killNotes: function(activeInstrument){
    var notes = activeInstrument.get('notes');
    var currentTime = Tone.Transport.toSeconds(Tone.Transport.getTransportTime());
    for(var i=0; i<notes.length; i++){
      var noteTime = Tone.Transport.toSeconds(notes[i][0]);
      if(noteTime <= currentTime ){
        activeInstrument.get('instrument').triggerRelease(notes[i][1]);
      }else if(noteTime > currentTime ){
        break;
      }
    }
  },

  playSong: function(song){
      var notes, instrument;
      notes = [];
      _.each(song.models, function(track){
          notes = track.get('notes');
          instrument = track.get('instrument');
          //check what type of instrument wezza got
          if (track.get('type') === "Audio"){
            instrument.play && instrument.play();
          } else {
              _.each(notes, function(note){
                  if ( note[2] === 0.00 || note[2] === "0.00"){
                      Tone.Transport.setTimeout(function(time){
                          instrument.triggerRelease(note[1]);
                      }, note[0]);
                  }else{
                      Tone.Transport.setTimeout(function(time){
                          instrument.triggerAttack(note[1]);
                      }, note[0]);
                  }
              });
          }
      });

      Tone.Transport.start();
  },

  stopTracks: function() {
    this.recording = false;
    Tone.Transport.stop();
    Tone.Transport.clearIntervals();
    WO.appView.songView.collection.models.forEach(function(track){
      var title = track.get('title');
      // TODO accommodate all types of instruments.
      if (title === 'Synth') {
        WO.transport.killNotes(track);
      } else if (title === 'Audio File') {
        track.get('instrument').stop();
      }
    });
  },

  setTempo: function(bpm){
    Tone.Transport.setBpm(bpm);
  }
};
