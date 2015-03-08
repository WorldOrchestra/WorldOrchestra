/* global describe, expect, it, transport */

(function () {
  'use strict';
  describe('The track view', function () {
    var appView;
    appView = new WO.WOView();
    appView.songView.collection.add(new WO.Track());

    describe('the mute button', function(){
      beforeEach(function() {
        var cid = appView.songView.collection.models[0].cid;
        $("." + cid + " .mute-track-button").click();
      });

      afterEach(function() {
        appView.songView.collection.at(0).set('isMuted', false);
        appView.songView.collection.at(0).set('volume', 0);
        appView.songView.collection.at(0).get('instrument').setVolume(0);
        $('.muted').removeClass('muted');
      });

      it("should toggle an indicator", function(){
        expect(appView.songView.collection.at(0).get('isMuted')).to.be.true;
      });

      it("should add a class muted", function(){
        expect($('.muted').length).to.equal(1);
      });

      it("should lower the volume", function(){
        expect(appView.songView.collection.at(0).get('volume')).to.equal(-50);
      });

      it("should mute only the selected track", function(){
        appView.songView.collection.add(new WO.Track());
        expect(appView.songView.collection.at(0).get('isMuted')).to.be.true;
        expect(appView.songView.collection.at(1).get('isMuted')).to.be.false;
      });

      it("should add a class muted", function(){
        expect($('.muted').length).to.equal(1);
      });

    });
  });
})();
