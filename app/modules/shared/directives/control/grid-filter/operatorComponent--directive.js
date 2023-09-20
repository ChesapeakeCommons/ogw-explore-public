(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('operatorComponent', [
            '$window',
            '$rootScope',
            '$timeout',
            'environment',
            'FilterManager',
            function($window, $rootScope, $timeout, environment, FilterManager) {
                return {
                    restrict: 'EA',
                    scope: {
                        'config': '=?',
                        'nodeType': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/operatorComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.filterOptions = function (query) {

                            if (!query) {

                                return scope.operators;

                            }

                            return scope.operators.filter(function(option) {
                                return option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                            });

                        };

                        scope.selectOperator = function (operator) {

                            scope.toggleModal('select');

                            FilterManager.setOperator(
                                scope.nodeType,
                                scope.config,
                                operator
                            );

                        };

                        scope.$watch('config.field', function (newVal) {

                            if (newVal) {

                                console.log(
                                    'operatorComponent:config:',
                                    newVal
                                );

                                scope.operators = FilterManager.getOperators(
                                    scope.config.field.type
                                );

                            }

                        });

                        scope.$on('globalClick', function (event, target) {

                            if (!element[0].contains(target)) {

                                scope.$apply(function () {

                                    scope.modalDisplay = {};

                                });

                            }

                        });

                    }

                };

            }

        ]);

}());