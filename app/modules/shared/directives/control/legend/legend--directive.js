(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('mapLegend', [
            '$window',
            'environment',
            function($window, environment) {
                return {
                    restrict: 'EA',
                    scope: {},
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/legend/legend--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.config = {};

                        scope.toggleLegend = function () {

                            scope.config.showLegend = !scope.config.showLegend;

                        };

                    }

                };

            }

        ]);

}());