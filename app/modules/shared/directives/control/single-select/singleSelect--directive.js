(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('singleSelect', [
            '$window',
            'environment',
            'QueryParamManager',
            '$timeout',
            'Utility',
            function($window, environment, QueryParamManager,
                     $timeout, Utility) {
                return {
                    restrict: 'EA',
                    scope: {
                        'allowSearch': '=?',
                        'anchor': '@',
                        'attrKey': '@',
                        'autoPopulate': '@',
                        'autoSelect': '=?',
                        'dropdownMinWidth': '=?',
                        'fixedPosition': '=?',
                        'layout': '@',
                        'noop': '&',
                        'noopLabel': '@',
                        'options': '=?',
                        'placeholder': '@placeholder',
                        'postSelect': '&',
                        'selection': '=?',
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/single-select/singleSelect--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

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

                            if (!query) {

                                return scope.preparedOptions;

                            }

                            return scope.preparedOptions.filter(function(option) {
                                return option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                            });

                        };

                        scope.setSelection = function (token, noop) {

                            console.log(
                                'singleSelect:setSelection:token:',
                                token
                            );

                            scope.modalDisplay = {};

                            if (typeof scope.attrKey === 'string') {

                                scope.selectionFromObject(token);

                            } else {

                                scope.selectionLabel = token;

                                scope.selection = token;

                            }

                            console.log(
                                'singleSelect:setSelection:selection:',
                                scope.selection
                            );

                            console.log(
                                'singleSelect:setSelection:postSelect:',
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

                        };

                        scope.selectionFromObject = function (token) {

                            scope.options.forEach(function (item) {

                                if (item[scope.attrKey] === token) {

                                    scope.selection = item;

                                    scope.selectionLabel = token;

                                }

                            });

                        };

                        scope.$watch('options', function (newVal) {

                            if (Array.isArray(newVal)) {

                                console.log(
                                    'singleSelect.watch[options]:options:',
                                    newVal
                                );

                                console.log(
                                    'singleSelect.watch[options]:attrKey:',
                                    scope.attrKey
                                );

                                var cp = JSON.parse(JSON.stringify(newVal));

                                if (typeof scope.attrKey === 'string') {

                                    scope.options = Utility.sortCollection(cp, scope.attrKey);

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

                                    scope.preparedOptions = cp.sort();

                                }

                                console.log(
                                    'singleSelect.watch[options]:preparedOptions:',
                                    scope.preparedOptions
                                );

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

                            if (Utility.isObject(newVal)) {

                                if (typeof scope.attrKey !== 'string') return;

                                scope.selectionFromObject(newVal[scope.attrKey]);

                            } else {

                                if (typeof newVal !== 'string') {

                                    if (typeof scope.noopLabel === 'string') {

                                        scope.selection = scope.noopLabel;

                                    } else {

                                        if (scope.preparedOptions.length &&
                                            scope.autoSelect) {

                                            scope.selection = scope.preparedOptions[0];

                                        }

                                    }

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