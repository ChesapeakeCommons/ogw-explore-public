(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('multiSelect', [
            '$window',
            'environment',
            'QueryParamManager',
            '$timeout',
            function($window, environment, QueryParamManager, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        'allowSearch': '=?',
                        'anchor': '@',
                        'attrKey': '@',
                        'autoPopulate': '@',
                        'autoSelect': '=?',
                        'clearOnSelect': '=?',
                        'disableInputs': '=?',
                        'dropdownMinWidth': '=?',
                        'fixedPosition': '=?',
                        'fontSize': '=?',
                        'layout': '@',
                        'noop': '&',
                        'noopLabel': '@',
                        'options': '=?',
                        'placeholder': '@placeholder',
                        'postSelect': '&',
                        'selection': '=?',
                        'selectionIdx': '=?',
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/multi-select/multiSelect--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (typeof scope.disableInputs !== 'boolean') {

                            scope.disableInputs = false;

                        }

                        if (typeof scope.closeOnSelect !== 'boolean') {

                            scope.closeOnSelect = false;

                        }

                        if (typeof scope.clearOnSelect !== 'boolean') {

                            scope.clearOnSelect = false;

                        }

                        scope.query = {
                            token: undefined
                        };

                        var anchorOptions = [
                            'bottom',
                            'middle',
                            'top',
                        ];

                        if (anchorOptions.indexOf(scope.anchor) < 0) {

                            scope.anchor = 'middle';

                        }

                        scope.styleConfig = {
                            'default': {
                                'margin': {
                                    'radio': '0 1rem 0 0'
                                },
                                'padding': {
                                    'label': '1rem'
                                }
                            },
                            'snug': {
                                'margin': {
                                    'radio': '0 0.5rem 0 0'
                                },
                                'padding': {
                                    'label': '0.5rem 0.75rem'
                                }
                            }
                        };

                        if (typeof scope.layout !== 'string') {

                            scope.layout = 'default';

                        }

                        if (typeof scope.fixedPosition !== 'boolean') {

                            scope.fixedPosition = false;

                        }

                        if (typeof scope.fontSize !== 'number') {

                            scope.fontSize = 0.875;

                        }

                        scope.topMargin = '0';

                        if (scope.fixedPosition) scope.topMargin = '-1000%';

                        scope.buttonId = Math.random().toString(36).slice(2);

                        scope.modalId = Math.random().toString(36).slice(2);

                        if (typeof scope.dropdownMinWidth !== 'number') {

                            scope.dropdownMinWidth = 240;

                        }

                        scope.modalDisplay = {};

                        scope.preparedOptions = [];

                        scope.selectionLabel = undefined;

                        scope.positionFixedModal = function () {

                            var button = document.getElementById(scope.buttonId);

                            var buttonPosition = button.getBoundingClientRect();

                            var modal = document.getElementById(scope.modalId);

                            if (!modal) return;

                            modal.style.position = 'fixed';

                            if (scope.anchor === 'bottom') {

                                modal.style.top = (buttonPosition.bottom + 10 - modal.offsetHeight) + 'px';

                            } else if (scope.anchor === 'top'){

                                modal.style.top = (buttonPosition.top - 10) + 'px';

                            } else {

                                var middle = Math.abs(buttonPosition.bottom - buttonPosition.top);

                                var offset = (modal.offsetHeight / 2) + (middle / 2);

                                modal.style.top = (buttonPosition.bottom - offset) + 'px';

                            }

                            modal.style.left = buttonPosition.left + 'px';

                            modal.style.marginTop = '0';

                        };

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            $timeout(function () {

                                scope.modalDisplay[key] = !visible;

                            }, 0);

                            if (scope.fixedPosition) {

                                $timeout(function () {

                                    scope.positionFixedModal();

                                }, 10);

                            }

                        };

                        scope.filterOptions = function (query) {

                            // console.log(
                            //     'multiSelect:filterOptions:query:',
                            //     query
                            // );
                            //
                            console.log(
                                'multiSelect:filterOptions:query.token:',
                                scope.query.token
                            );
                            //
                            // console.log(
                            //     'multiSelect:filterOptions:attrKey:',
                            //     scope.attrKey
                            // );
                            //
                            // console.log(
                            //     'multiSelect:filterOptions:preparedOptions:',
                            //     scope.preparedOptions
                            // );

                            if (!scope.query.token) {

                                return scope.preparedOptions;

                            }

                            // $timeout(function () {

                            return scope.preparedOptions.filter(function(option) {

                                // console.log(
                                //     'multiSelect:filterOptions:option:',
                                //     option
                                // );

                                var token;

                                if (typeof scope.attrKey === 'string') {

                                    token = option[scope.attrKey];

                                } else {

                                    token = option;

                                }

                                try {

                                    return token.toLowerCase().indexOf(scope.query.token.toLowerCase()) >= 0;

                                } catch (e) {

                                    return false;

                                }

                            });

                            // }, 100);

                        };

                        scope.setSelection = function (token, noop) {

                            console.log(
                                'multiSelect:setSelection:token:',
                                token
                            );

                            // event.preventDefault();

                            if (scope.closeOnSelect) {

                                scope.modalDisplay = {};

                            }

                            if (typeof scope.attrKey === 'string') {

                                scope.options.forEach(function (item) {

                                    if (item[scope.attrKey] === token) {

                                        scope.selection = item;

                                        scope.selectionLabel = token;

                                    }

                                });

                            } else {

                                scope.selectionLabel = token;

                                scope.selection = token;

                            }

                            if (scope.selectionIdx) {

                                if (scope.selectionIdx.hasOwnProperty(token)) {

                                    delete scope.selectionIdx[token];

                                } else {

                                    scope.selectionIdx[token] = true;

                                }

                                // scope.selectionIdx[token] = (
                                //     scope.selectionIdx.hasOwnProperty(token) ?
                                //     !scope.selectionIdx[token] : true
                                // );

                            }

                            console.log(
                                'multiSelect:setSelection:selection:',
                                scope.selection
                            );

                            console.log(
                                'multiSelect:setSelection:selectionIdx:',
                                scope.selectionIdx
                            );

                            console.log(
                                'multiSelect:setSelection:postSelect:',
                                scope.postSelect
                            );

                            if (scope.postSelect) {

                                if (typeof scope.selection === 'string') {

                                    scope.postSelect({
                                        token: token
                                    });

                                } else {

                                    scope.postSelect({
                                        selection: scope.selection
                                    });

                                }

                            }

                            if (noop && scope.noop) {

                                scope.noop({});

                            }

                            scope.query.token = undefined;

                            if (scope.clearOnSelect) {

                                scope.selection = undefined;

                            }

                        };

                        scope.$watch('options', function (newVal) {

                            if (Array.isArray(newVal)) {

                                console.log(
                                    'multiSelect:options:',
                                    newVal
                                );

                                console.log(
                                    'multiSelect:attrKey:',
                                    scope.attrKey
                                );

                                var cp = JSON.parse(JSON.stringify(newVal));

                                if (typeof scope.attrKey === 'string') {

                                    scope.selection = {};

                                    var key = scope.attrKey;

                                    var options = [];

                                    cp.forEach(function (item) {

                                        if (item.hasOwnProperty(key)) {

                                            options.push(item[key]);

                                        }

                                    });

                                    if (options.length === newVal.length) {

                                        scope.preparedOptions = options;

                                    }

                                } else {

                                    scope.selection = '';

                                    scope.preparedOptions = cp.filter(function (option) {
                                        return option && option.length > 0;
                                    });

                                }

                            } else {

                                if (scope.autoPopulate === 'true-false') {

                                    scope.preparedOptions = [
                                        'True',
                                        'False'
                                    ];

                                }

                                if (scope.autoPopulate === 'yes-no') {

                                    scope.preparedOptions = [
                                        'Yes',
                                        'No'
                                    ];

                                }

                                if (scope.autoPopulate === 'and-or') {

                                    scope.preparedOptions = [
                                        'And',
                                        'Or'
                                    ];

                                }

                            }

                            if (scope.fixedPosition) {

                                scope.positionFixedModal();

                            }

                        }, true);

                        scope.$watch('selection', function (newVal, oldVal) {

                            if (typeof newVal !== 'string') {

                                if (scope.preparedOptions.length &&
                                    scope.autoSelect) {

                                    scope.selection = scope.preparedOptions[0];

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

                                scope.$apply(function () {

                                    console.log(
                                        'globalClick:collectionFilter:event:$apply'
                                    );

                                    scope.modalDisplay = {};

                                });

                            }

                        });

                    }

                };

            }

        ]);

}());