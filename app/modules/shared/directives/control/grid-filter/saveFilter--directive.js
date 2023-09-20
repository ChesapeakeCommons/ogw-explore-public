(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('saveFilter', [
            '$window',
            '$rootScope',
            '$timeout',
            '$location',
            'environment',
            'QueryParamManager',
            'FilterManager',
            'TableFilterInterface',
            function($window, $rootScope, $timeout, $location, environment,
                     QueryParamManager, FilterManager, TableFilterInterface) {
                return {
                    restrict: 'EA',
                    scope: {
                        'modalDisplay': '=?',
                        'nodeType': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/saveFilter--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.data = {
                            name: undefined
                        };

                        scope.closeModal = function () {

                            scope.modalDisplay['saveView'] = false;

                        };

                        scope.forceClose = function(event) {

                            var target = event.target;

                            var className = target.className;

                            if (className.indexOf('creation-dialog-container') >= 0) {

                                scope.closeModal();

                            }

                        };

                        scope.saveView = function() {

                            var params = $location.search();

                            if (typeof params.filters === 'string') {
                                
                                scope.data.token = params.filters;
                                
                            }

                            var newFeature = new TableFilterInterface(scope.data);

                            newFeature.$save(function(successResponse) {

                                console.log(
                                    'saveFilter:saveView:successResponse:',
                                    successResponse
                                );

                                scope.alerts = [{
                                    'type': 'success',
                                    'flag': 'Success!',
                                    'msg': 'View saved.',
                                    'prompt': 'OK'
                                }];

                                scope.nodeType.table_filters.unshift(successResponse);

                                scope.closeModal();

                            }, function(errorResponse) {

                                console.log(
                                    'saveFilter:saveView:errorResponse:',
                                    errorResponse
                                );

                                scope.alerts = [{
                                    'type': 'error',
                                    'flag': 'Error!',
                                    'msg': 'Something went wrong while saving this view.',
                                    'prompt': 'OK'
                                }];

                            });

                        };

                        scope.$watch('nodeType', function (newVal) {

                            if (newVal) {

                                scope.data.node_type_id = scope.nodeType.id;

                            }

                        });

                    }

                };

            }

        ]);

}());