var WO = WO || {};
WO.SongView = Backbone.View.extend({
  //tagname: "",
  //className: 'songView',
  //events: {},
  initialize: function(params) {
    this.render();
  },
  render: function() {
    return this.$el;
  }
});
