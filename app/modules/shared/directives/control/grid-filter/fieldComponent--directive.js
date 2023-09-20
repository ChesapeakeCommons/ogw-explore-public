(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('fieldComponent', [
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
                        'fields': '=?',
                        'nodeType': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/fieldComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (typeof scope.btnMinWidth !== 'number') {

                            scope.btnMinWidth = 200;

                        }

                        if (typeof scope.btnMaxWidth !== 'number') {

                            scope.btnMaxWidth = 200;

                        }

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.filterOptions = function (query) {

                            if (!query) {

                                return scope.fields;

                            }

                            return scope.fields.filter(function(option) {
                                return option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                            });

                        };

                        scope.selectField = function (field) {

                            scope.toggleModal('select');

                            FilterManager.setField(
                                scope.nodeType,
                                scope.config,
                                field,
                                'fieldComponent'
                            );

                        };

                        scope.$watch('fields', function (newVal) {

                            if (Array.isArray(newVal)) {

                                console.log(
                                    'fieldComponent:fields:',
                                    newVal
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