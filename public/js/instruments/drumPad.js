var keys = new Tone.MultiSampler({
    "A" : "./tylersDrumkit/acoustic-kit/hihat.wav",
    "C#" : "./tylersDrumkit/acoustic-kit/snare.wav",
    "E" : "./tylersDrumkit/acoustic-kit/tom1.wav",
    "F#" : "./tylersDrumkit/acoustic-kit/tom2.wav",
    "G" : "./tylersDrumkit/acoustic-kit/tom3.wav",
    "D" : "./tylersDrumkit/acoustic-kit/kick.wav"
}, function(){
    $("#Loading").remove();
    startCheckbox.enable();
});
keys.toMaster();