var WO = WO || {};

WO.synthOptions = {
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

WO.synth = new Tone.MonoSynth(WO.synthOptions);

WO.synth.setVolume(-25);
WO.synth.toMaster();