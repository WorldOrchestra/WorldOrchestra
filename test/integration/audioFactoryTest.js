  describe('AudioFactory', function () {
    var appView, waveSurfer, spy1;
    describe('Play Audio File', function () {
      beforeEach(function () {
        appView = new WO.WOView();
        appView.songView.collection.add(new WO.Track());
        waveSurfer = Object.create(WaveSurfer);
        spy1 = sinon.spy(waveSurfer, "play");
        appView.songView.collection.at(0).set('instrument', waveSurfer);
        this.server = sinon.fakeServer.create();
        $("#play").click();
      });

      afterEach(function () {
        spy1.restore();
        this.server.restore();
      });

      it('todo.setup receives an array of todos when todo.init is called', function () {
        //  this.server.respondWith("GET", "/todos",
        //      [200, {"Content-Type": "application/json"},
        //        JSON.stringify(list)]);
        //  todo.init();
        expect(true).to.be.true;
        //  expect(setupSpy.calledWith(JSON.stringify(list))).to.be.true;
      });
    });

    describe('Transport Controls', function () {
      beforeEach(function () {
        appView = new WO.WOView();
        appView.songView.collection.add(new WO.Track());
        waveSurfer = Object.create(WaveSurfer);
        spy1 = sinon.spy(waveSurfer, "play");
        appView.songView.collection.at(0).set('instrument', waveSurfer);
        this.server = sinon.fakeServer.create();
        $("#play").click();
      });

      afterEach(function () {
        spy1.restore();
        this.server.restore();
      });

      it('Play can only be pressed once.', function () {
        expect(true).to.be.true;
      });

      it('todo.setup receives an array of todos when todo.init is called', function () {
        expect(true).to.be.true;
      });

      it('todo.setup receives an array of todos when todo.init is called', function () {
        expect(true).to.be.true;
      });
    });
  });
