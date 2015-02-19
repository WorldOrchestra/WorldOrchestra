var WO = WO || {};
WO.TrackView = Backbone.View.extend({
  events: {
    'click .delete-track-button' : 'deleteTrack',
    'change .track-volume-slider' : 'setTrackVolume',
    'click .mute-track-button' : 'muteTrack'
  },

  template: _.template(
    '<div class="track-container">' +
      '<div class="track-controls">' +
        '<p class="track-title"> <%= title %> </p>' +
        '<button class="delete-track-button" id="delete"><i class="fa fa-trash-o"></i></button><br>' +
        '<button class="solo-track-button" id="solo">S</button>' +
        '<button class="mute-track-button" id="mute" >M</button>' +
        '&nbsp;<i class="fa fa-volume-down"></i>' +
        '<input class="track-volume-slider" type="range" min="0.00" max="1.00" step="0.01" value="0.75">' +
        '<i class="fa fa-volume-up"></i>' +
      '</div>' +
      '<div class="track-notes">' +
      '</div>' +
      '<script>WO.showTrack(<%= notes %>)</script>' +
    '</div>'
  ),
  initialize: function(){
  },
  render: function(){
    this.$el.html( this.template(this.model.toJSON()));
    return this.$el;
  },

  deleteTrack: function(){
    this.model.collection.remove(this.model);
  },

  setTrackVolume: function(){
    var volume = this.$el.find('.track-volume-slider').val();
    this.model.set('volume', volume);
    this.model.get('instrument').setVolume(volume*20);
  },

  muteTrack: function(){
    var volume, color;
    if( this.model.get('isMuted') ){
      volume = 0;
      this.model.set('isMuted', false);
      color = "rgb(255,255,255)";
    }else{
      volume = -50;
      this.model.set('isMuted', true);
      color = "rgb(255,0,0)";
    }
    // console.log(color);
    $('.mute-track-button').toggleClass('muted');
    this.model.set('volume', volume);
    this.model.get('instrument').setVolume(volume);
  }

});
