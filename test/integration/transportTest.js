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

      describe("skip forward", function() {
        beforeEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });

        it('should move the transport forward by one measure', function() {
          $("#skipForward").click();
          expect(Tone.Transport.getTransportTime()).to.equal("1:0:0");
        });

        afterEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });
      });

      describe("forward", function() {
        beforeEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });

        it('should move the transport forward by eight measures', function() {
          $("#forward").click();
          expect(Tone.Transport.getTransportTime()).to.equal("8:0:0");
        });

        afterEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });
      });

      describe("skip back", function() {
        beforeEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });

        it("should move the transport back by one measure", function() {
          $("#skipBack").click();
          expect(Tone.Transport.getTransportTime()).to.equal("0:0:0");
          $("#forward").click();
          $("#skipBack").click();
          expect(Tone.Transport.getTransportTime()).to.equal("7:0:0");
        });

        afterEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });
      });

      describe("rewind", function() {
        beforeEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });

        it("should move the transport to 0:0:0", function() {
          $("#forward").click();
          $("#forward").click();
          $("#rewind").click();
          expect(Tone.Transport.getTransportTime()).to.equal("0:0:0");
        });

        afterEach(function() {
          Tone.Transport.setTransportTime("0:0:0");
        });
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
