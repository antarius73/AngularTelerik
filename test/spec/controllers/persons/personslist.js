'use strict';

describe('Controller: PersonsPersonslistCtrl', function () {

  // load the controller's module
  beforeEach(module('kendoTestApp'));

  var PersonsPersonslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonsPersonslistCtrl = $controller('PersonsPersonslistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonsPersonslistCtrl.awesomeThings.length).toBe(3);
  });
});
