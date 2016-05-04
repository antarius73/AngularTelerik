'use strict';

describe('Controller: TestdateCtrl', function () {

  // load the controller's module
  beforeEach(module('kendoTestApp'));

  var TestdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestdateCtrl = $controller('TestdateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TestdateCtrl.awesomeThings.length).toBe(3);
  });
});
