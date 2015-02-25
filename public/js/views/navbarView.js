WO = WO || {};
WO.navbarView = Backbone.View.extend({

  initialize: function() {
  },

  events: {

  },

    template: _.template(

      '<div id="navbar">'+
      '<ul>'+
         '<li class="active"><a href="index.html"><span>WorldOrchestra</span></a></li>'+
         '<li><a href="#"><span>Songs</span></a></li>'+
         '<li><a href="#"><span>Sign Up</span></a></li>'+
         '<li class="last"><a href="#"><span>Login</span></a></li>'+
      '</ul>'+
      '</div>'
  ),

  render: function() {
    navbarTemplate = this.$el.append(this.template());
    return navbarTemplate;
  },

});