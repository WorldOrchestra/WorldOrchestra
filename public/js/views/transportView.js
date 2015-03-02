var WO = WO || {};
WO.TransportView = Backbone.View.extend({
  //tagname: "",
  className: 'transportView',

  events: {
    'click #metronome': 'triggerMetronome',
    'click #play': 'triggerPlay',
    'click #stop': 'triggerStop',
    'click #rewind, #skipBack, #skipForward, #forward': 'moveTransport',
    'click #record': 'triggerRecord'
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

  triggerMetronome: function() {
    this.trigger('metronome', this);
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
    }, "16n");
  }
});
