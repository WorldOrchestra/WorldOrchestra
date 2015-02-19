var WO = WO || {};
WO.userInputView = Backbone.View.extend({
    //tagname: "",
    //className: 'songView',
    //events: {},
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
