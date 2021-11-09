'use strict';

describe('Filter: stringToDigit', function () {

  // load the filter's module
  beforeEach(module('oscarApp'));

  // initialize a new instance of the filter before each test
  var stringToDigit;
  beforeEach(inject(function ($filter) {
    stringToDigit = $filter('stringToDigit');
  }));

  it('should return the input prefixed with "stringToDigit filter:"', function () {
    var text = 'angularjs';
    expect(stringToDigit(text)).toBe('stringToDigit filter: ' + text);
  });

});
