/* global describe, it */

(function () {
  'use strict';

  describe('WorldOrchestra framework', function () {
    describe('The main application', function () {
      it('should have a container named WO', function () {
        expect(WO).to.be.an('object');
      });
      it('should have a master model', function () {
        expect(WO.WOModel).not.to.be.undefined;
      });
      it('should have a master view', function () {
        expect(WO.WOView).not.to.be.undefined;
      });
    });

    describe('The main model', function () {
      it('should have an initialize method', function () {
        expect(WO.appModel.initialize).to.be.a('function');
      });
    });

    describe('The main view', function () {
      it('should have a song view', function () {
        expect(WO.appView.songView).not.to.be.undefined;
      });
      it('should have a transport view', function () {
        expect(WO.appView.transportView).not.to.be.undefined;
        expect($('.transportView').prop('tagName')).to.equal("DIV");
      });
      it('should have a userInput view', function () {
        expect(WO.appView.userInputView).not.to.be.undefined;
      });
      it('should have an initialize method', function () {
        expect(WO.appView.initialize).to.be.a('function');
      });
      it('should have a render method', function () {
        expect(WO.appView.render).to.be.a('function');
      });
    });

    describe('The userInput view', function () {
      it('should have a container element', function () {
      expect($('#container')).not.to.be.undefined;
        
      });
      it('should have 2 default tabs for drumpad and piano', function () {
        expect($('#container ul a')).to.have.length(2);

      });
      it('should display drumpad presets', function () {
        expect($('#drumPadPresets')).not.to.be.undefined;
      });
      it('should display drumpad', function () {
        expect($('#Sequencer')).not.to.be.undefined;
      });
      it('should display piano', function () {
        expect($('#keys')).not.to.be.undefined;
      });
      it('should display all the drumPad buttons', function () {
        expect($('#Sequencer').find('.Checkbox')).to.to.have.length(96);
      });
      it('should display all the white piano keys', function () {
        expect($('#piano').find('li')).to.to.have.length(22);
      });
      it('should display all the black piano keys', function () {
        expect($('#piano').find('span')).to.to.have.length(15);
      });
      it('should have an octave button', function() {
        expect($('.octave').prop('tagName')).to.equal('BUTTON');
      });
    });

    // describe('Song collection', function () {
    //   it('should be a Backbone collection', function () {
    //     expect(typeof WO.Song).to.be('function');
    //   });
    //   it('should be able to add a track', function () {
    //     var song = new WO.Song();
    //     song.add(new WO.Track());
    //     expect(song.at(0) instanceof WO.Track).to.equal(true);
    //   });
    // });

    // describe('Track model', function () {
    //   it('should be a Backbone model', function () {
    //     expect(typeof WO.Track).to.be('function');
    //   });
    // });
  });
})();
