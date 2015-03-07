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
      WO.audioIO.songBuffer = {stop: function() {}};

      it("should have a playTrack function", function(){
        expect(WO.transport.playSong).to.be.a('function');
      });

      describe('one track', function(){
     
        var notes, track, song, attack, release, spySongBuffer;
          notes = [ ["0:0:0", "C4", 1.00], ["0:1:1", "C4", 0.00] ];
          track = new WO.Track();
          track.set('notes', notes);
          song = new WO.Song([track]);

        beforeEach(function(){
          attack = sinon.spy(track.get("instrument"), 'triggerAttack');
          release = sinon.spy(track.get("instrument"), 'triggerRelease');
        });

        afterEach(function(){
          attack.restore();
          release.restore();
        });

        it("should play and stop one note", function(done){
          WO.transport.playSong(song);
          setTimeout(function(){
            WO.transport.stopTracks();
            expect(attack.calledOnce).to.equal(true);
            expect(release.calledOnce).to.equal(true); 
            done();
          }, 1000);      
        });
      });

      describe('two tracks', function(){

        var attack1, attack2, release1, release2, notes1, notes2, track1, track2, song;

        beforeEach(function(){
          notes1 = [ ["0:0:1", "C4", 1.00], ["0:1:1", "C4", 0.00] ];
          notes2 = [ ["0:0:3", "G4", 1.00], ["0:1:0", "G4", 0.00] ];
          track1 = new WO.Track();
          track2 = new WO.Track();
          track1.set('notes', notes1);
          track2.set('notes', notes2);
          song = new WO.Song([track1, track2]);
          attack1 = sinon.spy(track1.get("instrument"), 'triggerAttack');
          release1 = sinon.spy(track1.get("instrument"), 'triggerRelease');
          attack2 = sinon.spy(track2.get("instrument"), 'triggerAttack');
          release2 = sinon.spy(track2.get("instrument"), 'triggerRelease');
        });

        it("should play 1 note from 2 tracks", function(done){

          WO.transport.playSong(song);
          setTimeout(function(){
            WO.transport.stopTracks();
            expect(attack1.calledOnce).to.equal(true);
            expect(release1.calledOnce).to.equal(true); 
            expect(attack2.calledOnce).to.equal(true);
            expect(release2.calledOnce).to.equal(true);
            done();
            attack1.restore();
            attack2.restore();
            release1.restore();
            release2.restore();
          }, 1000);

        });      
      });     
    });
  });
})();
