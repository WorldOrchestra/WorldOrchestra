var WO = WO || {};

WO.setTempo = function(bpm){
    Tone.Transport.setBpm(bpm);
};

// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

WO.recording = false;

WO.playSong = function(song){
    var notes, instrument;
    notes = [];
    _.each(song.models, function(track){
        notes = track.get('notes');
        instrument = track.get('instrument');
        console.log(instrument);
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
};

