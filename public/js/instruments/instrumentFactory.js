var WO = WO || {};

WO.InstrumentFactory = function(instrumentName, model){

  var factory = {
    "Acoustic Piano": WO.PianoFactory,
    "Synth": WO.SynthFactory,
    "Audio": WO.AudioFactory,
    "Audio File": WO.AudioDropZoneFactory
  };

  return factory[instrumentName](model);
};
