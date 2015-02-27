var WO = WO || {};

WO.AudioDropZoneFactory = function(cid){

  var instrument = {};
  instrument.title = "Audio File";

  var dropZone = $('<div class="' + cid + ' drop"></div>');
  $('.' + cid + ' .track-notes').append(dropZone);

  var toggleActive = function (e, toggle) {
    e.stopPropagation();
    e.preventDefault();
    toggle ? e.target.classList.add('wavesurfer-dragover') :
    e.target.classList.remove('wavesurfer-dragover');

  };

  var handlers = {
    // Drop event
    drop: function (e) {
        toggleActive(e, false);

        // Load the file into wavesurfer
        if (e.dataTransfer.files.length) {
            WO.AudioFactory(cid, e.dataTransfer.files[0]);
            // wavesurfer.loadBlob(e.dataTransfer.files[0]);
        } else {
            alert("not a file!");
            // wavesurfer.fireEvent('error', 'Not a file');
        }
    },

    // Drag-over event
    dragover: function (e) {
        toggleActive(e, true);
    },

    // Drag-leave event
    dragleave: function (e) {
        toggleActive(e, false);
    }
  };

  var dropTarget = document.querySelector('.' + cid + ' .drop');
  console.log(dropTarget);
  Object.keys(handlers).forEach(function (event) {
      dropTarget.addEventListener(event, handlers[event]);
  });

  return instrument;
};

WO.AudioFactory = function(cid, audioFile){

  var wavesurfer = Object.create(WaveSurfer);
  var classEl = 'wave-' + cid;
  var wavesurferEl = $('<div class="' + classEl + '"></div');

  var query = '.' + cid;
  $(query).find('.track-notes').append(wavesurferEl);

  wavesurfer.init({
      container: '.'+classEl,
      waveColor: 'violet',
      progressColor: 'purple',
      height: 80,
      hideScrollbar: true
  });

//todo-delete hardwire

//open a file chooser
wavesurfer.loadBlob(audioFile);
  // wavesurfer.load('../soundfont/vox1.wav');

  wavesurfer.setVolume(0.5);

  $('body').on('click', '#play', function(){
    wavesurfer.play();
  });
  $('body').on('click', '#stop', function(){
    wavesurfer.stop();
  });


  // $('body').on('click', '#rewind', function(){
  //   wavesurfer.stop();
  // });
wavesurfer.title = "Audio";
  $('wave').css('overflow-x', 'hidden');
return wavesurfer;


};
