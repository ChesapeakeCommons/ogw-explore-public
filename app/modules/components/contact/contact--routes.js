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
            .when('/contact', {
                templateUrl: '/modules/components/contact/views/contact--view.html?t=' + environment.version,
                controller: 'ContactController',
                controllerAs: 'page',
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        //

                    }
                }
            });

    });