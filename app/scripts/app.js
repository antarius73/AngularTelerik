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
    }]);
