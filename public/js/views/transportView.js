var WO = WO || {};
WO.TransportView = Backbone.View.extend({
  //tagname: "",
  className: 'transportView',

  events: {
    'click #export': 'exportWav',
    'click #play': 'triggerPlay',
    'click #stop': 'triggerStop',
    'click #rewind, #skipBack, #skipForward, #forward': 'moveTransport',
    'click #record': 'triggerRecord'
  },

  template: _.template(
    '<div class="controlsContainer">' +
    '<div class="transportEl"><span>Transport Time </span><span id="transportTime"><span class="tBar">0</span>:<span class="tBeats">0</span>:<span class="tSixt">0</span></span></div>' +
    //'<button id="metronome"><i class="fa fa-heartbeat"></i></button>' +
      '<div class="transportControls">' +
        '<button id="rewind"><i class="fa fa-fast-backward"></i></button>' +
        '<button id="skipBack"><i class="fa fa-backward"></i></button>' +
        '<button id="stop"><i class="fa fa-stop"></i></button>' +
        '<button id="play"><i class="fa fa-play"></i></button>' +
        '<button id="record"><i class="fa fa-play-circle" style="color:red"></i></button>' +
        '<button id="skipForward"><i class="fa fa-forward"></i></button>' +
        '<button id="forward"><i class="fa fa-fast-forward"></i></button>' +
      '</div>' +
    '</div>' +
    '<script>' +
      'var slider = new GUI.Slider($(".transportView"), function(val){' +
          'var scaled = parseInt(val * 30 + 100).toFixed(0);' +
          'Tone.Transport.setBpm(scaled);' +
          'return scaled;' +
      '}, 120, "tempo");' +
      'slider.render(20/30);' +
    '</script>' +
    '<div class="exportContainer">' +
      '<button id="export">Export Song <i class="fa fa-eject"></i></button>' +
    '</div>'
  ),
  initialize: function(params) {
    this.render();
    $(document).ready(function() {
      var MutationObserver, item, observer;
      var slider = new GUI.Slider($(".transportView"), function(val){
        var scaled = parseInt(val * 30 + 100).toFixed(0);
        Tone.Transport.setBpm(scaled);
        return scaled;
      }, 120, "Tempo");
      slider.render(20/30);

      MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      item = document.querySelector('#transportTime');

      observer = new MutationObserver(function(mutations) {
        $('path').remove();
        WO.appView.songView.collection.forEach(function(val) {
          var tr;
          tr = val.get('mRender');
          tr.drawBar(Tone.prototype.toSeconds(mutations[1].addedNodes[0].data) * 16 * tr.factor);
        });
      });

      observer.observe(item, {
        childList: true
      });
    });
  },
  render: function() {
    return this.$el.append(this.template);
  },

  triggerPlay: function(){
    this.trigger('play', this);
    $('#play').addClass('play');
    this.startTransportCounter();
  },

  triggerStop: function(){
    this.trigger('stop', this);
    $('#play').removeClass('play');
    $('#record').removeClass('recordOn');
  },

  moveTransport: function(e){
    var method = {'skipBack': '-1m', 'skipForward': '+1m', 'forward': '+8m'};
    Tone.Transport.setTransportTime(e.currentTarget.id === 'rewind' ? "0:0:0" : Tone.Transport.getTransportTime() + method[e.currentTarget.id]);
    $('#transportTime').text(Tone.Transport.getTransportTime());
  },

  triggerRecord: function(e) {
    WO.transport.recording = true;
    $(this).addClass('recordOn');
    Tone.Transport.setTransportTime("0:0:0");
    this.triggerPlay();
  },

  startTransportCounter: function() {
    Tone.Transport.setInterval(function(time){
      $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n")
  },

  exportWav: function() {

    WO.recording = WO.recording || false;

    WO.recInterval = setInterval(this.checkTransportTime.bind(), 2000);
    if(WO.recording === false){
      WO.audioIO.recordSongStart();
      console.log("song is recording");
      WO.recording = true;
    } else {
      WO.audioIO.recordSongStop();

      console.log("song stopped recording");
      songName = prompt("Please name your .wav file", "songname") + ".wav";

      if(songName !== "null.wav"){
        WO.audioIO.exportSongWav(songName);
      }
      clearInterval(WO.recInterval);
      WO.recording = false;
    }

  },

  checkTransportTime: function() {

    // Figure the song length for how long to record.
    var recordLength = WO.appView.songView.collection.settings.length;
    var splitRecordLength = recordLength.split(':');
    var recordLengthMeasures = Number(splitRecordLength[0]);

    // Figure the current measure of the Transport.
    var transportTime = Tone.Transport.getTransportTime();
    var splitTransportTime = transportTime.split(':');
    var currentMeasures = Number(splitTransportTime[0]);

    console.log(currentMeasures + " should be <= " + recordLengthMeasures);

    // If the current measure > our record length, stop recording and export.
    if(currentMeasures >= recordLengthMeasures){
      console.log("TransportTime is greater than recordLength here.");
      clearInterval(WO.recInterval);
      WO.TransportView.prototype.exportWav();
    }
  }

});
