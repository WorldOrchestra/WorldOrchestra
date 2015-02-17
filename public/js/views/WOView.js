var WO = WO || {};
WO.WOView = Backbone.View.extend({
  initialize: function(params){
    this.songView = new WO.SongView({collection: new WO.Song()});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
  },

  render: function(){
    return this.$el;//.html([
      //this.playerView.$el,
      //this.libraryView.$el,
      //this.songQueueView.$el
    //]);
  }
});
