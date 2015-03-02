WO = WO || {};
WO.loginView = Backbone.View.extend({

  initialize: function() {
  },

  events: {
    'click .loginSubmit' : 'loginUser',
    'click .open-login' : 'openLoginModal'
  },

    template: _.template(

      '<div>'+
        '<button class="open-login">Login</button>'+

        '<div class="app"></div>'+

        '<script type="text/template" id="login-modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<h3 class="bbm-modal__title">Login</h3>'+
          '</div>'+
          '<div class="bbm-modal__section">'+
            '<p>Login to access and save your songs.</p>'+
            '<div class="form-container site-width">'+
              '<form class="loginSubmit"'+
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
            '<a href="#" class="bbm-button close-login">close</a>'+
          '</div>'+
        '</script>'+
      '</div>'
  ),

  render: function() {
    loginTemplate = this.$el.append(this.template());
    return loginTemplate;
  },

  loginUser: function (e) {
     e.preventDefault();
    console.log("calling function loginUser");
    debugger;

     var checkUsername = $(e.currentTarget).find('#loginUsername').val();
     var checkPassword = $(e.currentTarget).find('#loginPassword').val();

    $.ajax({
      type: 'POST',
      url: window.location + "login",
      data: {
            username: checkUsername,
            password: checkPassword
      },
      success: function(data) {
        console.log(data);
        console.log("Successful Login!");
        $(".close-login").click;

      },
      error: function(data){
        console.log(data);
        alert("error");
      }
    });
  },

  openLoginModal: function(){
    var Modal = Backbone.Modal.extend({
      template: "#login-modal-template",
      cancelEl: ".bbm-button"
    });

    var modalView = new Modal();
    $(".app").html(modalView.render().el);
  }

});
