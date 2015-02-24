WO = WO || {};
WO.loginView = Backbone.View.extend({

  initialize: function() {
  },

  events: {
    'submit' : 'loginUser',
    'click .open-login' : 'openModal'
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
              '<form action="/login" method="post">'+
                '<div>'+
                  '<input class="auth-input" type="text" id="username" name="username" placeholder="username">'+
                '</div>'+
                '<div>'+
                  '<input class="auth-input" type="password" id="password" name="password" placeholder="password">'+
                '</div>'+
                '<div>'+
                  '<input type="submit" value="Login">'+
                '</div>'+
              '</form>'+
          '</div>'+
          '<div class="bbm-modal__bottombar">'+
            '<a href="#" class="bbm-button">close</a>'+
          '</div>'+
        '</script>'+

      '</div>'
  ),

  render: function() {
    signupTemplate = this.$el.append(this.template());
    return signupTemplate;
  },

  loginUser: function (e) {
     e.preventDefault();

     var checkUsername = $(e.currentTarget).find('#username').val();
     var checkPassword = $(e.currentTarget).find('#password').val();

    $.ajax({
     type: 'POST',
     url: window.location + "login",
     data: {name: checkUsername,
            password: checkPassword},
     success: function(data) {
      console.log(data + " Successful Login!");
     },
       error: function(data){
        console.log(data);
         alert("error");
       }
    });
  },

  openModal: function(){
    var Modal = Backbone.Modal.extend({
      template: "#login-modal-template",
      cancelEl: ".bbm-button"
    });

    $(".open-login").on("click", function(){

      var modalView = new Modal();
      $(".app").html(modalView.render().el);

    });
  }

});