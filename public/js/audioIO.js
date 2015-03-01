var WO = WO || {};

WO.audioIO = {

  'mediaStream': "",

  'source': "",

  'songBuffer': "",

  //pass in our WO namespaced Recorder instance
  recordMic : function(){
    var navigator = window.navigator;
        navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    var Context = window.AudioContext || window.webkitAudioContext;
    var context = new Context();
    
    // ask for permission and start recording
    navigator.getUserMedia({audio: true}, function(localMediaStream){
      console.log('localMediaStream', localMediaStream);
      WO.audioIO.mediaStream = localMediaStream;
      console.log('WO.audioIO.mediaStream', WO.audioIO.mediaStream);

      // create a stream source to pass to Recorder.js
      var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

      // create new WO namespaced instance of Recorder.js using the mediaStreamSource
      WO.audioIO.source = new Recorder(mediaStreamSource, {
        // pass the path to recorderWorker.js file here
        workerPath: 'bower_components/recorderjs/recorderWorker.js'
      });

      // start recording
      WO.audioIO.source.record();
    }, function(err){
      console.log('Browser not supported');
    });
  },

  //pass in our WO namespace Recorder instance
  stopMic : function(){
    console.log('recording has stopped');
    // stop the media stream
    WO.audioIO.mediaStream.stop();
    // stop Recorder.js
    WO.audioIO.source.stop();
  },

  //pass in our WO namespaced Recorder instance
  exportMicWav : function(filename){
    filename = filename || "filename.wav";
    // export it to WAV
    WO.audioIO.source.exportWAV(function(data){
      WO.audioIO.source.clear();
      Recorder.forceDownload(data, filename);
    });
  },

  recordSongStart : function(){
    var recorderWorkerUrl = 'bower_components/recorderjs/recorderWorker.js';
    var recordLength = WO.appView.songView.collection.settings.length;
    
    // //check to provide proper url
    // $.ajax({
    //     url: recorderWorkerUrl,
    //     type: 'GET',
    //     error: function()
    //     {
    //         //file does not exist - change path
    //         recorderWorkerUrl = 'scripts/b3fbf52f.vendor.js'
    //     },
    //     success: function()
    //     {
    //         // file exists - do nothing
    //     }
    // });
    WO.audioIO.songBuffer = new Recorder(Tone.Master, {'workerPath': recorderWorkerUrl});
    
    WO.audioIO.songBuffer.record();

    $('#play').css("background-color", "green");
    Tone.Transport.setInterval(function(time){
        $('#transportTime').text(Tone.Transport.getTransportTime());
        // console.log(Tone.Transport.getTransportTime());
    }, "16n");

    if(recordLength)

    WO.playDrumPad();
    //TO DO: need to get the song!
    WO.appView.transportView.triggerPlay();
    // WO.wavesurfer.play();
    WO.vent.trigger("globalPlay");

  },

  recordSongStop : function(){

    WO.audioIO.songBuffer.stop();

    WO.recording = false;
    $('#play').css("background-color", "white");
    $('#record').css({"background-color": "white", "color" : "red"});
    if(Tone.Transport.getTransportTime())
    Tone.Transport.stop();
    Tone.Transport.clearIntervals();

    WO.appView.songView.collection.models.forEach(function(track){
      var title = track.get('title');
      if( title !== "Acoustic Piano" || title !== "Drums"){
      WO.transport.killNotes(track);
      }
    });

    WO.vent.trigger("globalStop");

  },

  playSongBuffer : function(){
    function getBufferCallback( buffers ) {
      var newSource = audioContext.createBufferSource();
      var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
      newBuffer.getChannelData(0).set(buffers[0]);
      newBuffer.getChannelData(1).set(buffers[1]);
      newSource.buffer = newBuffer;

      newSource.connect( audioContext.destination );
      newSource.start(0);
    };

    var audioContext = Tone.Master.context;

    WO.audioIO.songBuffer.getBuffer(getBufferCallback);
  },

  exportSongWav : function(filename){
    filename = filename || "filename.wav";
    // export it to WAV
    WO.audioIO.songBuffer.exportWAV(function(data){
      WO.audioIO.songBuffer.clear();
      Recorder.forceDownload(data, filename);
    });
  }
    
};
