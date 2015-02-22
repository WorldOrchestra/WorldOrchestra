var WO = WO || {};
WO.SongView = Backbone.View.extend({
  id: 'songView',

  initialize: function(params) {
    this.render();
    WO.vent.on('click:addTrack', this.addTrack, this);
    this.collection.on("add", this.renderTrack, this);
    this.collection.on("remove", this.render, this);
  },

  addTrack: function(){
    $('.active-track').removeClass('active-track');
    var newTrack = new WO.Track();
    this.collection.add(newTrack);
    // var trackView = new WO.TrackView({model: track});
    // this.$el.append(trackView.render());
  },
  removeTrack: function(){

  },
  render: function() {
    this.$el.children().remove();
    this.collection.forEach(this.renderTrack, this);
    $('.appBody').prepend(this.el);
    return this;
  },
  renderTrack: function(track){
    var trackView = new WO.TrackView({model: track});
    this.$el.append(trackView.render());
  }
});
