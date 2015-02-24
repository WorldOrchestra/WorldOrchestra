var WO = WO || {};
WO.WOView = Backbone.View.extend({

  template: _.template(
    '<div>' +
      '<button class="add-track-button"><i class="fa fa-plus"></i></button>' +
    '</div>'
    ),

  initialize: function(params){
    this.songView = new WO.SongView({collection: new WO.Song()});
    this.transportView = new WO.TransportView();
    this.userInputView = new WO.userInputView();
    this.render();
  },

  render: function(){
    this.$el.append(this.template);
    this.$el.append(this.transportView.$el);
    this.$el.append(this.userInputView.render());
    $('.appBody').append(this.$el);
    return this.$el;
  }
});
