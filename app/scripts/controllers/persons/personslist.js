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
                                                  Persons,Person,$filter) {

      $scope.TypeLstSource = new kendo.data.DataSource({
          data:[
              {typeId:"SC",typeName:"SC-Contact en magasin"},
              {typeId:"IN",typeName:"IN-Consomateur final"},
              {typeId:"SP",typeName:"SP-Vendeur"},
              {typeId:"EM",typeName:"EM-Employé"},
              {typeId:"VC",typeName:"VC-Vendeur partenaire"},
              {typeId:"GC",typeName:"GC-Contact divers"},
          ]
      });

      $scope.typeDropDownEditor = function(container, options) {
          var editor = $('<input kendo-drop-down-list required k-data-text-field="\'typeName\'" k-data-value-field="\'typeId\'" k-data-source="TypeLstSource" data-bind="value:' + options.field + '"/>')
              .appendTo(container);
      }

      $scope.mainGridOptions2 = {
          editable:"inline",
          dataSource: {

              transport: {
                  read:
                  function(e){
                         Persons.query().$promise.then(function (persons) {
                              $scope.persons = persons.slice(persons.length - 200, persons.length);
                             //$scope.persons = persons.slice(0,200);
                              e.success($scope.persons);
                              console.log("read");

                          });
                      },
                  update:
                      function(e){
                          console.log("update");

                          Person.get({id: e.data.id}).$promise.then(function (person) {

                              person.FirstName = e.data.FirstName;
                              person.LastName = e.data.LastName;
                              person.ModifiedDateString = new Date(e.data.ModifiedDateString);
                              person.Title = e.data.Title;
                              person.TypeString = e.data.TypeString;

                              person.$update({id: person.Id}).then(function () {
                                  console.log("retour");
                                  e.success();
                              });


                          });
                      },
                  create:
                      function(e){
                          console.log("create");

                          var createdPerson = new Person();
                          createdPerson.FirstName = e.data.FirstName;
                          createdPerson.LastName = e.data.LastName;
                          createdPerson.ModifiedDateString = new Date(e.data.ModifiedDateString);
                          createdPerson.Title = e.data.Title;
                          createdPerson.TypeString = e.data.TypeString.typeId;

                          createdPerson.$create().then(function () {
                              console.log("created");
                              e.success();
                          });


                      },
                  destroy: function (e) {
                      console.log("destroy");
                      Person.remove({id: e.data.id});

                  },

                  parameterMap: function(options, operation) {
                      if (operation !== "read" && options.models) {
                          console.log("parameterMap");

                          return {models: kendo.stringify(options.models)};

                      }
                  }
              },
              schema: {
                  model: {
                      id:"Id",
                      fields: {
                          FirstName: {type: "string"},
                          Id: {type: "number", editable:false},
                          LastName: {type: "string"},
                          ModifiedDateString: {type: "date"},
                          Title: {type: "string"},
                          TypeString: {defaultValue: {typeId:"EM",typeName:"Employé"} }
                      }
                  }, parse: function (data) {
                      $.each(data, function (i, val) {
                          val.ModifiedDateString = new Date(val.ModifiedDateString);
                          val.ModifiedDateString.setHours(0, 0, 0, 0);
                         // console.log(val.ModifiedDateString);

                      });
                      return data;
                  }
              },
              pageSize: 20,
              batch:false,
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
              { field: "TypeString", title: "Type", width: "180px", editor: $scope.typeDropDownEditor, template:'{{dataItem.TypeString.typeId || dataItem.TypeString}}' ,filterable:{multi:true}},

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
              },
              {command:[{name:"edit",text:""},{name:"destroy",text:""}],title:"&nbsp;", width:"200px"}],

          sortable: true,
          pageable:{

              pageSizes:[10,20,100,500],
              buttonCount:5


          },
          scrollable:true,
          toolbar:["create"],
          filterable:true
      };






  });
