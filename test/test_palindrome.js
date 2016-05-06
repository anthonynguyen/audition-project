'use strict';

var should = require('should');

var isPalindrome = require('../palindrome');

describe('palindromeTest', function() {

  // may not need
  it('null string', function(done) {
    var result = isPalindrome(null);
    result.should.be.false();
    done();
  });

  it('empty string as a palindrome', function(done) {
    var result = isPalindrome('');
    result.should.be.true();
    done();
  });

  it('should not be case sensitive', function(done) {
    var result = isPalindrome('Level');
    result.should.be.true();
    done();
  });

  it('basic', function(done) {
    var result = isPalindrome('level');
    result.should.be.true();
    done();
  });

  it('basic false', function(done) {
    var result = isPalindrome('abdf');
    result.should.be.false();
    done();
  });

  it('white space', function(done) {
    var result = isPalindrome('a level a');
    result.should.be.true();
    done();
  });

  it('white space1', function(done) {
    var result = isPalindrome('a levela');
    result.should.be.true();
    done();
  });

  it('white space2', function(done) {
    var result = isPalindrome(' ');
    result.should.be.true();
    done();
  });

  it('handle number', function(done) {
    var result = isPalindrome('123321');
    result.should.be.true();
    done();
  });

  it('single character', function(done) {
    var result = isPalindrome('a');
    result.should.be.true();
    done();
  });
});
