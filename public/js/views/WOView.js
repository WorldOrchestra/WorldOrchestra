var WO = WO || {};
WO.WOView = Backbone.View.extend({
  events: {
    'click': 'deactivateNote'
  },

  template: _.template(
    '<div>' +
      '<button class="add-track-button">Add Track</button>' +
    '</div>'
    ),

  initialize: function(params){
    this.navbarView = new WO.navbarView();
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.songView = new WO.SongView({collection: new WO.Song()});
    this.loginView = new WO.loginView();
    this.signupView = new WO.signupView();
    this.render();

    //instantiate global play event listener
    this.transportView.on('play', function(){
      WO.playDrumPad();
      WO.playSong(WO.appView.songView.collection);

      $('#play').addClass('play');
      Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
        // console.log(Tone.Transport.getTransportTime());
      }, "16n");
    }.bind(this));
  },

  render: function(){
    this.$el.append(this.template);
    $('body').prepend(this.navbarView.render());
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    this.$el.append(this.loginView.render());
    this.$el.append(this.signupView.render());
    $('.appBody').append(this.$el);
    return this.$el;
  },

  deactivateNote: function() {
    // To set up the user's ability to delete a note, the program add a class to it when
    // the user clicks it.  The program uses the class to know what to remove when
    // pressing the delete key.  Naturally, this class needs to be removed when no
    // longer relevant, hence this click event.
    d3.select('.activeNote')
      .classed('activeNote', false);
  }
});
