var WO = WO || {};
WO.TrackView = Backbone.View.extend({
  events: {
    'click .delete-track-button' : 'deleteTrack'
  },

  template: _.template(
    '<div class="track-container">' +
      '<div class="track-controls">' +
        '<p class="track-title"> <%= title %> </p>' +
        '<button class="delete-track-button" id="delete"><i class="fa fa-trash-o"></i></button><br>' +
        '<button class="solo-button" id="solo">S</button>' +
        '<button class="mute-button" id="mute" >M</button>' +
        '&nbsp;<i class="fa fa-volume-down"></i>' +
        '<input type="range" min="0.00" max="1.00" step="0.01" value="0.75">' +
        '<i class="fa fa-volume-up"></i>' +
      '</div>' +
      '<div class="track-notes">' +
      '</div>' +
    '</div>'
  ),
  initialize: function(){
    // this.render();
  },
  render: function(){
    this.$el.html( this.template(this.model.toJSON()));
    return this.$el;
  },

  deleteTrack: function(){
    this.model.collection.remove(this.model);
  }

});
