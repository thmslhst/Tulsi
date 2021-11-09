'use strict';

describe('Filter: normalizeRange', function () {

  // load the filter's module
  beforeEach(module('App'));

  // initialize a new instance of the filter before each test
  var normalizeRange;
  beforeEach(inject(function ($filter) {
    normalizeRange = $filter('normalizeRange');
  }));

  it('should return the input prefixed with "normalizeRange filter:"', function () {
    var text = 'angularjs';
    expect(normalizeRange(text)).toBe('normalizeRange filter: ' + text);
  });

});
