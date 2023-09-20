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
            .when('/state-index', {
                templateUrl: '/modules/components/state/views/stateList--view.html?t=' + environment.version,
                controller: 'StateListController',
                controllerAs: 'page',
                reloadOnSearch: false
            })
            .when('/state/:nodeId', {
                templateUrl: '/modules/components/state/views/stateSummary--view.html?t=' + environment.version,
                controller: 'StateSummaryController',
                controllerAs: 'page',
                resolve: {
                    // facility: function(Facility, $route) {
                    //
                    //     var exclude = [
                    //         'centroid',
                    //         'creator',
                    //         'dashboards',
                    //         'geometry',
                    //         'members',
                    //         'metric_types',
                    //         'practices',
                    //         'practice_types',
                    //         'properties',
                    //         'targets',
                    //         'tasks',
                    //         'sites'
                    //     ].join(',');
                    //
                    //     return Facility.getSingle({
                    //         id: $route.current.params.facilityId,
                    //         exclude: exclude
                    //     });
                    //
                    // }
                }
            });

    });