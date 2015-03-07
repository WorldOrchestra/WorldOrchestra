describe('A small-town girl', function() {
  it("should not stop believin'", function() {
    var stopBelievin = false;
    expect(stopBelievin).to.be.false();
  });

  it("living in a lonely world", function(){
    var world = 'lonely';
    expect(world).to.equal('lonely');
  });

});

describe('The train', function() {
  it("should leave at midnight", function(){
    var departureTime = '12:00';
    expect(departureTime).to.equal('12:00');
  });

  it("should leave for Georgia", function() {
    var destination = 'Georgia';
    expect(destination).not.to.equal("Louisiana");
  });
});

describe('Karma Chameleon', function() {
  it('should come and go', function() {
    ;;
  })
});

describe("The 80's", function(){
  $('come').on('Eileen');
  it("the volume can go above 10", function(){
    var volume = 11;
    expect(volume).to.be.above(10);
  });

  describe("Hair length", function() {
    it("should be greater than shoulder length", function(){
      var shoulder = [1,2,3,4,5,6,7,8,9];
      var hair = [1,2,3,4,5,6,7]
      expect(hair.length).to.be.below(shoulder.length);
    });
  });
});
