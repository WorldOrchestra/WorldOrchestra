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
            $("#user-song-dropdown-list").append("<option value='" + data[key].title +"'>" + data[key].title + "</option>");
            console.log(data[key].title);
          }
        });
    });
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
        '<li>'+
          '<div id=userSongDropdown">'+
            '<select id="user-song-dropdown-list">'+
            '</select>'+
          '</div>'+
        '</li>'+
      '</ul>'+
      '</div>'
  ),

  render: function() {
    navbarTemplate = this.$el.append(this.template());
    return navbarTemplate;
  },

});