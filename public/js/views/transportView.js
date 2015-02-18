var WO = WO || {};
WO.TransportView = Backbone.View.extend({
  //tagname: "",
  className: 'transportView',
  //events: {},
  template: _.template(
    '<div class="transportEl"><span>Transport Time </span><span id="transportTime"><span class="tBar">0</span>:<span class="tBeats">0</span>:<span class="tSixt">0</span></span></div>' +
    '<div class="transportControls">' +
      '<button id="rewind"><i class="fa fa-fast-backward"></i></button>' +
      '<button id="skipBack"><i class="fa fa-backward"></i></button>' +
      '<button id="stop"><i class="fa fa-stop"></i></button>' +
      '<button id="play"><i class="fa fa-play"></i></button>' +
      '<button id="record"><i class="fa fa-play-circle" style="color:red"></i></button>' +
      '<button id="skipForward"><i class="fa fa-forward"></i></button>' +
      '<button id="forward"><i class="fa fa-fast-forward"></i></button>' +
    '</div>' +
    '<div id="keys">' +
      '<button class="octave"><span>Octave </span><span id="octave">4</span></button>' +
      '<button id="C4">C</button>' +
      '<button id="Db4" style="background-color:black;color:white">Db</button>' +
      '<button id="D4">D</button>' +
      '<button id="Eb4" style="background-color:black;color:white">Eb</button>' +
      '<button id="E4">E</button>' +
      '<button id="F4">F</button>' +
      '<button id="Gb4" style="background-color:black;color:white">Gb</button>' +
      '<button id="G4">G</button>' +
      '<button id="Ab4" style="background-color:black;color:white">Ab</button>' +
      '<button id="A4">A</button>' +
      '<button id="Bb4" style="background-color:black;color:white">Bb</button>' +
      '<button id="B4">B</button>' +
      '<button id="C5">C</button>' +
      '<button id="Db5" style="background-color:black;color:white">Db</button>' +
      '<button id="D5">D</button>' +
      '<button id="Eb5" style="background-color:black;color:white">Eb</button>' +
      '<button id="E5">E</button>' +
      '<button id="F5">F</button>' +
    '</div>'
  ),
  initialize: function(params) {
    this.render();
  },
  render: function() {
    return this.$el.append(this.template);
  }
});
