(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('gridSort', [
            '$window',
            '$rootScope',
            '$timeout',
            'environment',
            'QueryParamManager',
            'Utility',
            'FilterManager',
            function($window, $rootScope, $timeout, environment,
                     QueryParamManager, Utility, FilterManager) {
                return {
                    restrict: 'EA',
                    scope: {
                        'collection': '@collection',
                        'columns': '=?',
                        'displayStates': '=?',
                        'features': '=?',
                        'modalDisplay': '=?',
                        'nodeType': '=?',
                        'params': '=?',
                        'trackName': '=?',
                        'update': '&'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/grid-sort/gridSort--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.sortOrder = 'asc';

                        scope.fields = FilterManager.getFields();

                        scope.toggleModal = function () {

                            scope.modalDisplay.select = !scope.modalDisplay.select;

                        };

                        scope.filterOptions = function (query) {

                            if (!query) {

                                return scope.fields;

                            }

                            return scope.fields.filter(function(option) {
                                return option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                            });

                        };

                        scope.setField = function (field) {

                            scope.sortField = field;

                            scope.params.sort = field.key + ':' + scope.sortOrder;

                            QueryParamManager.setParams(scope.params);

                            scope.toggleModal();

                            scope.dispatch();

                        };

                        scope.setOrder = function (order) {

                            scope.sortOrder = order;

                            scope.params.sort = scope.sortField.key + ':' + order;

                            QueryParamManager.setParams(scope.params);

                            scope.update({
                                params: scope.params
                            });

                            scope.dispatch();

                        };

                        scope.dispatch = function (initial) {

                            console.log(
                                'dispatch:initial',
                                initial
                            );

                            console.log(
                                'dispatch:field',
                                scope.sortField
                            );

                            console.log(
                                'dispatch:order',
                                scope.sortOrder
                            );

                            if (initial && scope.sortField.key === 'id') return;

                            $timeout(function () {

                                $rootScope.$broadcast(
                                    'set:sortField',
                                    scope.sortField,
                                    scope.sortOrder,
                                    scope.nodeType
                                );

                            }, 50);

                        };

                        scope.$watch('columns', function (newVal) {

                            if (Array.isArray(newVal)) {

                                var arr = [];

                                newVal.forEach(function (column) {

                                    if (!column.sortable) return;

                                    // var datum = {
                                    //     key: column.key,
                                    //     label: column.name,
                                    //     type: column.type.split('_')[0]
                                    // };

                                    if (column.name && !column.label) {
                                        column.label = column.name;
                                    }
                                    column.type = column.type.split('_')[0];

                                    if (column.key.startsWith('enum')) {

                                        column.options = column.options ? column.options.sort() : [];

                                    }

                                    if (column.key.startsWith('relation') &&
                                        !scope.nodeType.composite) {

                                        var label;

                                        if (column.source) {

                                            label = [
                                                column.relation_type,
                                                ' (',
                                                column.name,
                                                ')'
                                            ].join('');

                                        } else {

                                            label = [
                                                column.node_type,
                                                ' (',
                                                column.name,
                                                ')'
                                            ].join('');

                                        }

                                        column.label = label;

                                    }

                                    arr.push(column);

                                });

                                // Utility.sortCollection(arr, 'label');

                                arr = scope.fields.concat(arr);

                                scope.fields = Utility.sortCollection(arr, 'label');

                                console.log(
                                    'gridSort:watch:columns:',
                                    scope.fields
                                );

                                try {

                                    scope.fields.forEach(function (field) {

                                        var sort = scope.params.sort;

                                        var i = sort.lastIndexOf(':');
                                        var key = sort.substring(0, i);
                                        var order = sort.substring(i + 1, sort.length);

                                        // var tokens = scope.params.sort.split(':');

                                        if (field.key === key) {

                                            scope.sortField = field;

                                        }

                                        if (['asc', 'desc'].indexOf(order) >= 0) {

                                            scope.sortOrder = order;

                                        }

                                        console.log(
                                            'gridSort:columns:sortOrder',
                                            order
                                        );

                                    });

                                } catch (e) {

                                    console.warn(
                                        'gridSort:columns:error',
                                        e
                                    );

                                    scope.sortField = scope.fields[0];

                                }

                            }

                        });

                        scope.$on('globalClick', function (event, target) {

                            console.log(
                                'globalClick:tableView:event:',
                                event
                            );

                            console.log(
                                'globalClick:collectionFilter:target:',
                                target
                            );

                            if (!element[0].contains(target)) {

                                $timeout(function() {

                                    scope.$apply(function () {

                                        console.log(
                                            'globalClick:collectionFilter:event:$apply'
                                        );

                                        scope.modalDisplay = {};

                                    });

                                });

                            }

                        });

                        scope.$on('table:ready',
                            function (event) {

                                console.log(
                                    'table:ready:event:',
                                    event
                                );

                                scope.dispatch(true);

                            }
                        );

                        scope.$on('load:frame',
                            function (event) {

                                console.log(
                                    'load:frame:event:',
                                    event
                                );

                                scope.dispatch();

                            }
                        );

                        // scope.$on("$locationChangeStart", function() {
                        //
                        //     scope.filters = [];
                        //
                        // });

                    }

                };

            }

        ]);

}());