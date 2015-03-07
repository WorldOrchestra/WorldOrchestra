WO = WO || {};
WO.SignupView = Backbone.View.extend({

  initialize: function() {
    WO.vent.on('openSignupModal', this.openSignupModal, this);
  },

  events: {
    'submit .signupSubmit' : 'submitSignup'
  },

    template: _.template(

      '<div>'+
        '<div class="signupViewApp"></div>'+
        '<script type="text/template" id="signup-modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<h3 class="bbm-modal__title">Sign Up</h3>'+
          '</div>'+
          '<div class="bbm-modal__section">'+
            '<p>Sign Up to join the WorldOrchestra.</p>'+
            '<div class="form-container site-width">'+
              '<form class="signupSubmit" action="submit" method="post">'+
                '<div>'+
                  '<input class="auth-input" id="username" type="text" name="username" aria-labelledby="Username" placeholder="Your username">'+
                '</div>'+
                '<div>'+
                  '<input class="auth-input" id="password" type="password" name="password" aria-labelledby="Password" placeholder="Your password">'+
                '</div>'+
                '<div>'+
                  '<input class="auth-input" id="email" type="email" name="email" aria-labelledby="Email" placeholder="Your email address">'+
                '</div>'+
                '<div>'+
                  '<input class="signupSubmit" type="submit" method="post" value="Sign up">'+
                '</div>'+
              '</form>'+
          '</div>'+
          '<div class="bbm-modal__bottombar">'+
            '<a href="" class="bbm-button close-signup">close</a>'+
          '</div>'+
        '</script>'+
      '</div>'
  ),

  render: function() {
    signupTemplate = this.$el.append(this.template());
    return signupTemplate;
  },

  submitSignup: function (e) {
    e.preventDefault();

    var newUsername = $(e.currentTarget).find('#username').val();
    var newPassword = $(e.currentTarget).find('#password').val();
    var newEmail = $(e.currentTarget).find('#email').val();
     
    $.ajax({
      type: 'POST',
      url: window.location + "api/users",
      data: {
              username: newUsername,
              password: newPassword,
              email: newEmail
            },
      success: function(data) {
        console.log("successfully signed up");
        window.sessionStorage.user_id = data.user_id;
        $(".close-signup").click();
      },
      error: function(data){
        alert("error signing up!");
      }
    });
  },

  openSignupModal: function(){
    var signupModal = Backbone.Modal.extend({
      template: "#signup-modal-template",
      cancelEl: ".close-signup"
    });

    var signupModalView = new signupModal();
    $(".signupViewApp").html(signupModalView.render().el);
  }

});
