WO = WO || {};
WO.navbarView = Backbone.View.extend({

  initialize: function() {
  },

  events: {
    'change #user-song-dropdown-list' : 'loadSong',
    'click .open-login'    : 'triggerLogin',
    'click .open-signup'   : 'triggerSignup',
    'click .open-songList' : 'triggerSongList',
    'click .open-landing'  : 'triggerLanding'
  },

  template: _.template(

    '<div id="navbar">'+
    '<ul>'+
      '<li class="active"><a href="index.html"><span>WorldOrchestra</span></a></li>'+
      '<li class="open-songList"><a><span>Songs</span></a></li>'+
      '<li class="open-signup"><a><span>Sign Up</span></a></li>'+
      '<li class="open-login"><a><span>Login</span></a></li>'+
      '<li style="float:right"><a class="open-landing">help</a></li>'+
    '</ul>'+
    '</div>'
  ),

  render: function() {
    navbarTemplate = this.$el.append(this.template());
    return navbarTemplate;
  },

  triggerLogin: function(){
    WO.vent.trigger('openLoginModal');
  },

  triggerSignup: function(){
    WO.vent.trigger('openSignupModal');
  },

  triggerSongList: function(){
    WO.vent.trigger('openSongListModal');
  },

  triggerLanding: function(){
    WO.vent.trigger('openLandingModal');
  }

});