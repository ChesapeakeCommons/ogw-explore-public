(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('breadcrumb', [
            'environment',
            '$timeout',
            'AppConfig',
            function (environment, $timeout, AppConfig) {
                return {
                    restrict: 'EA',
                    scope: {
                        'datum': '=?',
                        'metric': '=?',
                        'node': '=?',
                        'organization': '=?',
                        'pad': '=?',
                        'facility': '=?',
                        'program': '=?',
                        'project': '=?',
                        'permit': '=?',
                        'rootPath': '@',
                        'site': '=?',
                        'tail': '@',
                        'variable': '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'breadcrumb/breadcrumb--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        //
                        // Additional scope vars.
                        //

                        scope.calcAvailWidth = function () {

                            var parent = document.querySelector(
                                '.breadcrumb');

                            var parentWidth;

                            if (parent) {

                                parentWidth = (parent.clientWidth * 0.90);

                            }

                            var anchorEls = document.querySelectorAll(
                                '.anchor');

                            var anchorWidth = 0;

                            for (var i = 0; i < anchorEls.length; i++) {

                                var el = anchorEls[i];

                                anchorWidth += el.clientWidth;

                            }

                            return parentWidth - anchorWidth;

                        };

                        scope.setBasis = function () {

                            //
                            // The following conditions are abortive.
                            //

                            // if (scope.permit && !scope.practice) return;
                            //
                            // if (scope.practice && !scope.project) return;
                            //
                            // if (scope.site && !scope.project) return;

                            $timeout(function () {

                                var collapseEls = document.querySelectorAll(
                                    '.breadcrumb div:not(.anchor)');

                                var count = collapseEls.length;

                                scope.basis = Math.floor(scope.calcAvailWidth() / count);

                                console.log(
                                    'scope.basis',
                                    scope.basis
                                );

                            }, 50)

                        };

                        scope.$watch('metric', function (newVal) {

                            scope.setBasis();

                        });

                        scope.$watch('facility', function (newVal) {

                            scope.setBasis();

                        });

                        scope.$watch('node', function (newVal) {

                            scope.setBasis();

                            if (newVal) {

                                var nodeTypes = AppConfig.nodeTypes;

                                var nodeType = newVal.node_type.normalized_name;

                                console.log(
                                    'breadcrumb:node:nodeType:',
                                    nodeType);

                                nodeTypes.forEach(function (type) {

                                    if (type.normalized_name === nodeType) {

                                        scope.nodeType = type;

                                    }

                                });

                            }

                        });

                        scope.$watch('variable', function (newVal) {

                            scope.setBasis();

                        });

                    }

                };

            }

        ]);

}());