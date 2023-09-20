(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('boolFilterComponent', [
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
                            'control/grid-filter/boolFilterComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.tokenQuery = undefined;

                        scope.setToken = function (token) {

                            // if (typeof token !== 'boolean') {
                            //
                            //     scope.config.token = undefined;
                            //
                            // }

                            scope.config.token = token;

                            FilterManager.setToken(
                                scope.nodeType,
                                'boolFilterComponent.setToken'
                            );

                        };

                    }

                };

            }

        ]);

}());