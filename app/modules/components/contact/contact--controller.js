(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .controller('ContactController', [
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
                    'contact': true
                };

                $rootScope.page = {
                    title: 'Contact'
                };

            }

        ]);

}());