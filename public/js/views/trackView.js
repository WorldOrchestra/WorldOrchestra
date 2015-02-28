var WO = WO || {};
WO.TrackView = Backbone.View.extend({
  events: {
    'click .delete-track-button' : 'deleteTrack',
    'change .track-volume-slider' : 'setTrackVolume',
    'click .mute-track-button' : 'muteTrack',
    'change .instrument-selector' : 'changeInstrumentTrigger',
    'click .track-container' : 'setActiveTrack'
  },

  template: _.template(
    '<div class="track-container active-track <%= cid %>">' +
      '<div class="track-controls">' +
        '<p class="track-title"> <%= attributes.title %> </p>' +
        '<button class="delete-track-button" id="delete"><i class="fa fa-trash-o"></i></button><br>' +
        '<form action="#">' +
        // '<fieldset>' +
          '<label for="instrument">Select instrument </label>' +
          '<select name="instrument-selector" class="instrument-selector">' +
            '<option selected="selected" value="Acoustic Piano">Acoustic Piano</option>'+
            '<option value="Synth">Synth</option>'+
            '<option value="Drums">Drums</option>' +
            '<option value="Audio File">Audio File</option>' +
          '</select>' +
        // '</fieldset>' +
        '</form><br>' +
        '<button class="solo-track-button" id="solo">S</button>' +
        '<button class="mute-track-button" id="mute">M</button>' +
        '<div class="track-volume-slider-group">' +
          '<i class="fa fa-volume-down"></i>' +
          '<input class="track-volume-slider" type="range" min="0.00" max="1.00" step="0.01" value="0.75">' +
          '<i class="fa fa-volume-up"></i>' +
        '</div>' +
      '</div>' +
      '<div class="track-notes" style="overflow:scroll"></div>' +
    '</div>'
  ),
  initialize: function(){
  },

  render: function(){
    this.$el.html( this.template(this.model));
    return this.$el;
  },

  deleteTrack: function(e){
    e.stopImmediatePropagation();
    $('.' + this.model.cid).remove();
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
    this.$el.find('.mute-track-button').toggleClass('muted');
    this.model.set('volume', volume);
    this.model.get('instrument').setVolume(volume);
  },

  changeInstrumentTrigger : function(e){
    var instrumentName = $(e.currentTarget)[0].value;
    $(e.currentTarget)[0].blur();
    this.model.trigger('changeInstrument', instrumentName);
    // set Track name to instrument name on change
    $(e.currentTarget).closest('.track-controls').find('.track-title').text(instrumentName);
  },

  setActiveTrack: function(){
    $('.active-track').removeClass('active-track');
    this.model.collection.settings.activeTrack = this.model;
    WO.appView.unbindKeys();
    this.$el.find('.track-container').addClass('active-track');
    WO.instrumentKeyHandler.create(this.model.collection.settings.activeTrack.attributes.instrument);
  }
});
