var WO = WO || {};

WO.InstrumentFactory = function(instrumentName, model){

  var factory = {
    "Acoustic Piano": WO.PianoFactory,
    "Synth": WO.SynthFactory,
    "Audio": WO.AudioFactory,
    "Audio File": WO.AudioDropZoneFactory,
    "Acoustic Guitar Steel": WO.AcousticGuitarSteelFactory,
    "Alto Sax": WO.AltoSaxFactory,
    "Church Organ": WO.ChurchOrganFactory,
    "Distortion Guitar": WO.DistortionGuitarFactory,
    "Electric Piano 1": WO.ElectricPiano1Factory,
    "Flute": WO.FluteFactory,
    "Muted Trumpet": WO.MutedTrumpetFactory,
    "Oboe": WO.OboeFactory,
    "Overdriven Guitar": WO.OverdrivenGuitarFactory,
    "Pad 3 Polysynth": WO.Pad3PolysynthFactory,
    "Synth Bass 1": WO.SynthBass1Factory,
    "Synth Strings 2": WO.SynthStrings2Factory,
    "Viola": WO.ViolaFactory,
    "Violin": WO.ViolinFactory,
    "Xylophone": WO.XylophoneFactory
  };

  return factory[instrumentName](model);
};
