var WO = WO || {};

WO.AudioDropZoneFactory = function(model){

  var instrument = {};

  var dropZone = $('<div class="' + model.cid + ' drop"></div>');
  $('.' + model.cid + ' .track-notes').append(dropZone);

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
            model.set('instrument', WO.AudioFactory(model.cid, e.dataTransfer.files[0]));
        //remove dropZone div
            $(this).remove();
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

  var dropTarget = document.querySelector('.' + model.cid + ' .drop');
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

  wavesurfer.loadBlob(audioFile);
  wavesurfer.setVolume(0.5);

  $('wave').css('overflow-x', 'hidden');
  return wavesurfer;
};
