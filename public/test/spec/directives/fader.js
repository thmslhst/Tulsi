'use strict';

describe('Directive: fader', function () {

  // load the directive's module
  beforeEach(module('oscarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fader></fader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fader directive');
  }));
});
