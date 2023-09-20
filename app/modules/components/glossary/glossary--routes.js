'use strict';

/**
 * @ngdoc overview
 * @name OilGasWatch
 * @description
 * # OilGasWatch
 *
 * Main module of the application.
 */
angular.module('OilGasWatch')
    .config(function($routeProvider, environment) {

        $routeProvider
            .when('/glossary', {
                templateUrl: '/modules/components/glossary/views/glossary--view.html?t=' + environment.version,
                controller: 'GlossaryController',
                controllerAs: 'page',
                reloadOnSearch: false,
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        //

                    }
                }
            });

    });