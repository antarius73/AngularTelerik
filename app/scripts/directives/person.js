'use strict';

/**
 * @ngdoc directive
 * @name angularRestApp.directive:person
 * @description
 * # person
 */
angular.module('kendoTestApp')
    .directive('personNameUnique', function (Persons, $filter) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                elm.bind('blur', function () {
                    var personsNames = [];

                    Persons.query().$promise.then(function (persons) {
                        personsNames = persons;
                        var preExistingName = $filter('filter')(personsNames, {FirstName: ctrl.$modelValue}, true);

                        if (preExistingName.length === 0 || ctrl.$modelValue == scope.person.originalFirstName) {
                            ctrl.$setValidity("unique", true);
                        }
                        else {
                            ctrl.$setValidity("unique", false);
                        }
                    }, function () {

                    });
                });
            }
        };
    });
