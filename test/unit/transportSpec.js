/* global describe, it, transport, expect, sinon */

(function () {
  'use strict';
  var notes;
  describe('The transport', function () {
    describe('the view', function() {
      it('should have the transport buttons', function() {
        expect($('#rewind').prop('tagName')).to.equal('BUTTON');
        expect($('#skipBack').prop('tagName')).to.equal('BUTTON');
        expect($('#stop').prop('tagName')).to.equal('BUTTON');
        expect($('#play').prop('tagName')).to.equal('BUTTON');
        expect($('#record').prop('tagName')).to.equal('BUTTON');
        expect($('#skipForward').prop('tagName')).to.equal('BUTTON');
        expect($('#forward').prop('tagName')).to.equal('BUTTON');
      });
      it('should have a transport time node', function() {
        expect($('#transportTime')).not.to.be.undefined;
      });

    });

    describe('playback', function(){
      var notes, track, song, attack, release;
        notes = [ ["0:0:0", "C4", 1.00], ["1:0:1", "C4", 0.00] ];
        track = new WO.Track();
        track.set('notes', notes);
        song = new WO.Song([track]);

      beforeEach(function(){
        // acPiano =  WO.InstrumentFactory( "Acoustic Piano" );
        attack = sinon.spy(track.get("instrument"), 'triggerAttack');
        release = sinon.spy(track.get("instrument"), 'triggerRelease');
      });

      afterEach(function(){
        track.get("instrument").triggerAttack.restore();
        track.get("instrument").triggerRelease.restore();
      });

      it("should have a playTrack function", function(){
        expect(WO.transport.playSong).to.be.a('function');
      });

      xit("should play and stop one note", function(){
        WO.transport.playSong(song);
        
        WO.transport.stopTracks();       

        expect(attack.calledOnce).to.equal(false);
        expect(release.calledOnce).to.equal(false); 
      });

      xit("should play 1 note from 2 tracks", function(){
        var notes1 = [ ["0:0:1", "C4", 1.00], ["1:0:1", "C4", 0.00] ];
        var notes2 = [ ["0:0:3", "G4", 1.00], ["2:0:4", "G4", 0.00] ];
        var track1 = new WO.Track({notes: notes1});
        var track2 = new WO.Track({notes: notes2});
        var song = new WO.Song([track1, track2]);
        WO.transport.playSong(song);
 
        WO.transport.stopTracks();

        expect(attack.calledTwice).to.equal(true);
        expect(release.calledTwice).to.equal(true);
      });

      xit("should play a song with many notes", function(done) {
        var notes = [["5:0:2.8333333333333286","E3","0.83"],["5:1:0.4166666666666714","E3","0.00"],["5:1:1.9583333333333286","F3","0.80"],["5:1:2.375","F3","0.00"],["5:1:2.8333333333333286","G3","0.80"],["5:1:3.625","G3","0.00"],["5:2:1.0833333333333286","C4","0.85"],["6:0:2.0833333333333286","C4","0.00"],["6:0:2.8333333333333286","D3","0.83"],["6:0:3.8333333333333286","D3","0.00"],["6:1:1.9583333333333286","E3","0.80"],["6:1:2.375","E3","0.00"],["6:1:2.8333333333333286","F3","0.84"],["7:0:1.8333333333333286","F3","0.00"],["7:0:2.8333333333333286","G3","0.83"],["7:1:0.4166666666666714","G3","0.00"],["7:1:1.9583333333333286","A3","0.80"],["7:1:2.375","A3","0.00"],["7:1:2.8333333333333286","B3","0.81"],["7:1:3.625","B3","0.00"],["7:2:1.0833333333333286","F4","0.85"],["8:0:2.083333333333343","F4","0.00"],["8:0:2.833333333333343","A3","0.80"],["8:0:3.833333333333343","A3","0.00"],["8:1:1.9583333333333428","B3","0.83"],["8:1:2.375","B3","0.00"],["8:1:2.833333333333343","C4","0.87"],["8:2:0.8333333333333428","C4","0.00"],["8:2:2.833333333333343","D4","0.85"],["8:3:0.8333333333333428","D4","0.00"],["8:3:2.833333333333343","E4","0.83"],["9:0:1.8333333333333428","E4","0.00"],["9:0:2.833333333333343","E3","0.85"],["9:1:0.4166666666666572","E3","0.00"],["9:1:1.9583333333333428","F3","0.83"],["9:1:2.375","F3","0.00"],["9:1:2.833333333333343","G3","0.83"],["9:1:3.625","G3","0.00"],["9:2:1.0833333333333428","C4","0.86"],["10:0:2.083333333333343","C4","0.00"],["10:0:2.833333333333343","D4","0.88"],["10:0:3.833333333333343","D4","0.00"],["10:1:1.9583333333333428","E4","0.81"],["10:1:2.375","E4","0.00"],["10:1:2.833333333333343","F4","0.85"],["11:0:1.8333333333333428","F4","0.00"],["11:0:2.833333333333343","G3","0.83"],["11:0:3.833333333333343","G3","0.00"],["11:1:1.9583333333333428","G3","0.83"],["11:1:2.375","G3","0.00"],["11:1:2.833333333333343","F3","0.76"],["11:2:2.416666666666657","F3","0.00"],["11:2:2.833333333333343","G3","0.80"],["11:2:3.625","G3","0.00"],["11:3:1.9583333333333428","G3","0.83"],["11:3:2.375","G3","0.00"],["11:3:2.833333333333343","F3","0.78"],["12:0:2.416666666666657","F3","0.00"],["12:0:2.833333333333343","G3","0.77"],["12:0:3.625","G3","0.00"]];
        var track = new WO.Track({notes: notes});
        var song = new WO.Song([track]);
        WO.transport.playSong(song);
        done();
        WO.transport.stopTracks();

        expect(attack.callCount).to.equal(30);
        expect(release.callCount).to.equal(30); 
      });
    });
  });
})();
