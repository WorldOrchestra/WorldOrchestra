Tone.Transport.setBpm(120);
// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

// Tone.Transport.setTransportTime("4:0:0");

var recording = false;

var playSong = function(song){
    _.each(song.models, function(track){
        // console.log("track->", track);
        var notes = track.get('notes');
        var instrument = track.get('instrument');
        _.each(notes, function(note){
            // console.log("note->", note);
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
    });
    
    Tone.Transport.start();
};

var recordNotes = function(note, time, velocity){
    notes.push([time, note, velocity]);
    console.log(notes);
};

$('#rewind').on('click', function(){
    Tone.Transport.setTransportTime("0:0:0");
    $('#transportTime').text(Tone.Transport.getTransportTime());
})


$('#stop').on('click', function(){
    recording = false;
    $('#play').css("background-color", "white");
    $('#record').css({"background-color": "white", "color" : "red"});
    Tone.Transport.stop();
    Tone.Transport.clearIntervals();
})

$('#play').on('click', function(){
    $('#play').css("background-color", "green");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n"); 

    //TO DO: need to get the song!    
    playSong(song);
})

$('#record').on('click', function(){
    recording = true;
    $(this).css({"background-color": "red", "color" : "white"});
    Tone.Transport.setTransportTime("0:0:0");
    Tone.Transport.start();
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n");
})
