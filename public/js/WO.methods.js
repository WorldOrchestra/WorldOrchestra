var WO = WO || {};

WO.methods = {
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

  recordNotes: function(note, time, velocity){
    var notes, song;
    song = WO.appView.songView.collection;
    notes = song.settings.activeTrack.attributes.notes;
    notes.push([time, note, velocity]);
    song.settings.activeTrack.get('mRender').showTrack(notes);
  },

  unbindKeys: function() {
    $(document).unbind('keydown');
    $(document).unbind('keyup');
  }
};

