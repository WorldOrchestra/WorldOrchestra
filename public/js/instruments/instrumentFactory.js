var WO = WO || {};

WO.InstrumentFactory = function(instrumentName, cid){

  var factory = {
    "Acoustic Piano": WO.PianoFactory,
    "Synth": WO.SynthFactory,
    "Audio": WO.AudioFactory,
    "Audio File": WO.AudioDropZoneFactory
  };

  return factory[instrumentName](cid);
};
