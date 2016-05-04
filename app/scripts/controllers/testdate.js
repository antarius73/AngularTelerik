'use strict';

/**
 * @ngdoc function
 * @name kendoTestApp.controller:TestdateCtrl
 * @description
 * # TestdateCtrl
 * Controller of the kendoTestApp
 */
angular.module('kendoTestApp')
  .controller('TestdateCtrl', function ($scope) {
      var dataSource = [
          {
              "bereitschaftszeitId":2,
              "bereitschaftlerId":1,
              "stundeVon":"2016-03-15T11:44:33.1370000",
              "stundeBis":"2016-03-15T11:44:33.1370000"
          },
          {
              "bereitschaftszeitId":5,
              "bereitschaftlerId":2,
              "stundeVon":"2016-03-15T11:44:33.1370000",
              "stundeBis":"2016-03-15T11:44:33.1370000"
          },
          {
              "bereitschaftszeitId":7,
              "bereitschaftlerId":1,
              "stundeVon":"2016-05-15T11:44:33.1370000",
              "stundeBis":"2016-05-15T11:44:33.1370000"
          },
          {
              "bereitschaftszeitId":12,
              "bereitschaftlerId":13,
              "stundeVon":"2016-03-15T11:44:33.1370000",
              "stundeBis":"2016-03-15T11:44:33.1370000"
          },
          {
              "bereitschaftszeitId":15,
              "bereitschaftlerId":2,
              "stundeVon":"2016-01-15T11:44:33.1370000",
              "stundeBis":"2016-01-15T11:44:33.1370000"
          },
          {
              "bereitschaftszeitId":44,
              "bereitschaftlerId":2,
              "stundeVon":"2016-02-15T11:44:33.1370000",
              "stundeBis":"2016-02-15T11:44:33.1370000"
          }
      ];


      $scope.testGridOptions = {

          dataSource: {
              data: dataSource,
              schema: {

                  model: {
                      fields: {
                          stundeVon: { type: "date" }
                      }
                  }
                  , parse: function (data) {
                      $.each(data, function (i, val) {
                          val.stundeVon = new Date(val.stundeVon);
                          val.stundeVon.setHours(0,0,0,0);
                          console.log(val.stundeVon);
                      });
                      return data;
                  }
              },
              pageSize: 20,
              serverPaging: false,
              serverFiltering: false,
              serverSorting: false
          },
          height: 550,
          filterable: true,
          sortable: true,
          pageable: true,
          columns: [
              {
                  field: "stundeVon",
                  title: "Order Date",
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
              }
          ]


      };
  });
