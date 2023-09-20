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
            .when('/explore', {
                templateUrl: '/modules/components/explore/views/explore--view.html?t=' + environment.version,
                controller: 'ExploreController',
                controllerAs: 'page',
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        //

                    }
                }
            });

    });