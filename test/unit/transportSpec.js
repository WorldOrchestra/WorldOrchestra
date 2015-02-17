/* global describe, it, transport */

(function () {
  'use strict';
  var notes;
  describe('The transport', function () {
    describe('the view', function() {
      it('should have the transport buttons', function() {
        expect($('button#rewind').prop('tagName')).to.be('BUTTON');
        expect($('button#skipBack').prop('tagName')).to.be('BUTTON');
        expect($('button#stop').prop('tagName')).to.be('BUTTON');
        expect($('button#play').prop('tagName')).to.be('BUTTON');
        expect($('button#record').prop('tagName')).to.be('BUTTON');
        expect($('button#skipForward').prop('tagName')).to.be('BUTTON');
        expect($('button#forward').prop('tagName')).to.be('BUTTON');
      });
      it('should have a transport time node', function() {
        expect($('#transportTime').length).not.to.be(0);
      });
      describe('the keys', function() {
        it('should have the note buttons', function() {
          expect($('button#C4').prop('tagName')).to.be('BUTTON');
          expect($('button#Db4').prop('tagName')).to.be('BUTTON');
          expect($('button#D4').prop('tagName')).to.be('BUTTON');
          expect($('button#Eb4').prop('tagName')).to.be('BUTTON');
          expect($('button#E4').prop('tagName')).to.be('BUTTON');
          expect($('button#F4').prop('tagName')).to.be('BUTTON');
          expect($('button#Gb4').prop('tagName')).to.be('BUTTON');
          expect($('button#G4').prop('tagName')).to.be('BUTTON');
          expect($('button#Ab4').prop('tagName')).to.be('BUTTON');
          expect($('button#A4').prop('tagName')).to.be('BUTTON');
          expect($('button#Bb4').prop('tagName')).to.be('BUTTON');
          expect($('button#B4').prop('tagName')).to.be('BUTTON');
          expect($('button#C5').prop('tagName')).to.be('BUTTON');
          expect($('button#Db5').prop('tagName')).to.be('BUTTON');
          expect($('button#D5').prop('tagName')).to.be('BUTTON');
          expect($('button#Eb5').prop('tagName')).to.be('BUTTON');
          expect($('button#E5').prop('tagName')).to.be('BUTTON');
          expect($('button#F5').prop('tagName')).to.be('BUTTON');
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
