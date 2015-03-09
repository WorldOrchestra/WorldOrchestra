WO = WO || {};
WO.LoginView = Backbone.View.extend({

  initialize: function(){
    WO.vent.on('openLoginModal', this.openLoginModal, this);
  },

  events: {
    'submit .loginSubmit' : 'loginUser',
    'submit .signupSubmit' : 'submitSignup'
  },

    template: _.template(

      '<div>'+
        '<div class="loginViewApp"></div>'+
        '<script type="text/template" id="login-modal-template">'+
            '<div class="bbm-modal__topbar">'+
              '<ul>'+
                '<li class="bbm-modal__tab"><a href="#" id="tab1" class="active">Login</a></li>'+
                '<li class="bbm-modal__tab"><a href="#" id="tab2">Sign Up</a></li>'+
              '</ul>'+
            '</div>'+
            '<div class="my-tab-container"></div>'+
            '<div class="bbm-modal__bottombar">'+
              '<a href="#" class="bbm-button close-login close-signup">Done</a>'+
            '</div>'+
          '</script>'+
          '<!-- Tab 1 -->'+
          '<script type="text/template" id="modal-view1-tab-template">'+
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
            '<div class="login-error-div"> </div>'+
            '</div>'+
          '</script>'+
          '<!-- Tab 2 -->'+
          '<script type="text/template" id="modal-view2-tab-template">'+
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
              '<div class="signup-error-div"> </div>'+
            '</div>'+
          '</script>'
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
        if( data.error){
          delete window.localStorage.WO_isLoggedIn;
          $('.login-error-div').children().remove();
          $('.login-error-div').append('<p>' + data.error + '</p>');
        }else{
          console.log("Successful Login!");
          window.localStorage.WO_isLoggedIn = "true";
          // window.sessionStorage.WO_user_id = data.user_id;
          // window.sessionStorage.WO_user_id = 'loggedIn';
          $(".close-login").click();
        }
      },
      error: function(data){
        console.log(data);
        alert("error");
      }
    });
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
        if( data.error){
          delete window.sessionStorage.WO_user_id;
          $('.signup-error-div').children().remove();
          $('.signup-error-div').append('<p>' + data.error + '</p>');
        }else{
          console.log("Successfully signed up");
          window.sessionStorage.WO_user_id = data.user_id;
          $(".close-signup").click();
        }
      },
      error: function(data){
        alert("error signing up!");
      }
    });
  },

  openLoginModal: function(){
    var loginModal = Backbone.Modal.extend({
      template: _.template($('#login-modal-template').html()),
      viewContainer: '.my-tab-container',
      submitEl: '.bbm-button',
      views: {
        'click #tab1': {
          name: 'tab1',
          view: _.template($('#modal-view1-tab-template').html()),
          onActive: 'setActive'
        },
        'click #tab2': {
          name: 'tab2',
          view: _.template($('#modal-view2-tab-template').html()),
          onActive: 'setActive'
        }
      },
      setActive: function(options) {
          this.$('.bbm-modal__tab a').removeClass('active');
          this.$('#'+options.name).addClass('active');
        }
    });

    var loginModalView = new loginModal({name: 'tab1'});
    $(".loginViewApp").html(loginModalView.render().el);
  }

});
