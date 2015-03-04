var WO = WO || {};
WO.Song = Backbone.Collection.extend({
  url: '/api/songs',
  idAttribute: '_id',

  model: WO.Track,

  settings : {
    tempo: 120,
    title: "untitled song",
    timeSignature: 4,
    length: 8,
    activeTrack: ""
  },

  initialize : function(){
    this.add( new WO.Track());
    this.settings.activeTrack = this.at(0);
    // WO.setTempo(this.settings.tempo);
  },

  save: function(){
    // var ajax_song_id = this.settings._id,
    ajax_tempo = this.settings.tempo,
    ajax_title = this.settings.title,
    ajax_timeSignature = this.settings.timeSignature,
    ajax_length = this.settings.length,
    ajax_activeTrack = "";

    var ajax_tracks = [];
    this.models.forEach(function(track){
      ajax_tracks.push(track.get('_id'));
    });
    
    var ajax_method = this.settings._id ? "PUT" : "POST";
    var ajax_path = (ajax_method === "POST") ? "api/songs" : ("api/songs/" + this.settings._id);
    console.log('ajax_method ', ajax_method);
    console.log('ajax_path ' , ajax_path);
    var that = this;
    
    var serverCollection = $.ajax({
      type: ajax_method,
      url: window.location + ajax_path,
      data: {
            // _id: ajax_song_id,
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
        that.settings._id = data._id;
      },
      error: function(data){
        console.log(data);
        alert("error");
      }
    });

  //   this.models.forEach(function(track){
  //     var ajax_id = track.get('_id'),
  //     ajax_notes = track.get('notes'),
  //     ajax_title = track.get('title'),
  //     ajax_isMuted = Boolean(track.get('isMuted')),
  //     ajax_solo = Boolean(track.get('solo')),
  //     ajax_octave = track.get('octave'),
  //     ajax_volume = track.get('volume'),
  //     // ajax_instrument = track.get('instrument'),
  //     ajax_type = track.get('type');

  //     $.ajax({
  //       type: 'POST',
  //       url: window.location+ "api/tracks",
  //       data: {
  //             _id : ajax_id,
  //             song_id: ajax_song_id,
  //             notes : ajax_notes,
  //             title : ajax_title,
  //             isMuted : ajax_isMuted,
  //             solo : ajax_solo,
  //             octave : ajax_octave,
  //             volume : ajax_volume,
  //             // instrument : ajax_instrument,
  //             type : ajax_type
  //       },
  //       success: function(data) {
  //         console.log(data);
  //         console.log("Successfully saved song tracks!");
  //       },
  //       error: function(data){
  //         console.log(data);
  //         alert("error");
  //       }
  //     });
  //   });

  },

  fetch : function(song_id){
    var that = this;
    var result = {};

    $.ajax({
      type: 'GET',
      url: window.location+ "api/songs/" + song_id,
      success: function(data) {
        result = data;
        // console.log(result);
        console.log("Successfully fetched song!");
        that.setFetchedSongData(result);
      },
      error: function(data){
        alert("error fetching song");
      }
    });
    
  },

  setFetchedSongData : function(fetchedSong){
    for( var key in fetchedSong ){
      if(this.settings[key])
        this.settings[key] = fetchedSong[key];
    }
    if(fetchedSong.tracks.length > 0){
      this.settings.tracks = fetchedSong.tracks;
      var curModels = this.length;
      for( var i=0; i<curModels; i++ ){
        $('.' + this.at(i).cid).remove();
        this.remove(this.at(i));
      }
      that = this;
      var counter = 0;
      this.settings.tracks.forEach(function(track){
        that.add( new WO.Track({'_id' : track}) );
        that.at(counter).fetch();
        // that.at(counter).set('instrument', WO.InstrumentFactory(title, modelCid));
        // that.at(counter).get('mRender').showTrack(that.at(counter).get('notes'));
        counter+=1;
      });
    }

    // this.createTrackInstruments();
  },

  createTrackInstruments: function(){
    this.models.forEach(function(model){
      console.log( 'title ', model.get('title'));
      console.log( 'cid ', model.cid);
      model.set('instrument', WO.InstrumentFactory(model.get('title'), model.cid));
      model.get('mRender').showTrack(model.get('notes'));
    });
  }

  // setFetchedTracks : function(fetchedTrack){
  //     var that = this;
  //     var result = {};
  //     $.ajax({
  //       type: 'GET',
  //       url: window.location + "api/tracks/" + fetchedTrack,
  //       success: function(data) {
  //         result = data;
  //         console.log('fetch song = ', result);
  //         console.log("Successfully fetched track!");
  //         that.add(new WO.Track());
  //         for( var key in result){
  //           console.log(key);
  //           if( that.at(0).get(key) )              
  //             that.at(0).set(key, result[key]);
  //         }
  //       },
  //       error: function(data){
  //         alert("error fetching track data");
  //       }
  //     });
  // }

});
