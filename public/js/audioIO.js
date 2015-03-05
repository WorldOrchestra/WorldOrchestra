var WO = WO || {};

WO.audioIO = {

  'mediaStream': "",

  'source': "",

  'songBuffer': "",

  /****** Microphone Recording/Exporting ******/

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

  /****** Song Recording/Exporting ******/

  recordSongStart : function(){
    var recorderWorkerUrl = 'bower_components/recorderjs/recorderWorker.js';
    var recordLength = WO.appView.songView.collection.settings.length;

    WO.audioIO.songBuffer = new Recorder(Tone.Master, {'workerPath': recorderWorkerUrl});
    WO.audioIO.songBuffer.record();
    //TO DO: need to get the song!
    WO.appView.transportView.triggerPlay();
  },

  recordSongStop : function(){
    WO.audioIO.songBuffer.stop();
    WO.audioIO.recording = false;
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
    }

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
  },

  checkTransportTime : function() {

    // Figure out the song length for how long to record.
    var recordLength = WO.appView.songView.collection.settings.length;

    // Figure out the current measure of the Transport.
    var transportTime = Tone.Transport.getTransportTime();
    var splitTransportTime = transportTime.split(':');
    var currentMeasures = Number(splitTransportTime[0]);

    // If the current measure > our record length, stop recording and export.
    if(currentMeasures >= recordLength){
      clearInterval(WO.audioIO.recInterval);
      WO.TransportView.prototype.recordWav();
      WO.audioIO.recording = false;
    }
  }

};
