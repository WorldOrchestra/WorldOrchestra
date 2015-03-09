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
          '<label for="instrument">Select instrument </label>' +
          '<select name="instrument-selector" class="instrument-selector">' +
            '<option selected="selected" value="Acoustic Piano">Acoustic Piano</option>'+
            '<option value="Acoustic Guitar Steel">Acoustic Guitar Steel</option>' +
            '<option value="Audio File">Audio File</option>' +
            '<option value="Alto Sax">Alto Sax</option>' +
            '<option value="Church Organ">Church Organ</option>' +
            '<option value="Distortion Guitar">Distortion Guitar</option>' +
            '<option value="Electric Piano 1">Electric Piano 1</option>'+
            '<option value="Flute">Flute</option>'+
            '<option value="Muted Trumpet">Muted Trumpet</option>'+
            '<option value="Oboe">Oboe</option>'+
            '<option value="Overdriven Guitar">Overdriven Guitar</option>'+
            '<option value="Pad 3 Polysynth">Pad 3 Polysynth</option>'+
            '<option value="Synth">Synth</option>'+
            '<option value="Synth Bass 1">Synth Bass 1</option>' +
            '<option value="Synth Strings 2">Synth Strings 2</option>' +
            '<option value="Viola">Viola</option>'+
            '<option value="Violin">Violin</option>'+
            '<option value="Xylophone">Xylophone</option>'+
          '</select>' +
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
    var volumeSlider = this.$el.find('.track-volume-slider').val();
    this.model.set('volume', volumeSlider);
    this.model.get('instrument').setVolume( 20 * Math.log10(volumeSlider) );
  },

  muteTrack: function(){
    var volumeSlider = this.$el.find('.track-volume-slider').val();
    var volume, dbVolume;
    if( this.model.get('isMuted') ){
      if(this.model.get('instrument').title === "Synth"){
        volume = -30;
      }else{
        volume = 20 * Math.log10(volumeSlider);
      }
      databaseVolume = volumeSlider;
      this.model.set('isMuted', false);
    }else{
      volume = 20 * Math.log10(0);
      databaseVolume = 0;
      this.model.set('isMuted', true);
    }
    this.$el.find('.mute-track-button').toggleClass('muted');
    if(this.model.get('type') === "Audio"){
        this.model.get('instrument').toggleMute();
      }else{
        this.model.set('volume', databaseVolume);
        this.model.get('instrument').setVolume(volume);
      }
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
