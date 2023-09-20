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
            .when('/map', {
                templateUrl: '/modules/components/atlas/views/atlas--view.html?t=' + environment.version,
                controller: 'MapController',
                controllerAs: 'page',
                reloadOnSearch: false
            })
            .when('/atlas', {
                templateUrl: '/modules/components/atlas/views/atlas--view.html?t=' + environment.version,
                controller: 'AtlasController',
                controllerAs: 'page',
                reloadOnSearch: false,
                resolve: {
                    user: function(Account, $rootScope, $document) {

                        $rootScope.targetPath = document.location.pathname;

                        if (Account.userObject && !Account.userObject.id) {
                            return Account.getUser();
                        }

                        return Account.userObject;

                    }
                }
            })
            .when('/atlas/:id', {
                templateUrl: '/modules/components/atlas/views/atlasSnapshot--view.html?&t=' + environment.version,
                controller: 'AtlasSnapshotController',
                controllerAs: 'page',
                reloadOnSearch: false
            });

    });