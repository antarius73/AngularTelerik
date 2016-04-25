'use strict';

angular.module('kendoTestApp')


    .factory('Person', ['$resource', '$cacheFactory', 'WCF_URL_BASE',

      function ($resource, $cacheFactory, WCF_URL_BASE) {
        // supprimer le cache de la liste des personne si une personne est modifiée

        var interceptor = {
          response: function (response) {

            var personsCache = $cacheFactory.get('persons');

            if (angular.isDefined(personsCache)){
              personsCache.removeAll();
            }

            return response;
          }
        };

        return $resource(WCF_URL_BASE + '/Persons/:id/', {id: '@id'},

            {
              'update': {method: 'PUT', interceptor: interceptor},
              'create': {method: 'POST', interceptor: interceptor},
              'remove': {method: 'DELETE'}
            }
        );
      }
    ])


    .factory('Persons', ['$resource', '$cacheFactory', 'WCF_URL_BASE','Person',
      function ($resource, $cacheFactory, WCF_URL_BASE) {
        var personsCache = $cacheFactory('persons');

        var factory=$resource(WCF_URL_BASE + '/Persons/',
            {},
            {
              'query': {method: 'GET', cache: personsCache, isArray: true}
            }
        );
        return factory;
      }
    ]);
