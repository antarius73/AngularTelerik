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
  });
