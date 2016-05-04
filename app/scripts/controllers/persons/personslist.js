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



      $scope.mainGridOptions2 = {
          dataSource: {
              type:"json",
              transport: {
                  read:
                  function(e){
                          Persons.query().$promise.then(function (persons) {
                              $scope.persons = persons.slice(Math.max(persons.length - 200, 1));
                              e.success($scope.persons);
                          });
                      }
              },
              schema: {
                  model: {
                      fields: {
                          FirstName: {type: "string"},
                          Id: {type: "number"},
                          LastName: {type: "string"},
                          ModifiedDateString: {type: "date"},
                          Title: {type: "string"},
                          TypeString: {type: "string"}
                      }
                  }, parse: function (data) {
                      $.each(data, function (i, val) {
                          val.ModifiedDateString = new Date(val.ModifiedDateString);
                          val.ModifiedDateString.setHours(0, 0, 0, 0);
                          console.log(val.ModifiedDateString);
                          console.log("toto");
                      });
                      return data;
                  }
              },
              pageSize: 20,
              serverPaging: false,
              serverFiltering: false,
              serverSorting: false
          },
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
                  format: "{0:MMM dd, yyyy}",
                  parseFormats: "{0:MM/dd/yyyy}",
                  headerTemplate: '<label for="check-all"><b>Start Date</b></label>',
                  headerAttributes: { style: "text-align: center;" },
                  attributes: { style: "text-align:center !important;padding-right: 25px;" },
                  filterable: {
                      ui: function (element) {
                          element.kendoDatePicker({
                              format: "MMM dd, yyyy"
                          });
                      }
                  }
              }],
          sortable: true,
          pageable:{

              pageSizes:[10,20,100,500],
              buttonCount:5


          },
          scrollable:true,
          filterable:true
      };






  });
