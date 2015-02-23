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
    this.$el.append(this.userInputView.render());
    $('.appBody').append(this.$el);
    return this.$el;
  }
});
