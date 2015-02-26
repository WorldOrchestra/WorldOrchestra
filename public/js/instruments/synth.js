var WO = WO || {};

WO.SynthFactory = function(){

    var synthOptions = {
        "portamento" : 0.05,
        "oscillator" : {
            "type" : "square"
        },
        "filter": {
            "Q": 6,
            "type": "lowpass",
            "rolloff": -24
        },
        "envelope": {
            "attack": 0.005,
            "decay": 0.01,
            "sustain": 0.9,
            "release": 0.001
        },
        "filterEnvelope": {
            "attack": 0.006,
            "decay": 0.02,
            "sustain": 0.5,
            "release": 0.001,
            "min": 10,
            "max": 4000
        }
    };

    var synth = new Tone.PolySynth(6, Tone.MonoSynth);
    synth.set(synthOptions);

    synth.octave = 4;
    synth.setVolume(-25);
    synth.title = "Synth";
    synth.toMaster();
    synth.title = "Synth";

    return synth;
};