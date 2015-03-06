  describe('The transport', function () {
    describe('Transport Controls', function () {
      beforeEach(function () {
        appView = new WO.WOView();
        appView.songView.collection.add(new WO.Track());
        spyStartTransportCounter = sinon.spy(WO.appView.transportView, "startTransportCounter");
        spyPlayDrumPad = sinon.spy(WO, "playDrumPad");
        spyPlaySong = sinon.spy(WO.transport, "playSong");
        this.server = sinon.fakeServer.create();
      });

      afterEach(function () {
        // spy1.restore();
        spyStartTransportCounter.restore();
        spyPlayDrumPad.restore();
        spyPlaySong.restore();
        this.server.restore();
      });

      it('Pressing play will start the transport counter', function () {
        $("#play").click();
        expect(spyStartTransportCounter.calledOnce).to.be.true;
      });

      it('Pressing play will start the drumPad', function () {
        $("#play").click();
        expect(spyPlayDrumPad.calledOnce).to.be.true;
      });

      it('Pressing play will play the song', function () {
        $("#play").click();
        expect(spyPlaySong.calledOnce).to.be.true;
      });

      it('Play can only be pressed once', function () {
        $("#play").click();
        $("#play").click();
        expect(document.getElementsByClassName('play').length).not.to.equal(0);
        expect(spyStartTransportCounter.calledOnce).to.be.true;
        expect(spyPlayDrumPad.calledOnce).to.be.true;
        expect(spyPlaySong.calledOnce).to.be.true;
      });

      it('Play cannot be pressed while recording', function () {
        $("#record").click();
        $("#play").click();
        expect(spyPlaySong.called).to.be.false;
      });

      it('todo.setup receives an array of todos when todo.init is called', function () {
        expect(true).to.be.true;
      });
    });
  });
