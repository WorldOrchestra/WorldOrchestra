/* global describe, it, transport */

(function () {
  'use strict';
  describe('Track Model', function () {
      var notes;
    describe('track', function(){
      notes = [ ["0:0:0", "C4", 1.00], ["0:0:1", "C4", 0.00] ];
      var track = new WO.Track({notes: notes});

      it("should save note data", function(){
        expect(track.get("notes")).to.equal(notes);
      });

      it("should have a title attribute", function() {
        expect(track.get("title")).to.not.be.undefined;
      });

      it("should have an instrument attribute", function() {
        track.set('instrument', 'acousticDrums');
        expect(track.get('instrument')).to.equal('acousticDrums');
      });
      it("should have an isMuted attribute", function() {
        expect(track.get('isMuted')).to.equal(false);
        track.set("isMuted", true);
        expect(track.get('isMuted')).to.equal(true);
      });
      it("should have a solo attribute", function() {
        expect(track.get('solo')).to.equal(false);
        track.set("solo", true);
        expect(track.get('solo')).to.equal(true);
      });

    });


    xdescribe('playback', function(){
      it("should record played notes", function(){
        expect(false).to.equal(true);
      });
    });
  });
})();
