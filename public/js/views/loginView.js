WO = WO || {};
WO.loginView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'submit' : 'loginUser'
  },

    template: _.template(

      '<div>'+
        '<a href="#" class="open">Open modal</a>'+

        '<div class="app"></div>'+

        '<script type="text/template" id="modal-template">'+
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

        '<script>'+
        'jQuery(function($) {'+

          'var Modal = Backbone.Modal.extend({'+
            'template: "#modal-template",'+
            'cancelEl: ".bbm-button"'+
          '});'+


          '$(".open").on("click", function(){'+

            'var modalView = new Modal();'+
            '$(".app").html(modalView.render().el);'+

          '});'+

          '$(".open").click()'+
        '});'+
        '</script>'+

      '</div>'
  ),

  render: function() {
    loginTemplate = this.$el.append(this.template());
    return loginTemplate;
  },

  loginUser: function(e){
    e && e.preventDefault();
    var userData = {
      username: this.$el.find('form #username').val(),
      password: this.$el.find('form #password').val()
    };
    new User(userData).login(JSON.stringify(userData), this.router);
  }

});