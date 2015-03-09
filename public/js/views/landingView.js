WO = WO || {};
WO.LandingView = Backbone.View.extend({

  initialize: function(){
    WO.vent.on('openLandingModal', this.openLandingModal, this);
  },

  events: {
    'click .open' : 'openModal',
    'click .previous': 'previousStep',
    'click .next': 'nextStep'
  },

  template: _.template(
    '<div class="app"></div>'+
    '<!-- The modal structure, with an container element that will contain all tabs -->'+
    '<script type="text/template" id="modal-template">'+
      '<div class="my-container"></div>'+
    '</script>'+
    '<!-- Step 1 -->'+
    '<script type="text/template" id="modal-view1-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Welcome to World Orchestra!</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<img src="../img/help/drumpad-icons.jpg" id="help-pg1">'+
        '<p>Here is our Drum Pad. Horizontally, each square represents one sixteenth note. Vertically, each square represents a different drum. From the bottom up we have: Kick, Tom3, Tom2, Tom1, Snare, Hi-Hat. The slider on the left side is just for looks ;)</p>'+
        '<p>When you click Play in the transport controls a drum beat will automatically play and loop every measure. A black square means the drum will play at that particular time in the loop.</p>'+

        '<a href="" id="step4">Directly go to the last step</a>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous inactive">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 2 -->'+
    '<script type="text/template" id="modal-view2-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Drum Presets</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
      '<img src="../img/help/drumpad-reset.jpg" id="help-pg2">'+
        '<p> You can click Reset to make you own pattern or choose a preset from the list of patterns.</p>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 3 -->'+
    '<script type="text/template" id="modal-view3-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">How to play</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
       '<img src="../img/help/drumpad-pianotab.jpg" id="help-pg3">'+
        '<p>You can use the mouse to play instruments by clicking on the piano keys.</p>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 4 -->'+
    '<script type="text/template" id="modal-view4-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Play with your keyboard!</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> You can also use your computer keyboard to play. Use the following keys:</p>'+
         '<img src="../img/help/piano-key-names.jpg" id="help-pg4">'+
         '<p>Change the octave by pressing Z for down, X for up.</p>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 5 -->'+
    '<script type="text/template" id="modal-view5-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Choose an instrument</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
      '<p> You can select a different instrument from the drop down menu</p>'+
      '<img src="../img/help/choose-instrument.jpg" id="help-pg5">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 6 -->'+
    '<script type="text/template" id="modal-view6-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Import Audio Files</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> Select Audio File from the instrument selector, then find a .wav or .mp3 audio file from your computer and drag and drop it into the box surrounded by a red border:</p>'+
        ' <img src="../img/help/drag-and-drop.jpg" id="help-pg6">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 7 -->'+
    '<script type="text/template" id="modal-view7-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Add more tracks</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> Click on the Add Track button to create an additional track. The active track has a green halo around it. Click anywhere on a track to make it the active track. To remove a track, click on the Trash icon in the upper right corner.</p>'+
        '<img src="../img/help/add-track.jpg" id="help-pg7">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 8 -->'+
    '<script type="text/template" id="modal-view8-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Transport controls</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> The transport time displays the current position. It displays the time as measures, beats and sixteenth note subdivisions. You can use the transport controls to move the current position. You can record notes to the active track when you press the red record button.</p>'+
        '<img src="../img/help/transport.jpg" id="help-pg8">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 9 -->'+
    '<script type="text/template" id="modal-view9-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Edit notes</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> After you’ve recorded a track, you can edit a note by clicking on it. When it’s selected it will turn yellow. You can move the note up and down. You can also delete the note by pressing the delete key on Windows or fn + delete on a Mac.</p>'+
        '<img src="../img/help/edit-note.jpg" id="help-pg9">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 10 -->'+
    '<script type="text/template" id="modal-view10-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Metronome</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p>The heartbeat icon represents the metronome. Click it to turn the metronome on or off.</p>'+
        '<img src="../img/help/metronome.jpg" id="help-pg10">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 11 -->'+
    '<script type="text/template" id="modal-view11-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">The tempo slider</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p>You can change the tempo of the instrument tracks by moving the tempo slider:</p>'+
        '<img src="../img/help/tempo.jpg" id="help-pg11">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 12 -->'+
    '<script type="text/template" id="modal-view12-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Export Song</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p> When you’re ready to save your song to your computer, click on the Export Song button. Choose a name for your song and click OK.</p>'+
        '<img src="../img/help/export.jpg" id="help-pg12">'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button done">Done</a>'+
      '</div>'+
    '</script>'
  ),

  render: function() {
    var tabViewTemplate = this.$el.append(this.template());
    return tabViewTemplate;
  },

  previousStep: function(e) {
    e.preventDefault();
    WO.modalView.previous();
  },

  nextStep: function(e) {
    e.preventDefault();
    WO.modalView.next();
  },

  render: function() {
    tabViewTemplate = this.$el.append(this.template());
    return tabViewTemplate;
  },

  openLandingModal: function() {
    var Modal = Backbone.Modal.extend({
      template: '#modal-template',
      viewContainer: '.my-container',
      submitEl: '.done',
      cancelEl: '.cancel',
      views: {
        'click #step1': {
          view: _.template($('#modal-view1-template').html())
        },
        'click #step2': {
          view: _.template($('#modal-view2-template').html())
        },
        'click #step3': {
          view: _.template($('#modal-view3-template').html())
        },
        'click #step4': {
          view: _.template($('#modal-view4-template').html())
        },
        'click #step5': {
          view: _.template($('#modal-view5-template').html())
        },
        'click #step6': {
          view: _.template($('#modal-view6-template').html())
        },
        'click #step7': {
          view: _.template($('#modal-view7-template').html())
        },
        'click #step8': {
          view: _.template($('#modal-view8-template').html())
        },
        'click #step9': {
          view: _.template($('#modal-view9-template').html())
        },
        'click #step10': {
          view: _.template($('#modal-view10-template').html())
        },
        'click #step11': {
          view: _.template($('#modal-view11-template').html())
        },
        'click #step12': {
          view: _.template($('#modal-view12-template').html())
        },
        'click #step8': {
          view: _.template($('#modal-view8-template').html())
        }
      }
    });
    
    WO.modalView = new Modal();
    $('.app').html(WO.modalView.render().el);
  }

});
