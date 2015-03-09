WO = WO || {};
WO.navbarView = Backbone.View.extend({

  initialize: function() {
    $(function(){
      $('.song-title').text(WO.appView.songView.collection.settings.title);
    })
  },

  events: {
    'change #user-song-dropdown-list' : 'loadSong',
    'click .open-login'    : 'triggerLogin',
    'click .open-songList' : 'triggerSongList',
    'click .open-landing'  : 'triggerLanding'
  },

  template: _.template(

    '<div id="navbar">'+
    '<ul>'+
      '<li class="active"><a><span>WorldOrchestra</span></a></li>'+
      '<li class="open-songList"><a><span>Songs</span></a></li>'+
      '<li style="left:50%;position:absolute;margin-left:-150px;"><a class="song-title" style="width: 300px"></a></li>'+
      '<li style="float:right"><a class="open-landing">help</a></li>'+
      '<li style="float:right"class="open-login"><a><span>Login</span></a></li>'+
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

  triggerSongList: function(){
    WO.vent.trigger('openSongListModal');
  },

  triggerLanding: function(){
    WO.vent.trigger('openLandingModal');
  }

});