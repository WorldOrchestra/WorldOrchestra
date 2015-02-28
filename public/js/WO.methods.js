var WO = WO || {};

WO.methods = {
  recordNotes: function(note, time, velocity){
    var notes, song;
    song = WO.appView.songView.collection;
    notes = song.settings.activeTrack.attributes.notes;
    notes.push([time, note, velocity]);
    song.settings.activeTrack.get('mRender').showTrack(notes);
  }
};

