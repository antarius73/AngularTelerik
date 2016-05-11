'use strict';

/**
 * @ngdoc function
 * @name kendoTestApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the kendoTestApp
 */
angular.module('kendoTestApp')
  .controller('SettingsCtrl', function ($scope) {


      $scope.selectLanguageData = {
          languageSelect:'fr-FR',
         availableOptions:[
             {id:'fr-FR', name:'Francais'},
             {id:'en-US', name:'Anglais'},
         ]
      };


      $scope.LanguageChanged = function(){

          $.getScript("resources/kendo.messages." + $scope.selectLanguageData.languageSelect + ".min.js", function() {

              /* $scope.$apply should be used in order to notify the $scope for language change */
              $scope.$apply(function () {

                 // $translate.use($scope.lang);
                  /* change angular-translate language */
                  kendo.culture($scope.selectLanguageData.languageSelect);
                  /* change kendo culture */

                  /* we use dummy language option in order to force the Grid to rebind */
                  //$scope.mainGridOptions.language = $scope.lang;

                  /* we change the calendar widget culture option in order to force the Calendar to rebind */
                 // $scope.calendarOptions.culture = $scope.lang;
              })
          });


          kendo.culture($scope.selectLanguageData.languageSelect);
          console.log(kendo.culture().name);
      };

  });
