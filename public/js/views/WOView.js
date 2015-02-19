var WO = WO || {};
WO.WOView = Backbone.View.extend({

  initialize: function(params){
    var track = new WO.Track();
    var trackView = new WO.TrackView({model: track});
    var song = new WO.Song([track]);
    this.songView = new WO.SongView({collection: song});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.render();
  },

  render: function(){
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    //this.$el.show();
    $('.appBody').append(this.$el);
    drumPadHandler();
    return this.$el;//.html([
      //this.playerView.$el,
      //this.libraryView.$el,
      //this.songQueueView.$el
    //]);
  }
});
