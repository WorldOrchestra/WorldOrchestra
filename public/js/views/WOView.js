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
    this.loginView = new WO.LoginView();
    this.songListView = new WO.SongListView();
    this.landingView = new WO.LandingView();
    this.render();
    this.startListeners();
    $(function(){
      if(window.localStorage.WO_isLoggedIn !== "true"){
        $('.open-landing').click();
      }

      $(document).bind("drop dragover", function(e){
          if($(e.target).hasClass("drop") !== true){
              e.preventDefault();
          }
      });
    })
  },

  render: function(){
    this.$el.append(this.template);
    $('body').prepend(this.navbarView.render());
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    this.$el.append(this.loginView.render());
    this.$el.append(this.songListView.render());
    this.$el.append(this.landingView.render());
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
  },

  startListeners: function() {
    //instantiate global play event listener
    this.transportView.on('play', function(){
      WO.playDrumPad();
      if ($('.metronomeOn').length > 0) {
        WO.Metronome.playMetronome();
      }
      WO.transport.playSong(WO.appView.songView.collection);
    });
    this.transportView.on('stop', function(){
      WO.transport.stopTracks();
    });
    //this.songView.on('unbind', this.unbindKeys);
    //this.songView.collection.on('unbind', this.unbindKeys);
  },

  unbindKeys: function() {
    $(document).unbind('keydown');
    $(document).unbind('keyup');
    $('#Container').off('mousedown');
    $('#Container').off('mouseup');
  }
});
