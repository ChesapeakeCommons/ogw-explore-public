(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('gridFilter', [
            '$window',
            '$rootScope',
            '$timeout',
            '$location',
            'environment',
            'QueryParamManager',
            'FilterManager',
            'TableFilterInterface',
            'NodeNameMap',
            'Utility',
            function($window, $rootScope, $timeout, $location, environment,
                     QueryParamManager, FilterManager, TableFilterInterface,
                     NodeNameMap, Utility) {
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
                            'control/grid-filter/gridFilter--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.operators = FilterManager.getOperators('date');

                        scope.token = undefined;

                        scope.tokenIdx = [];

                        // scope.filters = FilterManager.getFilters();

                        scope.fields = FilterManager.getFields();

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.forceClose = function(event) {

                            var target = event.target;

                            var className = target.className;

                            if (className.indexOf('creation-dialog-container') >= 0) {

                                scope.toggleModal('dialog');

                            }

                        };

                        scope.addFilter = function(event) {

                            FilterManager.createFilter(
                                scope.nodeType
                            );

                            scope.filters = FilterManager.getFilters(
                                scope.nodeType
                            );

                        };

                        scope.removeFilter = function(idx) {

                            scope.params.page = 1;

                            FilterManager.removeFilter(
                                scope.nodeType,
                                idx
                            );

                        };

                        scope.removeAll = function() {

                            scope.params.page = 1;

                            FilterManager.removeAll(
                                scope.nodeType
                            );

                            scope.filters = FilterManager.getFilters(
                                scope.nodeType
                            );

                        };

                        scope.applyFilters = function() {

                            scope.params.page = 1;

                            FilterManager.setToken(
                                scope.nodeType,
                                'gridFilter.applyFilters'
                            );

                            scope.toggleModal('dialog');

                        };

                        scope.receiveOperator = function() {

                            FilterManager.setToken(
                                scope.nodeType,
                                'gridFilter.receiveOperator'
                            );

                            // scope.toggleModal('dialog');

                        };

                        scope.indexFields = function () {

                            var fieldIdx = {};

                            scope.fields.forEach(function (field) {

                                fieldIdx[field.key] = field;

                            });

                            scope.fieldIdx = fieldIdx;

                        };

                        scope.parseLogicOperator = function (config, segments) {

                            var op = decodeURIComponent(segments.pop()).toUpperCase();

                            var domain = [
                                'AND',
                                'OR'
                            ];

                            if (domain.indexOf(op) >= 0) {

                                config.logicOperator = op;

                            }

                            return config;

                        };

                        scope.parseToken = function (field, value) {

                            var fieldType = field.key.split(':')[0];

                            switch (fieldType) {

                                // case 'bool':
                                //
                                //     return Utility.parseBoolean(value);

                                // case 'integer':
                                //
                                //     return Utility.parseNumber(value);
                                //
                                // case 'float':
                                //
                                //     return Utility.parseNumber(value);

                                default:

                                    return value;

                            }

                        };

                        scope.parseFilter = function (token, replace) {

                            replace = (typeof replace === 'boolean') ? replace : false;

                            if (scope.tokenIdx.indexOf(token) >= 0 &&
                                !replace) return;

                            try {

                                scope.tokenIdx.push(token);

                                var segments = token.split('|');

                                console.log(
                                    'gridFilter:parseFilter:segments:',
                                    segments
                                );

                                var field = scope.fieldIdx[segments[0]];

                                if (field && field.key) {

                                    console.log(
                                        'gridFilter:parseFilter:match:',
                                        field
                                    );

                                    var config = {};

                                    config.field = field;

                                    if (segments.length > 1) {

                                        var operators = FilterManager.getOperators(
                                            field.type
                                        );

                                        for (var i = 0; i < operators.length; i++) {

                                            var operator = operators[i];

                                            if (operator.key === segments[1]) {

                                                console.log(
                                                    'gridFilter:watch:columns:opMatch:',
                                                    segments[1],
                                                    operator.key
                                                );

                                                config.operator = operator;

                                            }

                                        }

                                    }

                                    if (segments.length > 2) {

                                        var decodedToken = decodeURIComponent(segments[2]);

                                        config.token = scope.parseToken(field, decodedToken);

                                    }

                                    scope.parseLogicOperator(config, segments);

                                    // scope.filters.push(config);

                                    FilterManager.addFilter(
                                        scope.nodeType,
                                        config
                                    );

                                    console.log(
                                        'gridFilter:parseFilter:filters:',
                                        FilterManager.getFilters(
                                            scope.nodeType
                                        )
                                    );

                                }

                            } catch (e) {

                                console.warn(
                                    'gridFilter:parseFilter:error:',
                                    e
                                );

                                //

                            }

                        };

                        scope.extractFilters = function (params, replace) {

                            replace = (typeof replace === 'boolean') ? replace : false;

                            try {

                                var data = decodeURIComponent(params.filters);

                                console.log(
                                    'gridFilter:extractFilters:data:',
                                    data
                                );

                                var str = atob(data);

                                console.log(
                                    'gridFilter:extractFilters:str:',
                                    str
                                );

                                var tokens = str.split('+');

                                console.log(
                                    'gridFilter:extractFilters:tokens:',
                                    tokens
                                );

                                tokens.forEach(function (token) {

                                    scope.parseFilter(token, replace);

                                });

                                scope.filters = FilterManager.getFilters(
                                    scope.nodeType
                                );

                                console.log(
                                    'gridFilter:extractFilters:filters:',
                                    scope.filters
                                );

                            } catch (e) {

                                console.warn(
                                    'gridFilter:extractFilters:error:',
                                    e
                                );

                                //

                            }

                        };

                        scope.$watch('columns', function (newVal) {

                            if (Array.isArray(newVal)) {

                                var arr = [];

                                newVal.forEach(function (column) {

                                    if (!column.filterable) return;

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

                                arr = scope.fields.concat(arr);

                                scope.fields = Utility.sortCollection(arr, 'label');

                                scope.indexFields();

                                scope.extractFilters(scope.params);

                                scope.ready = true;

                            }

                        });

                        // scope.$watch('newField', function (newVal) {
                        //
                        //     if (newVal) {
                        //
                        //         scope.setField(newVal, null, 'gridFilter');
                        //
                        //     }
                        //
                        // });

                        scope.$watch('params', function (newVal) {

                            //
                            // Only trigger filter processing on initial
                            // load of URL params. The `FilterManager`
                            // service will handle subsequent updates.
                            //

                            if (newVal && scope.ready && !scope.tokenIdx) {

                                scope.extractFilters(newVal);

                                FilterManager.setToken(
                                    scope.nodeType,
                                    'gridFilter.$watch.params'
                                );

                            }

                        });

                        // scope.$on('table:ready',
                        //     function (event) {
                        //
                        //         console.log(
                        //             'table:ready:event:',
                        //             event
                        //         );
                        //
                        //         FilterManager.setToken();
                        //
                        //         // scope.setToken(scope.token);
                        //
                        //     }
                        // );

                        scope.$on('load:frame',
                            function (event) {

                                console.log(
                                    'load:frame:event:',
                                    event
                                );

                                scope.extractFilters(scope.params);

                                FilterManager.setToken(
                                    scope.nodeType,
                                    'gridFilter.$on.load:frame'
                                );

                            }

                        );

                        scope.$on('set:queryParams',
                            function (
                                event, params) {

                                console.log(
                                    'set:queryParams:event:',
                                    event
                                );

                                console.log(
                                    'set:queryParams:params:',
                                    params
                                );

                                FilterManager.removeAll(
                                    scope.nodeType,
                                    false,
                                    false
                                );

                                scope.filters = FilterManager.getFilters(
                                    scope.nodeType
                                );

                                $location.search(params);

                                scope.extractFilters(params, true);

                                console.log(
                                    'set:queryParams:filters:',
                                    scope.filters
                                );

                                FilterManager.setToken(
                                    scope.nodeType,
                                    'gridFilter.$on.set:queryParams'
                                );

                            }

                        );

                        scope.$on('$destroy', function() {

                            FilterManager.removeAll(
                                scope.nodeType,
                                false,
                                false
                            );

                        });

                    }

                };

            }

        ]);

}());