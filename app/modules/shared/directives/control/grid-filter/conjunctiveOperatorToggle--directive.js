(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('conjunctiveOperatorToggle', [
            '$window',
            '$rootScope',
            '$timeout',
            'environment',
            'FilterManager',
            'Utility',
            function($window, $rootScope, $timeout,
                     environment, FilterManager, Utility) {
                return {
                    restrict: 'EA',
                    scope: {
                        'config': '=?',
                        'nodeType': '=?',
                        'postSelect': '&'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/conjunctiveOperatorToggle--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.selectOperator = function (operator) {

                            scope.config.logicOperator = operator;

                            scope.postSelect({});

                        };

                        scope.$watch('config', function (newVal) {

                            if (Utility.isObject(newVal)) {

                                console.log(
                                    'conjunctiveOperatorToggle:config:',
                                    newVal
                                );

                            }

                        });

                    }

                };

            }

        ]);

}());