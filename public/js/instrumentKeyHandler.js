var WO = WO || {};

WO.down = {};

WO.instrumentKeyHandler = function(instrument){

  $(document).on('keydown', function(e){
      var note = getKey(e);

      if( e.which === 88 || e.which === 90 ){
          setOctave(e.which);
          WO.down[e.which] = true;
      }

      if( note !== null ){
          if( WO.down[note] === null || WO.down[note] === undefined){
              instrument.triggerAttack(note);
              if (WO.recording && instrument === WO.appView.songView.collection.settings.activeTrack.get('instrument')){
                  WO.recordNotes(note, Tone.Transport.getTransportTime(), 1.00);
              }
              WO.down[note] = true;
          }
        // trigger pianoKeyOn on piano keyboard
        $('body').trigger('pianoKeyOn', [note]);
      }


  });


  $(document).on('keyup', function(e){
    var currTrack;
      var note = getKey(e);

      if (e.which === 46) {
        currTrack = WO.appView.songView.collection.settings.activeTrack;
        currTrack.get('mRender').deleteNote(currTrack);
      }

      if( e.which === 88 || e.which === 90 ){
          WO.down[e.which] = null;
      }

      //if there's a note and the note has being pressed
      if( note !== null && WO.down[note] ){
          instrument.triggerRelease(note);
          if (WO.recording && instrument === WO.appView.songView.collection.settings.activeTrack.attributes.instrument){
              WO.recordNotes(note, Tone.Transport.getTransportTime(), 0.00);
          }
          WO.down[note] = null;
          //trigger pianoKeyOff on piano keyboard
          $('body').trigger('pianoKeyOff', [note]);
      }

  });

  var keyMap = {
     65 : ["C",  0],
     87 : ["C#", 0],
     83 : ["D",  0],
     69 : ["Eb", 0],
     68 : ["E",  0],
     70 : ["F",  0],
     84 : ["F#", 0],
     71 : ["G",  0],
     89 : ["G#", 0],
     72 : ["A",  0],
     85 : ["Bb", 0],
     74 : ["B",  0],
     75 : ["C",  1],
     79 : ["C#", 1],
     76 : ["D",  1],
     80 : ["Eb", 1],
    186 : ["E",  1],
    222 : ["F",  1]
  };

  var getKey = function(event){
      var note;
      if( keyMap[event.which] ){
        note = keyMap[event.which][0] + (instrument.octave + keyMap[event.which][1]);
      }else{
        note = null;
      }
      // console.log(note);
      return note;
  };

  var setOctave = function( key ){
      var octave = instrument.octave;
      if( WO.down[key] === null || WO.down[key] === undefined){
          if( key === 90 ){
              octave || octave--;
          } else {
              octave >=7 || octave++;
          }
          instrument.octave = octave;
          $('#octave').html(octave);
      }
  };

  $(document).ready(function() {
    $('#Container').on('mousedown','.anchor', function(){
        var note = $(this).attr("id");
        instrument.triggerAttack(note);
        if (WO.recording){
            WO.recordNotes(note, Tone.Transport.getTransportTime(), 1.00);
        }
    });
    $('#Container').on('mouseup','.anchor', function(){
        var note = $(this).attr("id");
        instrument.triggerRelease(note);
        if (WO.recording){
            WO.recordNotes(note, Tone.Transport.getTransportTime(), 0.00);
        }
    });
  });
};
