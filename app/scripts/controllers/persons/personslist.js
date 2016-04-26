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
                  data:persons

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


      $scope.personsSource = new kendo.data.DataSource({

          schema:{
              model:{
                  fields:{
                      FirstName:{type:"string"},
                      Id:{type:"number"},
                      LastName:{type:"string"},
                      ModifiedDateString:{type:"date"},
                      Title:{type:"string"},
                      TypeString:{type:"string"}
                  }
              }
          },
          pageSize: 20

      });



      $scope.mainGridOptions = {
          dataSource: $scope.personsSource,
          columns: [{title: 'Id', width:'120px' , type:'number'},
                    {title: 'firstname' , width:'120px', type:'string'},
                    {title: 'LastName' , width:'120px', type:'string'},
                    {title: 'ModifiedDateString' , width:'120px', type:'date'}],
          sortable: true,
          pageable:{

              pageSizes:[10,20,100,500],
              buttonCount:5


          },
          scrollable:true


      };



// test 2

      $scope.mainGridOptions2 = {
          dataSource: $scope.personsSource,
          columns: [
              {
                  field:'Id',
                  title: 'Id',
                  width:'70px'

              },
              {
                  field:'FirstName',
                  title: 'firstname' ,
                  width:'120px',
                  template:'{{dataItem.Title}} {{dataItem.FirstName}}' ,
                  type:'string',
                  filterable:{
                      cell:{operator:"contains"}
                  }
              },
              {field:'TypeString',title: 'Type' , width:'120px' , type:'string',filterable:{multi:true}},

              {field:'LastName',title: 'LastName' , width:'120px' , type:'string'},
              {
                  field:'ModifiedDateString',
                  title: 'ModifiedDateString' ,
                  width:'120px',
                  template:'{{dataItem.ModifiedDateString|date:"dd/MM/yyyy"}}' ,
                  type:'date',
                  filterable:{ui:"datepicker"}
              }],
          sortable: true,
          pageable:{

              pageSizes:[10,20,100,500],
              buttonCount:5


          },
          scrollable:true,
          filterable:true
      };




      $scope.searchData();


  });
