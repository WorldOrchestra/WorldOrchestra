var WO = WO || {};

WO.setTempo = function(bpm){
    console.log("in setTempo");
    Tone.Transport.setBpm(bpm);
};

// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

WO.recording = false;

WO.playSong = function(song){
    var notes = [];
    _.each(song.models, function(track){
        notes = track.attributes.notes;
        var instrument = track.attributes.instrument;
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
    });

    Tone.Transport.start();
};

WO.recordNotes = function(note, time, velocity){
    var notes;
    notes = WO.song.settings.activeTrack.attributes.notes;
    notes.push([time, note, velocity]);
    WO.song.settings.activeTrack.get('mRender').showTrack(notes);
};

$('#rewind').on('click', function(){
    Tone.Transport.setTransportTime("0:0:0");
    $('#transportTime').text(Tone.Transport.getTransportTime());
});

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
});

$('#play').on('click', function(){
    $('#play').css("background-color", "green");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
        // console.log(Tone.Transport.getTransportTime());
    }, "16n");

    WO.playDrumPad();
    //TO DO: need to get the song!
    WO.playSong(WO.song);
});

$('#record').on('click', function(){
    WO.recording = true;
    $(this).css({"background-color": "red", "color" : "white"});
    Tone.Transport.setTransportTime("0:0:0");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n");
    // Tone.Transport.start();
    $('#play').click();
});
