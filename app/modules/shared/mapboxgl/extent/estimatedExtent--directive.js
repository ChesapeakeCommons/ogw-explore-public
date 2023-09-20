(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('estExtent', [
            'environment',
            '$window',
            '$rootScope',
            '$routeParams',
            '$filter',
            '$parse',

            '$location',
            'Permit',
            '$timeout',
            function (environment, $window, $rootScope, $routeParams, $filter,
                      $parse, $location, Permit, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        'options': '=?',
                        'featureType': '@'
                    },
                    templateUrl: function (elem, attrs) {

                        return 'modules/shared/mapboxgl/extent/estimatedExtent--view.html?t=' + environment.version;

                    },
                    link: function (scope, element, attrs) {

                        //
                        // Additional scope vars.
                        //

                        scope.showEstimatedExtent = true;

                        scope.toggleExtent = function() {

                            scope.showEstimatedExtent = !scope.showEstimatedExtent;

                        };

                    }

                };

            }

        ]);

}());