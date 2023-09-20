(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .controller('AboutController', [
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
                    'about': true
                };

                $rootScope.page = {
                    title: 'About'
                };

                self.faqDisplay = {};

            }

        ]);

}());