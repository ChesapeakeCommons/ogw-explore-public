(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('textFilterComponent', [
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
                            'control/grid-filter/textFilterComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.setToken = function (token) {

                            if (!token) {

                                scope.config.token = undefined;

                            }

                            FilterManager.setToken(
                                scope.nodeType,
                                'textFilterComponent.setToken'
                            );

                        };

                    }

                };

            }

        ]);

}());