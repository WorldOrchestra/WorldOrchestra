var WO = WO || {};
WO.WOView = Backbone.View.extend({

    initialize: function(params){
        //this.playerView = new PlayerView({model: this.model.get('currentSong')});
        //this.libraryView = new LibraryView({collection: this.model.get('library')});
        //this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    },

    render: function(){
        return this.$el.html([
            //this.playerView.$el,
            //this.libraryView.$el,
            //this.songQueueView.$el
        ]);
    }

});
