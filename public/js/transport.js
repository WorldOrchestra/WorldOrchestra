/* global _,$,Tone */
Tone.Transport.setBpm(120);
// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

// Tone.Transport.setTransportTime("4:0:0");

WO.recording = false;

WO.playSong = function(song){
    // debugger;
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

WO.recordNotes = function(note, time, velocity){
    //hard code for track 1
    var notes = WO.track.get('notes');
    notes.push([time, note, velocity]);
    // console.log(notes);
};

$('#rewind').on('click', function(){
    Tone.Transport.setTransportTime("0:0:0");
    $('#transportTime').text(Tone.Transport.getTransportTime());
})

$('#skipBack').on('click', function(){
    Tone.Transport.setTransportTime(Tone.Transport.getTransportTime() + "-1m");
    $('#transportTime').text(Tone.Transport.getTransportTime());
});

$('#skipForward').on('click', function(){
    Tone.Transport.setTransportTime(Tone.Transport.getTransportTime() + "+1m");
    $('#transportTime').text(Tone.Transport.getTransportTime());
});

$('#forward').on('click', function(){
    Tone.Transport.setTransportTime(Tone.Transport.getTransportTime() + "+8m");
    $('#transportTime').text(Tone.Transport.getTransportTime());
});

$('#stop').on('click', function(){
    WO.recording = false;
    $('#play').css("background-color", "white");
    $('#record').css({"background-color": "white", "color" : "red"});
    Tone.Transport.stop();
    Tone.Transport.clearIntervals();
    $('.track-notes').html("");
    WO.showTrack(WO.track.get('notes'));
})

$('#play').on('click', function(){
    $('#play').css("background-color", "green");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
        console.log(Tone.Transport.getTransportTime());
    }, "16n");

    playDrumPad();
    //TO DO: need to get the song!
    WO.playSong(WO.song);
})

$('#record').on('click', function(){
    WO.recording = true;
    $(this).css({"background-color": "red", "color" : "white"});
    Tone.Transport.setTransportTime("0:0:0");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n");
    // Tone.Transport.start();
    $('#play').click();
})
