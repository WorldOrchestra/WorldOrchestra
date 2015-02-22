var WO = WO || {};
WO.SongView = Backbone.View.extend({
  id: 'songView',

  initialize: function(params) {
    this.render();
    WO.vent.on('click:addTrack', this.addTrack, this);
    this.collection.on("add remove", this.render, this);
  },

  addTrack: function(){
    var newTrack = new WO.Track();
    this.collection.add(newTrack);
  },
  removeTrack: function(){

  },
  render: function() {
    this.$el.children().detach();
    this.collection.forEach(this.renderTrack, this);
    $('.appBody').prepend(this.el);
    return this;
  },
  renderTrack: function(track){
    var trackView = new WO.TrackView({model: track});
    this.$el.append(trackView.render());
  }
});
