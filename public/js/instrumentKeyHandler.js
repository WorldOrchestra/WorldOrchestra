/* global WO, $, Tone */

var WO = WO || {};
var octave = 4;
var down = {};

(function(instrument){
  $(document).on('keydown', function(e){
      var note = getKey(e);

      if( e.which === 88 || e.which === 90 ){
          setOctave(e.which);
          down[e.which] = true;
      }

      if( note !== null ){
          if( down[note] === null || down[note] === undefined){
              instrument.triggerAttack(note);
              if (WO.recording){
                  WO.recordNotes(note, Tone.Transport.getTransportTime(), 1.00);
              }
              down[note] = true;
          }
      }

      //trigger pianoKeyOn on piano keyboard
      $('body').trigger('pianoKeyOn', [note]);

  });


  $(document).on('keyup', function(e){
      var note = getKey(e);

      if( e.which === 88 || e.which === 90 ){
          down[e.which] = null;
      }

      if( note !== null ){
          instrument.triggerRelease(note);
          if (WO.recording){
              WO.recordNotes(note, Tone.Transport.getTransportTime(), 0.00);
          }
          down[note] = null;
      }

      //trigger pianoKeyOff on piano keyboard
      $('body').trigger('pianoKeyOff', [note]);
  });

  var keyMap = {
     65 : ["C",  0],
     87 : ["Db", 0],
     83 : ["D",  0],
     69 : ["Eb", 0],
     68 : ["E",  0],
     70 : ["F",  0],
     84 : ["Gb", 0],
     71 : ["G",  0],
     89 : ["Ab", 0],
     72 : ["A",  0],
     85 : ["Bb", 0],
     74 : ["B",  0],
     75 : ["C",  1],
     79 : ["Db", 1],
     76 : ["D",  1],
     80 : ["Eb", 1],
    186 : ["E",  1],
    222 : ["F",  1]
  };

  var getKey = function(event){
      var note;
      if( keyMap[event.which] ){
        note = keyMap[event.which][0] + (octave +keyMap[event.which][1]);
      }else{
        note = null;
      }
      return note;
  }

  var setOctave = function( key ){
      if( down[key] === null || down[key] === undefined){
          if( key === 90 ){
              octave === 0 ? octave : octave--;
          }else if(key === 88 ){
              octave >=7 ? octave: octave++;
          }
          $('#octave').html(octave);
      }
  };

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
  })
})(instrument)
