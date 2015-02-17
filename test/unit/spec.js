describe('WorldOrchestra framework', function() {
  describe('Track model', function() {
    it('should contain a track model', function() {
      expect(typeof WO.Track).to.be('function');
    });
  });

  describe('Song collection', function() {
    it('should contain a song collection', function() {
      expect(typeof WO.Song).to.be('function');
    });
    it('should be able to add a track', function() {
      var song = new WO.Song();
      song.add(new WO.Track());
      expect(song.at(0) instanceof WO.Track).to.equal(true);
    });
  });

  describe('The main application', function() {
    it('should contain a container named WO', function() {
      expect(typeof WO).to.be('object');
    });
    it('should have a master model', function() {
        expect(WO.WOModel).not.to.be(undefined);
    });
    it('should have a master view', function() {
      expect(WO.WOView).not.to.be(undefined);
    });
  });
});
