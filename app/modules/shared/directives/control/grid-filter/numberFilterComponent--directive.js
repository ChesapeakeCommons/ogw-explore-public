(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('numberFilterComponent', [
            '$window',
            '$rootScope',
            '$timeout',
            'environment',
            'FilterManager',
            'NodeNameMap',
            'Node',
            'Utility',
            function($window, $rootScope, $timeout, environment,
                     FilterManager, NodeNameMap, Node, Utility) {
                return {
                    restrict: 'EA',
                    scope: {
                        'config': '=?',
                        'nodeType': '=?',
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/numberFilterComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.tokenQuery = undefined;

                        scope.setToken = function (token) {

                            // scope.config.token = undefined;

                            // if (!Utility.isNumber(token)) {
                            //
                            //     scope.config.token = undefined;
                            //
                            // }

                            FilterManager.setToken(
                                scope.nodeType,
                                'numberFilterComponent.setToken'
                            );

                        };

                    }

                };

            }

        ]);

}());