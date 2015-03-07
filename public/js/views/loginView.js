WO = WO || {};
WO.LoginView = Backbone.View.extend({

  initialize: function(){
    WO.vent.on('openLoginModal', this.openLoginModal, this);
  },

  events: {
    'submit .loginSubmit' : 'loginUser'
  },

    template: _.template(

      '<div>'+
        // '<button class="open-login">Login</button>'+
        '<div class="loginViewApp"></div>'+
        '<script type="text/template" id="login-modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<h3 class="bbm-modal__title">Login</h3>'+
          '</div>'+
          '<div class="bbm-modal__section">'+
            '<p>Login to access and save your songs.</p>'+
            '<div class="form-container site-width">'+
              '<form class="loginSubmit" action="submit" method="post">'+
                '<div>'+
                  '<input class="auth-input" type="text" id="loginUsername" name="username" placeholder="username">'+
                '</div>'+
                '<div>'+
                  '<input class="auth-input" type="password" id="loginPassword" name="password" placeholder="password">'+
                '</div>'+
                '<div>'+
                  '<input class="loginSubmit" type="submit" method="post" value="Login">'+
                '</div>'+
              '</form>'+
          '</div>'+
          '<div class="bbm-modal__bottombar">'+
            '<a href="" class="bbm-button close-login">close</a>'+
          '</div>'+
        '</script>'+
      '</div>'
  ),

  render: function() {
    var loginTemplate = this.$el.append(this.template());
    return loginTemplate;
  },

  loginUser: function (e) {
    e.preventDefault();

    var checkUsername = $(e.currentTarget).find('#loginUsername').val();
    var checkPassword = $(e.currentTarget).find('#loginPassword').val();

    $.ajax({
      type: 'POST',
      url: window.location + "api/users/login",
      data: {
            username: checkUsername,
            password: checkPassword
      },
      success: function(data) {
        // console.log(data);
        console.log("Successful Login!");
        $(".close-login").click();

      },
      error: function(data){
        console.log(data);
        alert("error");
      }
    });
  },

  openLoginModal: function(){
    var loginModal = Backbone.Modal.extend({
      template: "#login-modal-template",
      cancelEl: ".close-login"
    });

    var loginModalView = new loginModal();
    $(".loginViewApp").html(loginModalView.render().el);
  }

});
