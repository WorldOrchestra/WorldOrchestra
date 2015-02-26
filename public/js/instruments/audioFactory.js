var WO = WO || {};

WO.AudioFactory = function(cid){
 
  var wavesurfer = Object.create(WaveSurfer);
  var classEl = 'wave-' + cid;
  var wavesurferEl = $('<div class="' + classEl + '"></div');
  
  var query = '.track-contrainer, .' + cid;
  $(query).find('.track-notes').append(wavesurferEl);

  wavesurfer.init({
      container: '.'+classEl,
      waveColor: 'violet',
      progressColor: 'purple'
  });

  wavesurfer.load('../soundfont/vox1.wav');

  wavesurfer.setVolume(0.5);

  $('#trigWave').on('click', function(){
    wavesurfer.playPause();
  });
wavesurfer.title = "Audio";
return wavesurfer;
};