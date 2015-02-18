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
    describe('recording', function(){
      it("should record played notes", function(){
        notes = [ ["0:0:0", "C4", 1.00], ["0:0:1", "C4", 0.00] ];
        expect(false).to.equal(true);
      });
    });
    describe('playback', function(){
      it("should record played notes", function(){
        expect(false).to.equal(true);
      });
    });
  });
})();
