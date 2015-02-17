describe('API integration', function(){
  var setupStub, JSONresponse, list, setupSpy, promise;
  beforeEach(function () {
    this.server = sinon.fakeServer.create();
    list = ["1", "2", "3"];
    setupSpy = sinon.stub(todo, "setup");
  });

  afterEach(function() {
    setupSpy.restore();
    this.server.restore();
  });

  it('todo.setup receives an array of todos when todo.init is called', function (done) {
    this.server.respondWith("GET", "/todos",
        [200, {"Content-Type": "application/json"},
          JSON.stringify(list)]);
    todo.init();
    done();
    expect(setupSpy.calledWith(JSON.stringify(list))).to.be.true;
  });
});

