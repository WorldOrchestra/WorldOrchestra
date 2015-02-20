var WO = WO || {};
WO.Song = Backbone.Collection.extend({
  model: WO.Track,
  
  settings : {
    tempo: 120,
    title: "untitled song",
    timeSignature: 4,
    length: "16:0:0"
  }

});
