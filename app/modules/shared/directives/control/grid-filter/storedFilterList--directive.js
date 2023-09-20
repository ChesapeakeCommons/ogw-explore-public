(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('storedFilterList', [
            '$window',
            '$rootScope',
            '$timeout',
            '$location',
            'environment',
            'TableFilterInterface',
            'FilterManager',
            function($window, $rootScope, $timeout, $location, environment,
                     TableFilterInterface, FilterManager) {
                return {
                    restrict: 'EA',
                    scope: {
                        'items': '=?',
                        'modalDisplay': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-filter/storedFilterList--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.activeView = undefined;

                        scope.modalDisplay = {};

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.applyView = function (view) {

                            // FilterManager.removeAll();

                            scope.activeView = view;

                            var params = $location.search();

                            // delete params.filters;

                            params.filters = view.token;

                            // $location.search(params);

                            $rootScope.$broadcast('set:queryParams', params);

                            scope.modalDisplay = {};

                        };

                        scope.deleteView = function(target, index) {

                            TableFilterInterface.delete({
                                id: target.id
                            }).$promise.then(function(successResponse) {

                                scope.items.splice(index, 1);

                            }, function(errorResponse) {

                                console.log(
                                    'nodeFormDialog:deleteDatum:errorResponse:',
                                    errorResponse
                                );

                            });

                        };

                        scope.$on('globalClick', function (event, target) {

                            if (!element[0].contains(target)) {

                                $timeout(function() {

                                    scope.$apply(function () {

                                        scope.modalDisplay = {};

                                    });

                                });

                            }

                        });

                    }

                };

            }

        ]);

}());