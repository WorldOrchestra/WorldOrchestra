var WO = WO || {};
WO.userInputView = Backbone.View.extend({

  template: _.template(
    '<script>$(function() {$( "#tabs" ).tabs();});</script>'+
    '<div>'+
      '<div id="Container">'+
        '<div id="Loading">LOADING...</div>'+
        '<div id="tabs">'+
          '<ul>'+
            '<li><a href="#tabs-1">Drum Pad</a></li>'+
            '<li><a href="#tabs-2">Piano</a></li>'+
          '</ul>'+
          '<div id="tabs-1">'+
            '<div id=drumpPadPresets">' +
              '<button class="clear-drumPad-button" onClick="WO.clearDrumPad();">Reset</button>' +
              '<select id="drumpPadPreset-dropdown-list" onchange=WO.setDrumPadPreset(WO.drumPadPresetRock)>' +
                '<option value="">Preset</option>' +
                '<option value="WO.drumpPadPresetRock">Rock</option>' +
              '</select>' +
            '</div>' +
            '<div id="UIContent">'+
              '<div id="drumpad-icons">'+
                '<img src="../img/drumpad-hihat.jpg">'+
                '<img src="../img/drumpad-snare.jpg">'+
                '<img src="../img/drumpad-tom.jpg">'+
                '<img src="../img/drumpad-tom2.jpg">'+
                '<img src="../img/drumpad-tom3.jpg">'+
                '<img src="../img/drumpad-kick.jpg">'+
              '</div>'+
              '<div id="Sequencer">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div id="tabs-2">'+
            '<div id="keys">'+
            '<button class="octave"><span>Octave </span><span id="octave">4</span></button>' +
            '<button class="enable-midi-button" onClick="WO.midi.enableMidiController();"><span>Enable External MIDI Controller</span></button>' +
              '<div id="p-wrapper">'+
                '<ul id="piano">'+
                  '<li><div class="anchor" id="C3"></div></li>'+
                  '<li><div class="anchor" id="D3"></div><span id="Db3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="E3"></div><span id="Eb3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="F3"></div></li>'+
                  '<li><div class="anchor" id="G3"></div><span id="Gb3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="A3"></div><span id="Ab3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="B3"></div><span id="Bb3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="C4"></div></li>'+
                  '<li><div class="anchor" id="D4"></div><span id="Db4" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="E4"></div><span id="Eb4" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="F4"></div></li>'+
                  '<li><div class="anchor" id="G4"></div><span id="Gb4" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="A4"></div><span id="Ab4" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="B4"></div><span id="Bb4" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="C5"></div></li>'+
                  '<li><div class="anchor" id="D5"></div><span id="Db5" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="E5"></div><span id="Eb5" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="F5"></div></li>'+
                  '<li><div class="anchor" id="G5"></div><span id="Gb5" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="A5"></div><span id="Ab5" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="B5"></div><span id="Bb5" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="C6"></div></li>'+
                '</ul>'+
              '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'
  ),
  initialize: function(params) {
    $('body').on('pianoKeyOn', function(e, note){
      var noteId = '#' + note;
      // console.log("note triggeredon", noteId.length);
     if (noteId.length === 4){
       $('#piano').find(noteId).addClass("keyboardPressBlackKey");
       // console.log( $('#piano').find(noteId));
     } else {
       $('#piano').find(noteId).addClass("keyboardPress");
     }
    });

    $('body').on('pianoKeyOff', function(e, note){
      var noteId = '#' + note;
      // console.log("note triggeredoff", noteId.length);
      if (noteId.length === 4){
        $('#piano').find(noteId).removeClass("keyboardPressBlackKey");
      } else {
        $('#piano').find(noteId).removeClass("keyboardPress");
      }
    });
      // this.render();
  },
  render: function() {
    var myTemplate = this.$el.append(this.template);
    $(document).ready(WO.drumPadHandler);
    return myTemplate;
  }
});
