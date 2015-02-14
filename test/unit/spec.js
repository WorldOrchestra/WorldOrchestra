describe('Backbone app', function() {
  var track;
  var song;

  describe('Track model', function() {
    beforeEach(function() {
      track = new WO.Track();
    });

    it('should contain a track model', function() {
      expect(track).to.be.an("object");
    });
  });

  describe('Song collection', function() {
    beforeEach(function() {
      track = new WO.Track();
      song = new WO.Song();
    });

      it('should contain a song collection', function() {
          expect(song).to.be.an("object");
      });

    it('should be able to add a track', function() {
       song.add(new WO.Track());
      expect(song.at(0) instanceof WO.Track).to.equal(true);
    });
  });
});
