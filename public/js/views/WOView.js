var WO = WO || {};
WO.WOView = Backbone.View.extend({

  initialize: function(params){
    this.songView = new WO.SongView({collection: new WO.Song()});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.render();
  },

  render: function(){
    this.$el.append(this.transportView.$el);
    //this.$el.show();
    $('.appBody').append(this.$el);
    return this.$el;//.html([
      //this.playerView.$el,
      //this.libraryView.$el,
      //this.songQueueView.$el
    //]);
  }
});
