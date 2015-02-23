var WO = WO || {};
WO.WOView = Backbone.View.extend({

  initialize: function(params){
    WO.track = new WO.Track();
    WO.trackView = new WO.TrackView({model: WO.track});
    WO.song = new WO.Song([WO.track]);
    this.songView = new WO.SongView({collection: WO.song});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.loginView = new WO.loginView();
    this.signupView = new WO.signupView();
    this.render();
  },

  render: function(){
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    // this.$el.append(this.loginView.render());
    this.$el.append(this.signupView.render());
    $('.appBody').append(this.$el);
    WO.drumPadHandler();
    return this.$el;//.html([
      //this.playerView.$el,
      //this.libraryView.$el,
      //this.songQueueView.$el
    //]);
  }
});
