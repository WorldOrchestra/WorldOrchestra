var WO = WO || {};
WO.WOView = Backbone.View.extend({

  initialize: function(params){
    this.songView = new WO.SongView({collection: WO.song});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.render();
  },

  render: function(){
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    $('.appBody').append(this.$el);
    WO.drumPadHandler();
    return this.$el;
  }
});
