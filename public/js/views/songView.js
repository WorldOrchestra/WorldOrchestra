var WO = WO || {};
WO.SongView = Backbone.View.extend({
  id: 'songView',

  initialize: function(params) {
    this.render();
    WO.vent.on('click:addTrack', this.addTrack, this);
    this.collection.on("add", this.renderTrack, this);
    this.collection.on("remove", this.removeTrack, this);
  },

  render: function() {
    this.$el.children().remove();
    $('.appBody').prepend(this.el);
    this.collection.forEach(this.renderTrack, this);
    return this;
  },

  addTrack: function(){
    var newTrack = new WO.Track();
    this.collection.settings.activeTrack = newTrack;
    this.collection.add(newTrack);
    WO.appView.unbindKeys();
    WO.instrumentKeyHandler.create(newTrack.attributes.instrument);
  },

  removeTrack: function(){
    var collectionLength = this.collection.length;
    this.collection.settings.activeTrack = collectionLength ?  this.collection.at(collectionLength - 1) : "";
    $('.' + this.collection.settings.activeTrack.cid).addClass('active-track');
  },

  renderTrack: function(track){
    var trackView = new WO.TrackView({model: track});
    $('#songView').append(trackView.render());

    $(document).ready((function(){
      track.set('mRender', new WO.MidiRender(track.cid+ ' .track-notes'));
    }).bind(this));
    this.setActiveClass();
  },

  setActiveClass: function(){
    $('.active-track').removeClass('active-track');
    $('.' + this.collection.settings.activeTrack.cid).addClass('active-track');
  }
});
