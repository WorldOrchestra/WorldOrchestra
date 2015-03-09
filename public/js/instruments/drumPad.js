var WO = WO || {};

WO.drumPad = new Tone.MultiSampler({
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

WO.drumPad.setVolume(-20);
WO.drumPad.toMaster();

WO.playDrumPad = function(){
  var stepNumber = 0;
  // var indicators = [];

  Tone.Transport.setInterval(function(time){
      //remove the old indicator
      $(".Lit").removeClass("Lit");
      //light up the new one
      // indicators[stepNumber].addClass("Lit");
      stepNumber = stepNumber % 16;
      //get the current column
      for (var i = 0; i < WO.drumPadCheckboxes.length; i++){
          var box = WO.drumPadCheckboxes[i][stepNumber];
          if (box.isChecked()){
              WO.drumPad.triggerAttack(WO.drumPadNoteNames[i], time);
          }
      }
    stepNumber++;
  }, "16n");
};

WO.clearDrumPad = function(){
  for( var i=0; i<WO.drumPadCheckboxes.length; i++ ){
    _.each(WO.drumPadCheckboxes[i], function(checkbox){
      checkbox.check(false);
    });
  }
};

WO.saveDrumpad = function(){
  var checked = [];
  for (var row = 0; row < 6; row++){
    var temp = [];
    for (var beat = 0; beat < 16; beat++){
      temp.push(WO.drumPadCheckboxes[row][beat].isChecked());
    }
    checked.push(temp);
  }
  return checked;
};

WO.setDrumPadPreset = function(preset){
  for (var row = 0; row < 6; row++){
    for (var beat = 0; beat < 16; beat++){
      WO.drumPadCheckboxes[row][beat].check(preset[row][beat]);
    }
  }
};

WO.drumPadPresetRock = [[true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false],[false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,false,false,false,false,false,true,false,true,false,false,false,false,false,false,false]];

