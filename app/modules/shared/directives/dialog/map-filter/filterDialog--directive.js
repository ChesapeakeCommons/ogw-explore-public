(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('filterDialog', [
            'environment',
            '$routeParams',
            '$filter',
            '$parse',
            '$location',
            '$timeout',
            'Utility',
            'DialogDispatch',
            function (
                environment,
                $routeParams,
                $filter,
                $parse,
                $location,
                $timeout,
                Utility,
                DialogDispatch
            ) {
                return {
                    restrict: 'EA',
                    scope: {
                        'featureCollection': '=?',
                        'map': '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'dialog/map-filter/filterDialog--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        scope.config = {
                            mode: 'facility'
                        };

                        scope.toggleModal = function () {

                            scope.config.visible = !scope.config.visible;

                            DialogDispatch.resetScroll();

                        };

                        scope.forceClose = function (event) {

                            var target = event.target;

                            var className = target.className;

                            if (className.indexOf('creation-dialog-container') >= 0) {

                                scope.toggleModal();

                            }

                        };

                        scope.setMode = function (mode) {
                            scope.config.mode = mode;
                        };

                        scope.setFilters = function () {
                            DialogDispatch.send(
                                'mapFilters:set'
                            );
                        };

                        scope.reset = function () {
                            DialogDispatch.send(
                                'mapFilters:reset'
                            );
                        };

                        scope.toggleHelp = function () {
                            scope.config.showHelp = !scope.config.showHelp;
                        };

                        scope.$on('mapFilters:display', function (event, data) {

                            console.log(
                                'filterDialog.mapFilters:display:event:',
                                event
                            );

                            console.log(
                                'filterDialog.mapFilters:display:data:',
                                data
                            );

                            scope.config.visible = true;

                        });

                    }

                };

            }

        ]);

}());