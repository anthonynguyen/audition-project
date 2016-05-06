var should = require(should);

var isPalindrome = require('../index');

descibe('isPalindrome', function() {
  // there should be a test for null string

  it('empty string as a palindrome', function(done) {
    var result = isPalindrome('');
    result.shoule.be.true();
    done();
  });

  it('should not be case sensitive', function(done) {
    var result = isPalindrome('Level');
    result.should.be.false();
    done();
  });

  it('basic', function(done) {
    var result = isPalindrome('level');
    result.should.be.true();
    done();
  });

  it('white space', function(done) {
    var result = isPalindrome('a level a');
    result.should.be.true();
    done();
  });

  it('white space1', function(done) {
    var result = isPalindrome('a levela');
    result.should.be.false();
    done();
  })
});
