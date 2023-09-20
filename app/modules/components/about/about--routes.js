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
            .when('/about', {
                templateUrl: '/modules/components/about/views/about--view.html?t=' + environment.version,
                controller: 'AboutController',
                controllerAs: 'page',
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        //

                    }
                }
            });

    });