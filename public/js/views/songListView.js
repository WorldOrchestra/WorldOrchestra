WO = WO || {};
WO.SongListView = Backbone.View.extend({

  initialize: function(){
    WO.vent.on('openSongListModal', this.openSongListModal, this);
  },

  events: {
    'click .songLink' : 'loadSong'
  },

    template: _.template(

      '<div>'+
        // '<button class="open-login">Login</button>'+
        '<div class="songListViewApp"></div>'+
        '<script type="text/template" id="songList-modal-template">'+
          '<div class="bbm-modal__topbar">'+
            '<h3 class="bbm-modal__title">songList</h3>'+
          '</div>'+
          '<div class="bbm-modal__section">'+
            '<div id=userSongDropdown">'+
              '<ul id="user-song-list">'+
              '</ul>'+
            '</div>'+
          '<div class="bbm-modal__bottombar">'+
            '<a href="" class="bbm-button close-songList">close</a>'+
          '</div>'+
        '</script>'+
      '</div>'
  ),

  render: function() {
    var songListTemplate = this.$el.append(this.template());
    return songListTemplate;
  },

  openSongListModal: function(){
    var songListModal = Backbone.Modal.extend({
      template: "#songList-modal-template",
      cancelEl: ".close-songList"
    });

    var songListModalView = new songListModal();
    $(".songListViewApp").html(songListModalView.render().el);

    $(document).ready(function(){
      $.ajax({
        type: "GET",
        url: window.location + "api/songs",
      })
        .done(function(data){
          $("#user-song-list").html("");
          for( var key in data){
            $("#user-song-list").append("<li class='songLink' data-value='" + data[key]._id + "'><a href=''>" + data[key].title + "</a></li>");
          }
        });
    });
  },

  loadSong: function(e){
    e.preventDefault();
    $('.close-songList').click();
    var songId = $($(e.currentTarget)[0]).data('value');
    $(e.currentTarget)[0].blur();
    WO.appView.songView.collection.fetch(songId);
  }

});
