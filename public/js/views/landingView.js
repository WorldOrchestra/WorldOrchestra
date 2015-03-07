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
        '<h3 class="bbm-modal__title">Welcome to the band!</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
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
        '<h3 class="bbm-modal__title">Let us show you around...</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p>This is the second step of the wizard.</p>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 3 -->'+
    '<script type="text/template" id="modal-view3-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Check out the instruments...</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p>This is the third step of the wizard.</p>'+
      '</div>'+
      '<div class="bbm-modal__bottombar">'+
        '<a href="" class="bbm-button previous">Previous</a>'+
        '<a href="" class="bbm-button next">Next</a>'+
      '</div>'+
    '</script>'+
    '<!-- Step 4 -->'+
    '<script type="text/template" id="modal-view4-template">'+
      '<div class="bbm-modal__topbar">'+
        '<h3 class="bbm-modal__title">Share your song!</h3>'+
      '</div>'+
      '<div class="bbm-modal__section">'+
        '<p>And finally, the last step!</p>'+
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
        }
      }
    });
    
    WO.modalView = new Modal();
    $('.app').html(WO.modalView.render().el);
  }

});
