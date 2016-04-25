'use strict';

describe('Service: PersonService', function () {

  // load the service's module
  beforeEach(module('kendoTestApp'));

  // instantiate service
  var PersonService;
  beforeEach(inject(function (_PersonService_) {
    PersonService = _PersonService_;
  }));

  it('should do something', function () {
    expect(!!PersonService).toBe(true);
  });

});
