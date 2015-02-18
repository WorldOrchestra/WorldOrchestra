describe('WorldOrchestra framework', function() {
  describe('The main application', function() {
    it('should have a container named WO', function() {
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
    it('should have a method initialize', function() {
      expect(typeof WO.appModel.initialize).to.be('function');
    });
    it('should do something', function() {
      expect(false).to.equal(true);
    });
  });

  describe('The main view', function() {
    it('should have a song view', function() {
      expect(WO.appView.songView).not.to.be(undefined);
    });
    it('should have a transport view', function() {
      expect(WO.appView.transportView).not.to.be(undefined);
      expect($('.transportView').prop('tagName')).to.be('DIV');
    });
    it('should have a userInput view', function() {
      expect(WO.appView.userInputView).not.to.be(undefined);
    });
    it('should have a initialize method', function() {
      expect(typeof WO.appView.initialize).to.be('function');
    });
    it('should have a render method', function() {
      expect(typeof WO.appView.render).to.be('function');
    });
  });

  describe('The userInput view', function() {
    it('should have tabs for different instruments/views', function() {
        expect(false).to.equal(true);
    });
    it('should display a instrument', function() {
      expect(false).to.equal(true);
    });
    it('should display toggle buttons for instrument', function() {
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
