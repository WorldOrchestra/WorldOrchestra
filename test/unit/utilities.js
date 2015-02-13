var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the todo.App', function() {
  describe('the todo object', function(){

    it('should have all the necessary methods', function(){
      expect(todo.util.trimTodoName).to.be.a("function");
      assert.isFunction(todo.util.isValidTodoName, "Domen ROCKS!");
      todo.util.getUniqueId.should.be.a("function");
    });
  });
});

describe('the todo.util methods', function() {
  describe('#trimTodoName', function() {
    it('should trim the whitespace after a todo\'s string', function() {
        expect(todo.util.trimTodoName('wash dishes ')).to.equal('wash dishes');

    });
  });
  describe('#isValidTodoName', function() {
    it('should reject a todo string that is less than 2 non-space characters long', function() {
        expect(todo.util.isValidTodoName('w ')).to.not.be.true;

    });
  });
  describe('#getUniqueId', function() {
    it('should not repeat the same id for a todo', function() {
        expect(todo.util.getUniqueId()).to.not.equal(todo.util.getUniqueId());

    });
  });
});
