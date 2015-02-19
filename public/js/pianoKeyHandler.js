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
  });

  var getKey = function(event){
      switch (event.which){
          case 65 :
              note = "C" + octave;
              break;
          case 87 :
              note = "Db" + octave;
              break;
          case 83 :
              note = "D" + octave;
              break;
          case 69 :
              note = "Eb" + octave;
              break;
          case 68 :
              note = "E" + octave;
              break;
          case 70 :
              note = "F" + octave;
              break;
          case 84 :
              note = "Gb" + octave;
              break;
          case 71 :
              note = "G" + octave;
              break;
          case 89 :
              note = "Ab" + octave;
              break;
          case 72 :
              note = "A" + octave;
              break;
          case 85 :
              note = "Bb" + octave;
              break;
          case 74 :
              note = "B" + octave;
              break;
          case 75 :
              note = "C" + (octave+1);
              break;
          case 79 :
              note = "Db" + (octave+1);
              break;
          case 76 :
              note = "D" + (octave+1);
              break;
          case 80 :
              note = "Eb" + (octave+1);
              break;
          case 186 :
              note = "E" + (octave+1);
              break;
          case 222 :
              note = "F" + (octave+1);
              break;
          default:
              note = null;
              break;
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

  $('#keys').on('mousedown','button', function(){
      var note = $(this).attr("id");
      instrument.triggerAttack(note);
      if (WO.recording){
          WO.recordNotes(note, Tone.Transport.getTransportTime(), 1.00);
      }
  });

  $('#keys').on('mouseup','button', function(){
      var note = $(this).attr("id");
      instrument.triggerRelease(note);
      if (WO.recording){
          WO.recordNotes(note, Tone.Transport.getTransportTime(), 0.00);
      }
  })
})(instrument)