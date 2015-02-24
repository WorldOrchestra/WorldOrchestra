WO = WO || {};
WO.signupView = Backbone.View.extend({

  initialize: function() {
  },

  events: {
    'submit' : 'submit',
    'click .open' : 'openModal'
  },

    template: _.template(

      '<div>'+
        '<button class="open">Sign Up</button>'+

        '<div class="app"></div>'+

        '<script type="text/template" id="modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<h3 class="bbm-modal__title">Sign Up</h3>'+
          '</div>'+
          '<div class="bbm-modal__section">'+
            '<p>Sign Up to join the WorldOrchestra.</p>'+
            '<div class="form-container site-width">'+
              '<form action="submit" method="post">'+
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
                  '<input type="submit" method="post" value="Sign up">'+
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
    loginTemplate = this.$el.append(this.template());
    return loginTemplate;
  },

  submit: function (e) {
     e.preventDefault();

     var newUsername = $(e.currentTarget).find('#username').val();
     var newPassword = $(e.currentTarget).find('#password').val();
     var newEmail = $(e.currentTarget).find('#email').val();

    $.ajax({
     type: 'POST',
     url: window.location + "signup",
     data: {name: newUsername,
            password: newPassword,
            email: newEmail},
     success: function(data) {
      console.log(data + " successful POST! YAY");
     },
       error: function(data){
        console.log(data);
         alert("error");
       }
    });
  },

  openModal: function(){
    var Modal = Backbone.Modal.extend({
      template: "#modal-template",
      cancelEl: ".bbm-button"
    });

    $(".open").on("click", function(){

      var modalView = new Modal();
      $(".app").html(modalView.render().el);

    });

  }

});
