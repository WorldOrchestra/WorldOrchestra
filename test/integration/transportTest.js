  describe('The transport', function () {
    var appView;
    appView = new WO.WOView();
    appView.songView.collection.add(new WO.Track());
    WO.audioIO.songBuffer = {stop: function() {}};

    describe('Transport Controls', function () {
      var spyStartTransportCounter, spyPlayDrumPad, spyPlaySong, spySongBuffer;

      beforeEach(function () {
        spySongBuffer = sinon.spy(WO.audioIO.songBuffer, "stop");
        spyStartTransportCounter = sinon.spy(WO.appView.transportView, "startTransportCounter");
        spyPlayDrumPad = sinon.spy(WO, "playDrumPad");
        spyPlaySong = sinon.spy(WO.transport, "playSong");
        this.server = sinon.fakeServer.create();
      });

      afterEach(function () {
        spyStartTransportCounter.restore();
        spyPlayDrumPad.restore();
        spyPlaySong.restore();
        spySongBuffer.restore();
        this.server.restore();
      });

      it('Pressing play will start the transport counter', function () {
        $("#play").click();
        $("#stop").click();
        expect(spyStartTransportCounter.calledOnce).to.be.true;
      });

      it('Pressing play will start the drumPad', function () {
        $("#play").click();
        $("#stop").click();
        expect(spyPlayDrumPad.calledOnce).to.be.true;
      });

      it('Pressing play will play the song', function () {
        $("#play").click();
        $("#stop").click();
        expect(spyPlaySong.calledOnce).to.be_true;
      });

      it('Play can only be pressed once', function () {
        $("#play").click();
        $("#play").click();
        expect(document.getElementsByClassName('play').length).not.to.equal(0);
        $("#stop").click();
        expect(spyStartTransportCounter.calledOnce).to.be.true;
        expect(spyPlayDrumPad.calledOnce).to.be.true;
        expect(spyPlaySong.calledOnce).to.be.true;
      });

      it('Play cannot be pressed while recording', function () {
        $("#record").click();
        $("#play").click();
        expect(spyPlaySong.calledTwice).to.be.false;
        $("#stop").click();
      });

      xit('Any notes not released will be killed', function (done) {
          var notes = [ ["0:0:1", "C4", 1.00] ];
          var track = new WO.Track({notes: notes});
          var synth = WO.InstrumentFactory("Synth", track.cid);
          track.set('instrument', synth);
          var song = new WO.Song([track]);
          var spyKillNotes = sinon.spy(WO.transport, 'killNotes');
          var spyAttack = sinon.spy(track.get("instrument"), 'triggerAttack');
          WO.transport.playSong(song);
          expect(spyAttack.calledOnce).to.be.true;
          expect(spyKillNotes.calledOnce).to.be.true;
          // $("#stop").click();
          song.remove(track);

          spyKillNotes.restore();
          instrument.triggerAttack.restore();
          done();
      });

    });
  });
