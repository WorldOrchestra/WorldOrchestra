WO = WO || {};
WO.tabView = Backbone.View.extend({

  initialize: function() {
  },

  events: {
    'submit .signupSubmit' : 'submitSignup',
    'click .open' : 'openModal'
  },

    template: _.template(

      '<a href="#" class="open">Open modal</a>'+

        '<div class="app"></div>'+

        '<!-- The modal structure, with an container element that will contain all tabs -->'+
        '<script type="text/template" id="modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<ul>'+
              '<li class="bbm-modal__tab"><a href="#" id="tab1" class="active">Login</a></li>'+
              '<li class="bbm-modal__tab"><a href="#" id="tab2">Sign Up</a></li>'+
            '</ul>'+
          '</div>'+

          '<div class="my-container"></div>'+
          '<div class="bbm-modal__bottombar">'+
            '<a href="#" class="bbm-button">Done</a>'+
          '</div>'+
        '</script>'+

        '<!-- Tab 1 -->'+
        '<script type="text/template" id="modal-view1-template">'+
          '<div class="bbm-modal__section">'+
            '<h3>Tab based example</h3>'+
            '<p>It\'s also really easy to create a modal with seperate views that you can control using tabs.</p>'+
            '<p>We\'re also using a default style, but you can overwrite anything you want.</p>'+
          '</div>'+
        '</script>'+

        '<!-- Tab 2 -->'+
        '<script type="text/template" id="modal-view2-template">'+
          '<div class="bbm-modal__section">'+
            'Your account details'+
          '</div>'+
        '</script>'+

        '<script>'+
          'jQuery(function($) {'+
            '// Create a modal view class'+
            'var Modal = Backbone.Modal.extend({'+
              'template: _.template($("#modal-template").html()),'+
              'viewContainer: ".my-container",'+
              'submitEl: ".bbm-button",'+
              'views: {'+
                '"click #tab1": {'+
                  'name: "tab1",'+
                  'view: _.template($("#modal-view1-template").html()),'+
                  'onActive: "setActive"'+
                '},'+
                '"click #tab2": {'+
                  'name: "tab2",'+
                  'view: _.template($("#modal-view2-template").html()),'+
                  'onActive: "setActive"'+
                '}'+
              '},'+
              '// views: [{'+
              '//   name: "tab1",'+
              '//   view: _.template($("#modal-view1-template").html()),'+
              '//   onActive: "setActive"'+
              '// },{'+
              '//   name: "tab2",'+
              '//   view: _.template($("#modal-view2-template").html()),'+
              '//   onActive: "setActive"'+
              '// }],'+
              'setActive: function(options) {'+
                'this.$(".bbm-modal__tab a").removeClass("active");'+
                'this.$("#"+options.name).addClass("active");'+
              '}'+
            '});'+
            '$(".open").on("click", function(){'+
              '// Render an instance of your modal'+
              'var modalView = new Modal({name: "tab2"});'+
              '$(".app").html(modalView.render().el);'+
            '});'+
            '$(".open").click()'+
          '});'+
        '</script>'
  ),

  render: function() {
    tabTemplate = this.$el.append(this.template());
    return tabTemplate;
  },

  submitSignup: function (e) {
    e.preventDefault();

    var newUsername = $(e.currentTarget).find('#username').val();
    var newPassword = $(e.currentTarget).find('#password').val();
    var newEmail = $(e.currentTarget).find('#email').val();
     
    $.ajax({
      type: 'POST',
      url: window.location + "signup",
      data: {
              username: newUsername,
              password: newPassword,
              email: newEmail
            },
      success: function(data) {
        console.log("successfully signed up");
        window.sessionStorage.user_id = data.user_id;
        $(".close-signup").click();
        $(".open-login").click();
      },
      error: function(data){
        alert("error signing up!");
      }
    });
  },

  openModal: function(){
    var Modal = Backbone.Modal.extend({
      template: "#modal-template",
      cancelEl: ".bbm-button"
    });

    var modalView = new Modal();
    $(".app").html(modalView.render().el);
  }

});
