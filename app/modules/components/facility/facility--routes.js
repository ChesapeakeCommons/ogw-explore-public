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
            .when('/project-index', {
                templateUrl: '/modules/components/facility/views/facilityList--view.html?t=' + environment.version,
                controller: 'FacilityListController',
                controllerAs: 'page',
                reloadOnSearch: false
            })
            .when('/facility/:nodeId', {
                templateUrl: '/modules/components/facility/views/facilitySummary--view.html?t=' + environment.version,
                controller: 'FacilitySummaryController',
                controllerAs: 'page',
                resolve: {}
            });

    });