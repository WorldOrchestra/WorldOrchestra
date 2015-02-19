var WO = WO || {};
WO.TransportView = Backbone.View.extend({
  //tagname: "",
  className: 'transportView',
  //events: {},
  template: _.template(
    '<div class="transportEl"><span>Transport Time </span><span id="transportTime"><span class="tBar">0</span>:<span class="tBeats">0</span>:<span class="tSixt">0</span></span></div>' +
    '<button id="metronome"><i class="fa fa-heartbeat"></i></button>' +
    '<div class="transportControls">' +
      '<button id="rewind"><i class="fa fa-fast-backward"></i></button>' +
      '<button id="skipBack"><i class="fa fa-backward"></i></button>' +
      '<button id="stop"><i class="fa fa-stop"></i></button>' +
      '<button id="play"><i class="fa fa-play"></i></button>' +
      '<button id="record"><i class="fa fa-play-circle" style="color:red"></i></button>' +
      '<button id="skipForward"><i class="fa fa-forward"></i></button>' +
      '<button id="forward"><i class="fa fa-fast-forward"></i></button>' +
    '</div>'
  ),
  initialize: function(params) {
    this.render();
  },
  render: function() {
    return this.$el.append(this.template);
  }
});
