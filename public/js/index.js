var WO = WO || {};
WO.vent = _.extend({}, Backbone.Events);

WO.appModel = new WO.WOModel();
WO.appView = new WO.WOView({model: WO.appModel});

$('.add-track-button').on('click', function(){
  WO.vent.trigger('click:addTrack');
});

//wavesurfer demo
WO.wavesurfer = Object.create(WaveSurfer);
WO.wavesurferEl = $('<div id="wave"></div');
$('body').prepend(WO.wavesurferEl);


WO.wavesurfer.init({
    container: '#wave',
    waveColor: 'violet',
    progressColor: 'purple'
});
WO.wavesurfer.load('soundfont/vox1.wav');

WO.wavesurfer.setVolume(0.5);
$('#trigWave').on('click', function(){
  WO.wavesurfer.playPause();
});