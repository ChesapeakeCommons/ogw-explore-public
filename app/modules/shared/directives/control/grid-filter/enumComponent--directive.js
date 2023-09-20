(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('enumComponent', [
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
                            'control/grid-filter/enumComponent--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        var arrayOps = [
                            'eq',
                            'all',
                            'any'
                        ];

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.styleConfig = {
                            enum: {
                                selectionSpan: {
                                    background: '#dbddfd',
                                    padding: '4px 6px',
                                    'border-radius': '0.25rem'
                                }
                            },
                            relation: {
                                selectionSpan: {
                                    background: '#c8e5fc',
                                    padding: '4px 6px',
                                    'border-radius': '0.25rem'
                                }
                            }
                        };

                        scope.listInput = true;

                        scope.selectionIdx = {};

                        scope.tokenQuery = undefined;

                        scope.fixedDomain = [];

                        scope.relationTypeKey = undefined;

                        scope.btnPlaceholder = 'Select category';

                        scope.nameDomain = function () {

                            if (scope.config && scope.relationTypeKey) {

                                scope.fixedDomain = scope.nameMap[scope.relationTypeKey];

                                scope.buildIndex(scope.fixedDomain);

                                // $timeout(function () {
                                //
                                //     scope.adjustStyles(scope.config);
                                //
                                // }, 25);

                            }

                        };

                        scope.loadNameMap = function () {

                            scope.nameMap = NodeNameMap.getIndex();

                            console.log(
                                'enumComponent:nameMap:',
                                scope.nameMap);

                            if (!angular.isDefined(scope.nameMap)) {

                                Node.nameMap({}).$promise.then(function (successResponse) {

                                    console.log(
                                        'enumComponent:nameMap:successResponse',
                                        successResponse);

                                    NodeNameMap.setIndex(successResponse);

                                    scope.nameMap = NodeNameMap.getIndex();

                                    scope.nameDomain();

                                }, function (errorResponse) {

                                    console.log(
                                        'enumComponent:nameMap:errorResponse',
                                        errorResponse);

                                });

                            } else {

                                scope.nameDomain();

                            }

                        };

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.adjustStyles = function (config) {

                            var btnSelector = config.field.key + '-select-btn';

                            var btn = document.getElementById(btnSelector);

                            if (scope.firstSelection) {

                                btn.style.background = '#F5F5F5';

                                btn.style.padding = '0.4rem 0.2rem';

                                btn.style.border = '1px solid #E0E0E0';

                            } else {

                                btn.style.background = '#E0E0E0';

                                btn.style.padding = '.4rem .5rem .4rem .75rem;';

                                btn.style.border = 'none';

                            }

                        };

                        scope.extractValues = function (arr, idx) {

                            try {

                                var tokens = scope.config.token.split('::');

                                arr.forEach(function (datum) {

                                    if (tokens.indexOf(datum) >= 0) {

                                        idx[datum] = true;

                                    }

                                });

                            } catch (e) {

                                console.warn(
                                    'enumComponent:extractValues:errorResponse',
                                    e);

                                return idx;

                            }

                        };

                        scope.getConjunctiveOp = function () {

                            return scope.config.operator.key === 'all' ? 'AND' : 'OR';

                        };

                        scope.labelFromIndex = function (idx) {

                            scope.selectionSuffix = undefined;

                            try {

                                var selections = Object.keys(idx);

                                scope.firstSelection = selections[0];

                                if (selections.length > 1) {

                                    var suffix = (selections.length - 1) === 1 ? 'other' : 'others';

                                    var operator = scope.getConjunctiveOp();

                                    scope.selectionSuffix = [
                                        operator,
                                        selections.length - 1,
                                        suffix
                                    ].join(' ');

                                }

                            } catch (e) {

                                scope.firstSelection = undefined;

                            }

                        };

                        scope.buildIndex = function (arr) {

                            var selectionIdx = {};

                            scope.extractValues(arr, selectionIdx);

                            scope.selectionIdx = selectionIdx;

                            scope.labelFromIndex(selectionIdx);

                        };

                        scope.filterOptions = function (query) {

                            if (!query) {

                                return scope.fixedDomain;

                            }

                            return scope.fixedDomain.filter(function(option) {
                                return option.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                            });

                        };

                        scope.setToken = function (token, toggle) {

                            toggle = (typeof toggle === 'boolean') ? toggle : true;

                            if (toggle) scope.toggleModal('select');

                            if (!token) {

                                scope.config.token = undefined;

                                scope.buildIndex(scope.fixedDomain);

                                FilterManager.setToken(
                                    scope.nodeType,
                                    'enumComponent.setToken'
                                );

                                return;

                            }

                            console.log(
                                'enumComponent:setToken:selectionIdx:',
                                scope.selectionIdx
                            );

                            var varType = FilterManager.getVarType(scope.config);

                            var specialTypes = ['enum', 'relation'];

                            if (specialTypes.indexOf(varType) >= 0) {

                                if (scope.selectionIdx.hasOwnProperty(token)) {

                                    delete scope.selectionIdx[token];

                                } else {

                                    scope.selectionIdx[token] = true;

                                }

                                console.log(
                                    'enumInput:setToken:selectionIdx[2]:',
                                    scope.selectionIdx
                                );

                                if (arrayOps.indexOf(scope.config.operator.key) >= 0) {

                                    scope.config.token = Object.keys(scope.selectionIdx).join('::');

                                    scope.labelFromIndex(scope.selectionIdx);

                                } else {

                                    scope.config.token = token;

                                }

                            } else {

                                scope.config.token = token;

                            }

                            FilterManager.setToken(
                                scope.nodeType,
                                'enumComponent.setToken'
                            );

                        };

                        scope.checkOperator = function () {

                            try {

                                scope.listInput = arrayOps.indexOf(scope.config.operator.key) >= 0;

                            } catch (e) {

                                scope.listInput = true;

                            }

                        };

                        scope.$watch('config', function (newVal, oldVal) {

                            if (Utility.isObject(newVal)) {

                                console.log(
                                    'enumComponent:config:',
                                    newVal);

                                scope.checkOperator();

                                scope.fixedDomain = [];

                                var field = newVal.field;

                                console.log(
                                    'enumComponent:config:field',
                                    field);

                                if (field.key.startsWith('relation')) {

                                    scope.btnPlaceholder = 'Select records';

                                    scope.styleKey = 'relation';

                                    if (field.source) {

                                        scope.relationTypeKey = Utility.machineName(
                                            field.relation_type
                                        );

                                    } else {

                                        scope.relationTypeKey = Utility.machineName(
                                            field.node_type
                                        );

                                    }

                                    console.log(
                                        'enumComponent:config:relationTypeKey',
                                        scope.relationTypeKey);

                                    scope.loadNameMap();

                                }

                                if (field.key.startsWith('enum') &&
                                    Array.isArray(field.options)) {

                                    scope.styleKey = 'enum';

                                    scope.fixedDomain = field.options;

                                    // $timeout(function () {
                                    //
                                    //     scope.adjustStyles(scope.config);
                                    //
                                    // }, 25);

                                }

                                console.log(
                                    'enumComponent:config:fixedDomain',
                                    scope.fixedDomain);

                                scope.buildIndex(scope.fixedDomain);

                                // $timeout(function () {
                                //
                                //     scope.adjustStyles(scope.config);
                                //
                                // }, 25);

                            }

                        }, true);

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