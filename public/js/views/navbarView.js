WO = WO || {};
WO.navbarView = Backbone.View.extend({

  initialize: function() {
    $(document).ready(function(){
      $.ajax({
        type: "GET",
        url: window.location + "api/songs",
      })
        .done(function(data){
          $("#user-song-dropdown-list").html("");
          $("#user-song-dropdown-list").append("<option >My Songs</option>");
          for( var key in data){
            $("#user-song-dropdown-list").append("<option value='" + data[key]._id +"'>" + data[key].title + "</option>");
          }
        });
    });
  },

  events: {
    'change #user-song-dropdown-list' : 'loadSong',
    'click .open-login'   : 'triggerLogin',
    'click .open-signup'  : 'triggerSignup',
    'click .open-landing' : 'triggerLanding'
  },

  template: _.template(

    '<div id="navbar">'+
    '<ul>'+
      '<li class="active"><a href="index.html"><span>WorldOrchestra</span></a></li>'+
      '<li><a href=""><span>Songs</span></a></li>'+
      '<li class="open-signup"><a><span>Sign Up</span></a></li>'+
      '<li class="open-login"><a><span>Login</span></a></li>'+
      '<li>'+
        '<div id=userSongDropdown">'+
          '<select id="user-song-dropdown-list">'+
          '</select>'+
        '</div>'+
      '</li>'+
      '<li style="float:right"><a class="open-landing">help</a></li>'+
    '</ul>'+
    '</div>'
  ),

  render: function() {
    navbarTemplate = this.$el.append(this.template());
    return navbarTemplate;
  },

  loadSong: function(e){
    var songId = $(e.currentTarget)[0].value;
    $(e.currentTarget)[0].blur();
    WO.appView.songView.collection.fetch(songId);
  },

  triggerLogin: function(){
    WO.vent.trigger('openLoginModal');
  },

  triggerSignup: function(){
    WO.vent.trigger('openSignupModal');
  },

  triggerLanding: function(){
    WO.vent.trigger('openLandingModal');
  }

});