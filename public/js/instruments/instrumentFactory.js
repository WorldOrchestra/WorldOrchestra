var WO = WO || {};

WO.InstrumentFactory = function(instrumentName){
  var lookup = {
    "Acoustic Piano": "WO.PianoFactory",
    "Synth": "WO.SynthFactory",
    "Audio": "WO.AudioFactory"
  };
  
  var functionName = lookup[instrumentName];
  
  var instrument = eval(functionName)();

  return instrument;
};
