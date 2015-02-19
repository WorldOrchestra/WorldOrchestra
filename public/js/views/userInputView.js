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
            '<div id="Content">'+
              '<div id="Sequencer"></div>'+
            '</div>'+
          '</div>'+
          '<div id="tabs-2">'+
            '<div id="keys">'+
            '<button class="octave"><span>Octave </span><span id="octave">3</span></button>' +
              '<div id="p-wrapper">'+ 
                '<ul id="piano">'+ 
                  '<li><div class="anchor" id="C3"></div></li>'+ 
                  '<li><div class="anchor" id="D3"></div><span id="Db3" class="anchor"></span></li>'+ 
                  '<li><div class="anchor" id="E3"></div><span id="Eb3" class="anchor"></span></li>'+ 
                  '<li><div class="anchor" id="F3"></div></li>'+ 
                  '<li><div class="anchor" id="G3"></div><span id="Gb3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="A3"></div><span id="Ab3" class="anchor"></span></li>'+
                  '<li><div class="anchor" id="B3"></div><span id="Bb3" class="anchor"></span></li>'+ 
                  '<li><div class="anchor" id="C3"></div></li>'+  
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
      // this.render();
  },
  render: function() {
      var myTemplate = this.$el.append(this.template);
      // drumPadHandler();
      return myTemplate;
  }
});
