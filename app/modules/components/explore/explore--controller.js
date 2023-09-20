(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .controller('ExploreController', [
            'Account',
            'Notifications',
            '$rootScope',
            '$route',
            '$routeParams',
            '$scope',
            '$location',
            'mapbox',
            '$window',
            '$timeout',
            function(Account, Notifications, $rootScope, $route, $routeParams,
                     $scope, $location, mapbox, $window, $timeout) {

                var self = this;

                $rootScope.viewState = {
                    'explore': true
                };

                $rootScope.page = {
                    title: 'Explore'
                };

            }

        ]);

}());