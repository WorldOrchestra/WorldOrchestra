/* global describe, it */

(function () {
  'use strict';

  describe('Song Collection', function () {
    describe('Song initialization', function(){
      var track = new WO.Track(); 
      var song = new WO.Song();

      it('should be defined', function () {
        expect(song).to.be.an('object');
      });
      it("should have a default tempo", function() {
        expect(song.settings.tempo).to.equal(120);
        
      });
      it("should have a default title", function() {
        expect(song.settings.title).to.equal("untitled song");
      });
      it("should have a default time signature", function(){
        expect(song.settings.timeSignature).to.equal(4);
      })
    });
  });
})();
