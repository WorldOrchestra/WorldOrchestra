var WO = WO || {};
WO.Song = Backbone.Collection.extend({
  model: WO.Track,

  settings : {
    tempo: 130,
    title: "untitled song",
    timeSignature: 4,
    length: 8,
    activeTrack: ""
  },

  initialize : function(){
    this.add( new WO.Track());
    this.settings.activeTrack = this.at(0);
    // WO.setTempo(this.settings.tempo);
  }

});
