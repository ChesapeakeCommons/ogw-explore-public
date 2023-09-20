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
            .when('/', {
                templateUrl: '/modules/components/home/views/home--view.html?t=' + environment.version,
                controller: 'HomeController',
                controllerAs: 'page',
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        //

                    }
                }
            });

    });