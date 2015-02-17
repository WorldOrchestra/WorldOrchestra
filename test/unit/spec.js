describe('WorldOrchestra framework', function() {
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

  describe('The main model', function() {
    it('should do something', function() {
      expect(false).to.equal(true);
    });
  });

  describe('The main view', function() {
    it('should have a song view', function() {
      expect(false).to.equal(true);
    });
    it('should have a transport view', function() {
      expect(false).to.equal(true);
    });
    it('should have a userInput view', function() {
      expect(false).to.equal(true);
    });
  });

  describe('The userInput view', function() {
    it('should exist', function() {
      expect(false).to.equal(true);
    });
    it('should display a instrument', function() {
      expect(false).to.equal(true);
    });
    it('should display toggle buttons for instrument', function() {
      expect(false).to.equal(true);
    });
  });

  describe('The transport view', function() {
    it('should have a forward button', function() {
      expect(false).to.equal(true);
    });
    it('should have a back button', function() {
      expect(false).to.equal(true);
    });
    it('should have a play button', function() {
      expect(false).to.equal(true);
    });
    it('should have a stop button', function() {
      expect(false).to.equal(true);
    });
    it('should have a record button', function() {
      expect(false).to.equal(true);
    });
  });

  describe('Song collection', function() {
    it('should be a Backbone collection', function() {
      expect(typeof WO.Song).to.be('function');
    });
    it('should be able to add a track', function() {
      var song = new WO.Song();
      song.add(new WO.Track());
      expect(song.at(0) instanceof WO.Track).to.equal(true);
    });
  });

  describe('Track model', function() {
    it('should be a Backbone model', function() {
      expect(typeof WO.Track).to.be('function');
    });
  });
});
