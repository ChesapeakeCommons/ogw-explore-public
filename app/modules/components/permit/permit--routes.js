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
            .when('/permit-index', {
                templateUrl: '/modules/components/permit/views/permitList--view.html?t=' + environment.version,
                controller: 'PermitListController',
                controllerAs: 'page',
                reloadOnSearch: false,
                resolve: {}
            })
            .when('/permit/:nodeId', {
                templateUrl: '/modules/components/permit/views/permitSummary--view.html?t=' + environment.version,
                controller: 'PermitSummaryController',
                controllerAs: 'page',
                resolve: {}
            });

    });