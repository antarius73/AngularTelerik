'use strict';

/**
 * @ngdoc overview
 * @name kendoTestApp
 * @description
 * # kendoTestApp
 *
 * Main module of the application.
 */
angular
  .module('kendoTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'kendo.directives'
  ])
    .constant('WCF_URL_BASE', 'https://svr-grind.tesfri.intra:8081')
    .config(['$resourceProvider', function ($resourceProvider) {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }])
    .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/persons/personsList', {
        templateUrl: 'views/persons/personslist.html',
        controller: 'PersonsPersonslistCtrl',
        controllerAs: 'persons/personsList'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/testDate', {
        templateUrl: 'views/testdate.html',
        controller: 'TestdateCtrl',
        controllerAs: 'testDate'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && (!$rootScope.globals.currentUser)) {
                $location.path('/login');
            }
        });
    }])
    .run(function(){


        $.getScript("bower_components/kendo-ui/js/messages/kendo.messages.fr-FR.min.js", function() {

            /* $scope.$apply should be used in order to notify the $scope for language change */


                // $translate.use($scope.lang);
                /* change angular-translate language */
                kendo.culture("fr-FR");
                /* change kendo culture */

                /* we use dummy language option in order to force the Grid to rebind */
                //$scope.mainGridOptions.language = $scope.lang;

                /* we change the calendar widget culture option in order to force the Calendar to rebind */
                // $scope.calendarOptions.culture = $scope.lang;

            console.log(kendo.culture().name);
        });


    });

