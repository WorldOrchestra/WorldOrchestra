var WO = WO || {};
WO.Song = Backbone.Collection.extend({
  url: '/api/songs',
  
  model: WO.Track,

  settings : {
    _id: "",
    tempo: 120,
    title: "untitled song",
    timeSignature: 4,
    length: 8,
    activeTrack: ""
  },

  initialize : function(){
    this.add( new WO.Track());
    this.settings.id = this.genObjectId();
    this.settings.activeTrack = this.at(0);
    // WO.setTempo(this.settings.tempo);
  },

  genObjectId: (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return function() {
      return s4() + s4() + s4();
    };
  })(),

  save: function(){
    var ajax_song_id = this.settings.id,
    ajax_tempo = this.settings.tempo,
    ajax_title = this.settings.title,
    ajax_timeSignature = this.settings.timeSignature,
    ajax_length = this.settings.length,
    ajax_activeTrack = "";

    var ajax_tracks = [];
    this.models.forEach(function(track){
      ajax_tracks.push(track.get('_id'));
    });
    
    var serverCollection = $.ajax({
      type: 'POST',
      url: window.location+ "api/songs",
      data: {
            _id: ajax_song_id,
            tempo: ajax_tempo,  
            title: ajax_title,  
            timeSignature: ajax_timeSignature,  
            length: ajax_length,  
            activeTrack: ajax_activeTrack,
            tracks: ajax_tracks
      },
      success: function(data) {
        console.log(data);
        console.log("Successfully saved song model!");
      },
      error: function(data){
        console.log(data);
        alert("error");
      }
    });

    this.models.forEach(function(track){
      var ajax_id = track.get('_id'),
      ajax_notes = track.get('notes'),
      ajax_title = track.get('title'),
      ajax_isMuted = Boolean(track.get('isMuted')),
      ajax_solo = Boolean(track.get('solo')),
      ajax_octave = track.get('octave'),
      ajax_volume = track.get('volume'),
      // ajax_instrument = track.get('instrument'),
      ajax_type = track.get('type');

      $.ajax({
        type: 'POST',
        url: window.location+ "api/tracks",
        data: {
              _id : ajax_id,
              song_id: ajax_song_id,
              notes : ajax_notes,
              title : ajax_title,
              isMuted : ajax_isMuted,
              solo : ajax_solo,
              octave : ajax_octave,
              volume : ajax_volume,
              // instrument : ajax_instrument,
              type : ajax_type
        },
        success: function(data) {
          console.log(data);
          console.log("Successfully saved song tracks!");
        },
        error: function(data){
          console.log(data);
          alert("error");
        }
      });
    });

  }

});
