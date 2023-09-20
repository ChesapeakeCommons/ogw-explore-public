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
            .when('/pipeline-index', {
                templateUrl: '/modules/components/pipeline/views/pipelineList--view.html?t=' + environment.version,
                controller: 'PipelineListController',
                controllerAs: 'page',
                reloadOnSearch: false
            })
            .when('/pipeline/:nodeId', {
                templateUrl: '/modules/components/pipeline/views/pipelineSummary--view.html?t=' + environment.version,
                controller: 'PipelineSummaryController',
                controllerAs: 'page',
                resolve: {}
            });

    });