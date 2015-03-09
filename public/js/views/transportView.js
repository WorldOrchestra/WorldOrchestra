var WO = WO || {};
WO.TransportView = Backbone.View.extend({
  //tagname: "",
  className: 'transportView',

  events: {
    'click #metronome': 'triggerMetronome',
    'click #export': 'exportWav',
    'click #play': 'triggerPlay',
    'click #stop': 'triggerStop',
    'click #rewind, #skipBack, #skipForward, #forward': 'moveTransport',
    'click #record': 'triggerRecord',
    'click #save-song': 'saveSong'
  },

  template: _.template(
    '<div class="controlsContainer">' +
      '<div class="transportEl"><span>Transport Time </span><span id="transportTime"><span class="tBar">0</span>:<span class="tBeats">0</span>:<span class="tSixt">0</span></span></div>' +
      '<div class="transportControls">' +
        '<button id="metronome"><i class="fa fa-heartbeat"></i></button>' +
        '<button id="rewind"><i class="fa fa-fast-backward"></i></button>' +
        '<button id="skipBack"><i class="fa fa-backward"></i></button>' +
        '<button id="stop"><i class="fa fa-stop"></i></button>' +
        '<button id="play"><i class="fa fa-play"></i></button>' +
        '<button id="record"><i class="fa fa-play-circle" style="color:red"></i></button>' +
        '<button id="skipForward"><i class="fa fa-forward"></i></button>' +
        '<button id="forward"><i class="fa fa-fast-forward"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="exportContainer">' +
      '<button id="export">Export Song <i class="fa fa-eject"></i></button>' +
      '<button id="save-song">Save Song <i class="fa fa-floppy-o"></i></button>' +
    '</div>'
  ),

  initialize: function(params) {
    this.render();
    $(document).ready(function() {
      var MutationObserver, item, observer;
      var slider = new GUI.Slider($(".transportView"), function(val){
        var scaled = parseInt(val * 200 + 40).toFixed(0);
        Tone.Transport.setBpm(scaled);
        return scaled;
      }, 120, "Tempo");
      slider.render(80/200);

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

  triggerMetronome: function() {
    $('#metronome').toggleClass('metronomeOn');
  },

  triggerPlay: function(e){
    if (e.currentTarget.className !== "play" && !WO.transport.recording) {
      this.trigger('play', this);
      $('#play').addClass('play');
      this.startTransportCounter();
    }
  },

  triggerStop: function(){
    this.trigger('stop', this);
    $('#play').removeClass('play');
    $('#record').removeClass('recordOn');
  },

  moveTransport: function(e){
    var method = {'rewind': '', 'skipBack': '-1m', 'skipForward': '+1m', 'forward': '+8m'};
    var newTime = e.currentTarget.id === "rewind" ? 0 : Math.max(0, Tone.Transport.toSeconds(Tone.Transport.getTransportTime() + method[e.currentTarget.id]));
    Tone.Transport.setTransportTime(newTime);
    $('#transportTime').text(Tone.Transport.getTransportTime());
  },

  triggerRecord: function(e) {
    $('#record').addClass('recordOn');
    Tone.Transport.setTransportTime("0:0:0");
    this.recordWav();
    this.triggerPlay(e);
    WO.transport.recording = true;
  },

  startTransportCounter: function() {
    Tone.Transport.setInterval(function(time){
      $('#transportTime').text(Tone.Transport.getTransportTime());
    }, "16n");
  },

  recordWav: function() {
    WO.audioIO.recording = WO.audioIO.recording || false;

    WO.audioIO.recInterval = setInterval(WO.audioIO.checkTransportTime, 2000);
    if(WO.audioIO.recording === false){
      WO.audioIO.recordSongStart();
      WO.audioIO.recording = true;
    } else {
      WO.audioIO.recordSongStop();

      clearInterval(WO.audioIO.recInterval);
      WO.audioIO.recording = false;
    }
  },

  exportWav: function() {

      var songName = prompt("Please name your .wav file", "songname") + ".wav";

      if(songName !== "null.wav"){
        WO.audioIO.exportSongWav(songName);
      }
  },

  saveSong: function(){
    WO.appView.songView.collection.save();
  },

  triggerCheckTime: function(){
    WO.audioIO.checkTransportTime();
  }
});

