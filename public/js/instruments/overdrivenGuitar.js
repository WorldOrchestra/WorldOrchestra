var WO = WO || {};

WO.OverdrivenGuitarFactory = function(){

  var overdrivenGuitar = new Tone.MultiSampler({
    "A0" : "soundfont/overdriven_guitar-mp3/A0.mp3",
    "A1" : "soundfont/overdriven_guitar-mp3/A1.mp3",
    "A2" : "soundfont/overdriven_guitar-mp3/A2.mp3",
    "A3" : "soundfont/overdriven_guitar-mp3/A3.mp3",
    "A4" : "soundfont/overdriven_guitar-mp3/A4.mp3",
    "A5" : "soundfont/overdriven_guitar-mp3/A5.mp3",
    "A6" : "soundfont/overdriven_guitar-mp3/A6.mp3",
    "A7" : "soundfont/overdriven_guitar-mp3/A7.mp3",
    "B0" : "soundfont/overdriven_guitar-mp3/B0.mp3",
    "B1" : "soundfont/overdriven_guitar-mp3/B1.mp3",
    "B2" : "soundfont/overdriven_guitar-mp3/B2.mp3",
    "B3" : "soundfont/overdriven_guitar-mp3/B3.mp3",
    "B4" : "soundfont/overdriven_guitar-mp3/B4.mp3",
    "B5" : "soundfont/overdriven_guitar-mp3/B5.mp3",
    "B6" : "soundfont/overdriven_guitar-mp3/B6.mp3",
    "B7" : "soundfont/overdriven_guitar-mp3/B7.mp3",
    //"C0" : "soundfont/overdriven_guitar-mp3/C0.mp3",
    "C1" : "soundfont/overdriven_guitar-mp3/C1.mp3",
    "C2" : "soundfont/overdriven_guitar-mp3/C2.mp3",
    "C3" : "soundfont/overdriven_guitar-mp3/C3.mp3",
    "C4" : "soundfont/overdriven_guitar-mp3/C4.mp3",
    "C5" : "soundfont/overdriven_guitar-mp3/C5.mp3",
    "C6" : "soundfont/overdriven_guitar-mp3/C6.mp3",
    "C7" : "soundfont/overdriven_guitar-mp3/C7.mp3",
    "C8" : "soundfont/overdriven_guitar-mp3/C8.mp3",
    //"D0" : "soundfont/overdriven_guitar-mp3/D0.mp3",
    "D1" : "soundfont/overdriven_guitar-mp3/D1.mp3",
    "D2" : "soundfont/overdriven_guitar-mp3/D2.mp3",
    "D3" : "soundfont/overdriven_guitar-mp3/D3.mp3",
    "D4" : "soundfont/overdriven_guitar-mp3/D4.mp3",
    "D5" : "soundfont/overdriven_guitar-mp3/D5.mp3",
    "D6" : "soundfont/overdriven_guitar-mp3/D6.mp3",
    "D7" : "soundfont/overdriven_guitar-mp3/D7.mp3",
    //"E0" : "soundfont/overdriven_guitar-mp3/E0.mp3",
    "E1" : "soundfont/overdriven_guitar-mp3/E1.mp3",
    "E2" : "soundfont/overdriven_guitar-mp3/E2.mp3",
    "E3" : "soundfont/overdriven_guitar-mp3/E3.mp3",
    "E4" : "soundfont/overdriven_guitar-mp3/E4.mp3",
    "E5" : "soundfont/overdriven_guitar-mp3/E5.mp3",
    "E6" : "soundfont/overdriven_guitar-mp3/E6.mp3",
    "E7" : "soundfont/overdriven_guitar-mp3/E7.mp3",
    //"F0" : "soundfont/overdriven_guitar-mp3/F0.mp3",
    "F1" : "soundfont/overdriven_guitar-mp3/F1.mp3",
    "F2" : "soundfont/overdriven_guitar-mp3/F2.mp3",
    "F3" : "soundfont/overdriven_guitar-mp3/F3.mp3",
    "F4" : "soundfont/overdriven_guitar-mp3/F4.mp3",
    "F5" : "soundfont/overdriven_guitar-mp3/F5.mp3",
    "F6" : "soundfont/overdriven_guitar-mp3/F6.mp3",
    "F7" : "soundfont/overdriven_guitar-mp3/F7.mp3",
    //"G0" : "soundfont/overdriven_guitar-mp3/G0.mp3",
    "G1" : "soundfont/overdriven_guitar-mp3/G1.mp3",
    "G2" : "soundfont/overdriven_guitar-mp3/G2.mp3",
    "G3" : "soundfont/overdriven_guitar-mp3/G3.mp3",
    "G4" : "soundfont/overdriven_guitar-mp3/G4.mp3",
    "G5" : "soundfont/overdriven_guitar-mp3/G5.mp3",
    "G6" : "soundfont/overdriven_guitar-mp3/G6.mp3",
    "G#1" : "soundfont/overdriven_guitar-mp3/Ab1.mp3",
    "G#2" : "soundfont/overdriven_guitar-mp3/Ab2.mp3",
    "G#3" : "soundfont/overdriven_guitar-mp3/Ab3.mp3",
    "G#4" : "soundfont/overdriven_guitar-mp3/Ab4.mp3",
    "G#5" : "soundfont/overdriven_guitar-mp3/Ab5.mp3",
    "G#6" : "soundfont/overdriven_guitar-mp3/Ab6.mp3",
    "G#7" : "soundfont/overdriven_guitar-mp3/Ab7.mp3",
    "Bb0" : "soundfont/overdriven_guitar-mp3/Bb0.mp3",
    "Bb1" : "soundfont/overdriven_guitar-mp3/Bb1.mp3",
    "Bb2" : "soundfont/overdriven_guitar-mp3/Bb2.mp3",
    "Bb3" : "soundfont/overdriven_guitar-mp3/Bb3.mp3",
    "Bb4" : "soundfont/overdriven_guitar-mp3/Bb4.mp3",
    "Bb5" : "soundfont/overdriven_guitar-mp3/Bb5.mp3",
    "Bb6" : "soundfont/overdriven_guitar-mp3/Bb6.mp3",
    "Bb7" : "soundfont/overdriven_guitar-mp3/Bb7.mp3",
    "C#1" : "soundfont/overdriven_guitar-mp3/Db1.mp3",
    "C#2" : "soundfont/overdriven_guitar-mp3/Db2.mp3",
    "C#3" : "soundfont/overdriven_guitar-mp3/Db3.mp3",
    "C#4" : "soundfont/overdriven_guitar-mp3/Db4.mp3",
    "C#5" : "soundfont/overdriven_guitar-mp3/Db5.mp3",
    "C#6" : "soundfont/overdriven_guitar-mp3/Db6.mp3",
    "C#7" : "soundfont/overdriven_guitar-mp3/Db7.mp3",
    "C#8" : "soundfont/overdriven_guitar-mp3/Db8.mp3",
    "Eb1" : "soundfont/overdriven_guitar-mp3/Eb1.mp3",
    "Eb2" : "soundfont/overdriven_guitar-mp3/Eb2.mp3",
    "Eb3" : "soundfont/overdriven_guitar-mp3/Eb3.mp3",
    "Eb4" : "soundfont/overdriven_guitar-mp3/Eb4.mp3",
    "Eb5" : "soundfont/overdriven_guitar-mp3/Eb5.mp3",
    "Eb6" : "soundfont/overdriven_guitar-mp3/Eb6.mp3",
    "Eb7" : "soundfont/overdriven_guitar-mp3/Eb7.mp3",
    "F#1" : "soundfont/overdriven_guitar-mp3/Gb1.mp3",
    "F#2" : "soundfont/overdriven_guitar-mp3/Gb2.mp3",
    "F#3" : "soundfont/overdriven_guitar-mp3/Gb3.mp3",
    "F#4" : "soundfont/overdriven_guitar-mp3/Gb4.mp3",
    "F#5" : "soundfont/overdriven_guitar-mp3/Gb5.mp3",
    "F#6" : "soundfont/overdriven_guitar-mp3/Gb6.mp3",
    "F#7" : "soundfont/overdriven_guitar-mp3/Gb7.mp3"
  }, function(){
    console.log('overdriven guitar loaded');
  });

  var overdrivenGuitarOptions = {
        "portamento" : 0.0,
        "oscillator" : {
              "type" : "square"
        },
        // "filter" : {
        //       "Q" : 6,
        //       "type" : "lowpass",
        //       "rolloff" : -24
        // },
        "envelope" : {
              "attack" : 0.005,
              "decay" : 3,
              "sustain" : 0,
              "release" : 0.45
        }
        // "filterEnvelope" : {
        //       "attack" : 0.001,
        //       "decay" : 0.32,
        //       "sustain" : 0.9,
        //       "release" : 3,
        //       "min" : 700,
        //       "max" : 3500
        // }
  };

  overdrivenGuitar.octave = 4;
  overdrivenGuitar.set(overdrivenGuitarOptions);
  overdrivenGuitar.setVolume(0);
  overdrivenGuitar.toMaster();
  overdrivenGuitar.title = "Overdriven Guitar";

  return overdrivenGuitar;
};
