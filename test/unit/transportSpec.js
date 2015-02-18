/* global describe, it, transport */

(function () {
  'use strict';
  var notes;
  describe('The transport', function () {
    describe('the view', function() {
      it('should have the transport buttons', function() {
        expect($('#rewind').prop('tagName')).to.be('BUTTON');
        expect($('#skipBack').prop('tagName')).to.be('BUTTON');
        expect($('#stop').prop('tagName')).to.be('BUTTON');
        expect($('#play').prop('tagName')).to.be('BUTTON');
        expect($('#record').prop('tagName')).to.be('BUTTON');
        expect($('#skipForward').prop('tagName')).to.be('BUTTON');
        expect($('#forward').prop('tagName')).to.be('BUTTON');
      });
      it('should have a transport time node', function() {
        expect($('#transportTime').length).not.to.be(0);
      });
      it('should have an octave button', function() {
        expect($('.octave').prop('tagName')).to.be('BUTTON');
      });
      describe('the keys', function() {
        it('should have the note buttons', function() {
          expect($('#C4').prop('tagName')).to.be('BUTTON');
          expect($('#Db4').prop('tagName')).to.be('BUTTON');
          expect($('#D4').prop('tagName')).to.be('BUTTON');
          expect($('#Eb4').prop('tagName')).to.be('BUTTON');
          expect($('#E4').prop('tagName')).to.be('BUTTON');
          expect($('#F4').prop('tagName')).to.be('BUTTON');
          expect($('#Gb4').prop('tagName')).to.be('BUTTON');
          expect($('#G4').prop('tagName')).to.be('BUTTON');
          expect($('#Ab4').prop('tagName')).to.be('BUTTON');
          expect($('#A4').prop('tagName')).to.be('BUTTON');
          expect($('#Bb4').prop('tagName')).to.be('BUTTON');
          expect($('#B4').prop('tagName')).to.be('BUTTON');
          expect($('#C5').prop('tagName')).to.be('BUTTON');
          expect($('#Db5').prop('tagName')).to.be('BUTTON');
          expect($('#D5').prop('tagName')).to.be('BUTTON');
          expect($('#Eb5').prop('tagName')).to.be('BUTTON');
          expect($('#E5').prop('tagName')).to.be('BUTTON');
          expect($('#F5').prop('tagName')).to.be('BUTTON');
        });
        it('should have black keys', function() {
          expect($('#Db4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Eb4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Gb4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Ab4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Bb4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Db4').css('background-color')).to.be('rgb(0, 0, 0)');
          expect($('#Eb4').css('background-color')).to.be('rgb(0, 0, 0)');
        })
      });
    });
    xdescribe('recording', function(){
      it("should record played notes", function(){
        notes = [ ["0:0:0", "C4", 1.00], ["0:0:1", "C4", 0.00] ];
        expect(false).to.equal(true);
      });
    });
    describe('playback', function(){
      var notes, track, song, attack, release;

      beforeEach(function(){
        notes = [ ["0:0:0", "C4", 1.00], ["1:0:1", "C4", 0.00] ];
        track = new WO.Track({notes: notes, instrument: acousticPiano});
        song = new WO.Song([track]);
        attack = sinon.spy(track.get("instrument"), 'triggerAttack');
        release = sinon.spy(track.get("instrument"), 'triggerRelease');
      });

      afterEach(function(){
        instrument.triggerAttack.restore();
        instrument.triggerRelease.restore();
      });

      it("should have a playTrack function", function(){
        expect(playSong).to.be.a("function");
      });
      it("should play and stop one note", function(done){
        // var notes = [ ["0:0:0", "C4", 1.00], ["1:0:1", "C4", 0.00] ];
        // var track = new WO.Track({notes: notes, instrument: acousticPiano});
        // var song = new WO.Song([track]);
        // var attack = sinon.spy(track.get("instrument"), 'triggerAttack');
        // var release = sinon.spy(track.get("instrument"), 'triggerRelease');

        playSong(song);
        
        done();

        expect(attack.calledOnce).to.equal(true);
        expect(release.calledOnce).to.equal(true);        
      });
      it("should play 1 note from 2 tracks", function(done){
        var notes1 = [ ["0:0:1", "C4", 1.00], ["1:0:1", "C4", 0.00] ];
        var notes2 = [ ["0:0:3", "G4", 1.00], ["2:0:4", "G4", 0.00] ];
        var track1 = new WO.Track({notes: notes1, instrument: acousticPiano});
        var track2 = new WO.Track({notes: notes2, instrument: acousticPiano});
        var song = new WO.Song([track1, track2]);
        playSong(song);
        done();
        expect(attack.calledTwice).to.equal(true);
        expect(release.calledTwice).to.equal(true);
      });

      it("should play a song with 2 tracks", function(done) {
        var notes1 = [["1:1:0.7916666666666679","G2","0.54"],["1:1:0.7916666666666679","E2","0.59"],["1:1:1.4583333333333321","E2","0.00"],["1:1:1.4583333333333321","G2","0.00"],["1:2:2.791666666666668","G2","0.54"],["1:2:2.791666666666668","E2","0.57"],["1:2:3.458333333333332","E2","0.00"],["1:2:3.458333333333332","G2","0.00"],["1:2:3.791666666666668","G2","0.46"],["1:2:3.791666666666668","E2","0.47"],["1:3:0.45833333333333215","E2","0.00"],["1:3:0.45833333333333215","G2","0.00"],["1:3:0.7916666666666679","G2","0.50"],["1:3:0.7916666666666679","E2","0.52"],["1:3:1.4583333333333321","E2","0.00"],["1:3:1.4583333333333321","G2","0.00"],["2:1:0.7916666666666643","G2","0.54"],["2:1:0.7916666666666643","E2","0.59"],["2:1:1.4583333333333357","E2","0.00"],["2:1:1.4583333333333357","G2","0.00"],["2:2:2.7916666666666643","G2","0.54"],["2:2:2.7916666666666643","E2","0.57"],["2:2:3.4583333333333357","E2","0.00"],["2:2:3.4583333333333357","G2","0.00"],["2:2:3.7916666666666643","G2","0.46"],["2:2:3.7916666666666643","E2","0.47"],["2:3:0.4583333333333357","E2","0.00"],["2:3:0.4583333333333357","G2","0.00"],["2:3:0.7916666666666643","G2","0.54"],["2:3:0.7916666666666643","E2","0.57"],["2:3:1.4583333333333357","E2","0.00"],["2:3:1.4583333333333357","G2","0.00"],["2:3:1.7916666666666643","G2","0.46"],["2:3:1.7916666666666643","E2","0.47"],["2:3:2.4583333333333357","E2","0.00"],["2:3:2.4583333333333357","G2","0.00"],["3:1:0.7916666666666643","G2","0.54"],["3:1:0.7916666666666643","E2","0.59"],["3:1:1.4583333333333357","E2","0.00"],["3:1:1.4583333333333357","G2","0.00"],["3:2:2.7916666666666643","G2","0.54"],["3:2:2.7916666666666643","E2","0.57"]];
        var notes2 = [["5:0:2.8333333333333286","E3","0.83"],["5:1:0.4166666666666714","E3","0.00"],["5:1:1.9583333333333286","F3","0.80"],["5:1:2.375","F3","0.00"],["5:1:2.8333333333333286","G3","0.80"],["5:1:3.625","G3","0.00"],["5:2:1.0833333333333286","C4","0.85"],["6:0:2.0833333333333286","C4","0.00"],["6:0:2.8333333333333286","D3","0.83"],["6:0:3.8333333333333286","D3","0.00"],["6:1:1.9583333333333286","E3","0.80"],["6:1:2.375","E3","0.00"],["6:1:2.8333333333333286","F3","0.84"],["7:0:1.8333333333333286","F3","0.00"],["7:0:2.8333333333333286","G3","0.83"],["7:1:0.4166666666666714","G3","0.00"],["7:1:1.9583333333333286","A3","0.80"],["7:1:2.375","A3","0.00"],["7:1:2.8333333333333286","B3","0.81"],["7:1:3.625","B3","0.00"],["7:2:1.0833333333333286","F4","0.85"],["8:0:2.083333333333343","F4","0.00"],["8:0:2.833333333333343","A3","0.80"],["8:0:3.833333333333343","A3","0.00"],["8:1:1.9583333333333428","B3","0.83"],["8:1:2.375","B3","0.00"],["8:1:2.833333333333343","C4","0.87"],["8:2:0.8333333333333428","C4","0.00"],["8:2:2.833333333333343","D4","0.85"],["8:3:0.8333333333333428","D4","0.00"],["8:3:2.833333333333343","E4","0.83"],["9:0:1.8333333333333428","E4","0.00"],["9:0:2.833333333333343","E3","0.85"],["9:1:0.4166666666666572","E3","0.00"],["9:1:1.9583333333333428","F3","0.83"],["9:1:2.375","F3","0.00"],["9:1:2.833333333333343","G3","0.83"],["9:1:3.625","G3","0.00"],["9:2:1.0833333333333428","C4","0.86"],["10:0:2.083333333333343","C4","0.00"],["10:0:2.833333333333343","D4","0.88"],["10:0:3.833333333333343","D4","0.00"],["10:1:1.9583333333333428","E4","0.81"],["10:1:2.375","E4","0.00"],["10:1:2.833333333333343","F4","0.85"],["11:0:1.8333333333333428","F4","0.00"],["11:0:2.833333333333343","G3","0.83"],["11:0:3.833333333333343","G3","0.00"],["11:1:1.9583333333333428","G3","0.83"],["11:1:2.375","G3","0.00"],["11:1:2.833333333333343","F3","0.76"],["11:2:2.416666666666657","F3","0.00"],["11:2:2.833333333333343","G3","0.80"],["11:2:3.625","G3","0.00"],["11:3:1.9583333333333428","G3","0.83"],["11:3:2.375","G3","0.00"],["11:3:2.833333333333343","F3","0.78"],["12:0:2.416666666666657","F3","0.00"],["12:0:2.833333333333343","G3","0.77"],["12:0:3.625","G3","0.00"]];
    
        var track1 = new WO.Track({notes: notes1, instrument: acousticPiano});
        var track2 = new WO.Track({notes: notes2, instrument: acousticPiano});
        var song = new WO.Song([track1, track2]);
        playSong(song);
      });
    });
  });
})();
