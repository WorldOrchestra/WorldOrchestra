var WO = WO || {};
WO.TrackView = Backbone.View.extend({
  events: {
    'click .delete-track-button' : 'deleteTrack',
    'change .track-volume-slider' : 'setTrackVolume',
    'click .mute-track-button' : 'muteTrack',
    'change .instrument-selector' : 'changeInstrument',
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
  },

  changeInstrument : function(e){
    console.log($(e.currentTarget)[0].value);
    this.model.set('instrument');
    //get number of track
    //use that number in variable - "WO.instrumentTrack" + number
    //set the instrument name using the instrument from the dropdown
  },

  setActiveTrack: function(){
    //know current active
    $('.active-track').removeClass('active-track');
    //remove active-track class
    console.log("collection", this.model.collection);
    console.log("model", this.model);
    this.model.collection.settings.activeTrack = this.model;
    //add active-track class
    this.$el.find('.track-container').addClass('active-track');
    console.log(this.$el);
    WO.instrumentKeyHandler(this.model.collection.settings.activeTrack.attributes.instrument);
  }

});
