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
    activeTrack: "",
    tracks: ""
  },

  initialize : function(){
    this.add( new WO.Track() );
    this.settings.activeTrack = this.at(0);
    // WO.setTempo(this.settings.tempo);
  },

  save: function(){

    var exit = false;

    $.when(this.userAuthenticated()).done(function(){
      if(window.localStorage.WO_isLoggedIn !== "true"){
        alert('You must be logged in!');
        exit = true;
      }
    });

    if(exit){
      return;
    }

    var promptName = prompt("Please name your song", WO.appView.songView.collection.settings.title);
    this.settings.title = promptName || "untitled song";

    //update song title in ui
    $('.song-title').text(WO.appView.songView.collection.settings.title);

    var ajax_tempo = this.settings.tempo,
    ajax_title = this.settings.title,
    ajax_timeSignature = this.settings.timeSignature,
    ajax_length = this.settings.length,
    ajax_activeTrack = "",
    ajax_tracks = [];
    
    var numberOfModels = this.models.length;

    // this.models.forEach(function(track){
    for(var i=this.models.length-1; i>= 0; i--){
      $.when(this.at(i).saveTrack()).done(function(trackId){
        // console.log('trackId return = ', trackId._id)
        // console.log('saved track');
        ajax_tracks.push(trackId._id);
      });
    };
    
    var ajax_method = this.settings._id ? "PUT" : "POST";
    var ajax_path = (ajax_method === "POST") ? "api/songs" : ("api/songs/" + this.settings._id);
    // console.log('ajax_method ', ajax_method);
    // console.log('ajax_path ' , ajax_path);
    var that = this;
    
    var serverCollection = function(){
      // console.log('saving song to server');
      $.ajax({
        type: ajax_method,
        url: window.location + ajax_path,
        data: {
              tempo: ajax_tempo,  
              title: ajax_title,  
              timeSignature: ajax_timeSignature,  
              length: ajax_length,  
              activeTrack: ajax_activeTrack,
              tracks: ajax_tracks
        },
        success: function(data) {
          // console.log(data);          
          // console.log("Successfully saved song model!");
          alert("Successfully saved song!");
          that.settings._id = data._id;
        },
        error: function(data){
          // console.log(data);
          alert("error");
        }
      });
    };

    var ajaxInterval = setInterval(function(){
      if(ajax_tracks.length === numberOfModels){
        serverCollection();
        clearInterval(ajaxInterval);
      }
    }
      ,100);
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
      for( var i=curModels-1; i>=0; i-- ){
        $('.' + this.at(i).cid).remove();
        this.remove(this.at(i));
      }
      that = this;
      numTracks = that.settings.tracks.length;
      // console.log('current number of tracks = ' + numTracks);
      for( var j=0; j<numTracks; j++){  
        // console.log('created new empty track ' + j);    
        that.add( new WO.Track({'_id' : that.settings.tracks[j]}) );
        // console.log('fetching ' + that.at(j));
        $.when(that.at(j).fetch()).done(function(){
          that.models.forEach(function(track){
            var title = track.get('title');
            var modelCid = track.cid;
            var instrument = track.get('instrument');
            if(title !== "Acoustic Piano"){
              track.set('instrument', WO.InstrumentFactory(title, modelCid));
            }
            track.get('mRender').showTrack(track.get('notes'));
          });
        });
      }
    }
    //set first track to activeTrack
    var firstTrack = 'track-container, .' + WO.appView.songView.collection.at(0).cid; 
    $(firstTrack).click();
    //update song title in ui
    $('.song-title').text(WO.appView.songView.collection.settings.title);
  },

  userAuthenticated: function(){
    var result = {};
    $.ajax({
      type: 'GET',
      url: window.location+ "secret",
      success: function(data) {
        result = data;
        if(result.hasOwnProperty('message')){
          window.localStorage.WO_isLoggedIn = true;
        }else{
          delete window.localStorage.WO_isLoggedIn;
        }
      },
      error: function(err){
        console.log(err);
      }
    });
  }
});
