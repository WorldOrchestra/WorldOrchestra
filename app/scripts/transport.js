Tone.Transport.setBpm(120);
// Tone.Transport.setLoopEnd("1:0");
// Tone.Transport.loop = true;

// Tone.Transport.setTransportTime("4:0:0");

var recording = false;


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
    Tone.Transport.start();
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n");

    parseScore({
        "instrument" : notes
    });
    
    Tone.Note.route("instrument", function(time, note, velocity, duration){
        instrument.triggerAttackRelease(note, duration, time, 1);
    });
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
