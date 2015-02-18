var drumPad = new Tone.MultiSampler({
    "Gb4" : "soundfont/acoustic-kit-wav/hihat.wav",
    "D4" : "soundfont/acoustic-kit-wav/snare.wav",
    "A4" : "soundfont/acoustic-kit-wav/tom1.wav",
    "G4" : "soundfont/acoustic-kit-wav/tom2.wav",
    "F4" : "soundfont/acoustic-kit-wav/tom3.wav",
    "C4" : "soundfont/acoustic-kit-wav/kick.wav"
}, function(){
    $("#Loading").remove();
    // startCheckbox.enable();
});

drumPad.setVolume(-15);
drumPad.toMaster();
