/* global describe, it, transport */

(function () {
  'use strict';
  var notes;
  describe('Track Model', function () {
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
    });


    xdescribe('playback', function(){
      it("should record played notes", function(){
        expect(false).to.equal(true);
      });
    });    
  });
})();
