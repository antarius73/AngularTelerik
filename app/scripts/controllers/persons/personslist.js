'use strict';

/**
 * @ngdoc function
 * @name kendoTestApp.controller:PersonsPersonslistCtrl
 * @description
 * # PersonsPersonslistCtrl
 * Controller of the kendoTestApp
 */
angular.module('kendoTestApp')
  .controller('PersonsPersonslistCtrl', function ($resource, $scope, $rootScope,
                                                  Persons, Person, AuthenticationService, $location) {
      // charge la liste des personnes
      $scope.searchData = function () {

          Persons.query().$promise.then(function (persons) {
              //$scope.persons = persons.slice(Math.max(persons.length - 200, 1));

              var dataSource = new kendo.data.DataSource({
                  data: persons,
                  pageSize: 10
              });
              dataSource.read();
              $scope.personsSource.data(dataSource.data());

          }, function (error) {
              if (error.status === "401") {
                  AuthenticationService.ClearCredentials();
                  $location.path('/login');
              }
          });

      };


      $scope.personsSource = new kendo.data.DataSource();



      $scope.mainGridOptions = {
          dataSource: $scope.personsSource,
          columns: [{field: 'Id', title: 'Id' }, {field: 'FirstName', title: 'firstname' }],
          sortable: true
      };





      $scope.searchData();


  });
