var drumPad = new Tone.MultiSampler({
    "Gb4" : "soundfont/acoustic-kit/hihat.wav",
    "D4" : "soundfont/acoustic-kit/snare.wav",
    "A4" : "soundfont/acoustic-kit/tom1.wav",
    "G4" : "soundfont/acoustic-kit/tom2.wav",
    "F4" : "soundfont/acoustic-kit/tom3.wav",
    "C4" : "soundfont/acoustic-kit/kick.wav"
}, function(){
    $("#Loading").remove();
    // startCheckbox.enable();
});

drumPad.setVolume(-15);
drumPad.toMaster();
