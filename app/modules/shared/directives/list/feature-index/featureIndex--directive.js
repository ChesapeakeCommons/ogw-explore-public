(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('featureIdx', [
            'environment',
            '$window',
            '$timeout',
            '$location',
            'AnchorScroll',
            function (environment, $window, $timeout, $location, AnchorScroll) {
                return {
                    restrict: 'EA',
                    scope: {
                        'dismissable': '=?',
                        'featureType': '@featureType',
                        'includeActions': '=?',
                        'index': '=?',
                        'letters': '=?',
                        'link': '@link',
                        'permissions': '=?',
                        'practice': '=?',
                        'practiceType': '=?',
                        'program': '=?',
                        'selectable': '@selectable',
                        'summary': '=?',
                        'visible': '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'list/feature-index/index--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        $window.scrollTo(0, 0);

                        //
                        // Additional scope vars.
                        //

                        scope.scrollManager = AnchorScroll;

                        scope.addLink = (scope.link === 'true');

                        scope.enableSelection = (scope.selectable === 'true');

                        scope.hiddenKeys = {};

                        scope.zeroMatches = false;

                        scope.enableEditing = (scope.permissions && scope.permissions.write);

                        scope.pathPrefix = scope.featureType.replace(/\s/g, '-') + 's';

                        if (scope.practiceType) {

                            scope.selectionId = 'type-' + scope.practiceType.id;

                        }

                        scope.clearSearchInput = function () {

                            var input = document.getElementById('practice-type-search');

                            if (input) input.value = '';

                        };

                        scope.jumpToSelection = function () {

                            $location.hash('');

                            scope.scrollManager.scrollToAnchor(scope.selectionId);

                        };

                        scope.filterIndex = function (queryToken) {

                            console.log(
                                'practiceTypeList:filterIndex'
                            );

                            console.log(
                                'practiceTypeList:filterIndex:queryToken',
                                queryToken
                            );

                            var totalItems = 0;

                            var totalHidden = 0;

                            if (typeof queryToken === 'string') {

                                var token = queryToken.toLowerCase();

                                for (var key in scope.index) {

                                    if (scope.index.hasOwnProperty(key)) {

                                        var group = scope.index[key];

                                        if (Array.isArray(group)) {

                                            totalItems += group.length;

                                            var hiddenItems = 0;

                                            group.forEach(function (item) {

                                                var name = item.name;

                                                if (typeof name === 'string' && name.length) {

                                                    if (queryToken.length >= 3) {

                                                        item.hide = !(item.name.toLowerCase().indexOf(token) >= 0);

                                                    } else {

                                                        item.hide = false;

                                                    }

                                                    if (item.hide) {

                                                        hiddenItems++;

                                                        totalHidden++;

                                                    }

                                                }

                                            });

                                            scope.hiddenKeys[key] = (group.length === hiddenItems);

                                        }

                                    }

                                }

                            }

                            scope.zeroMatches = (totalItems > 0 && totalHidden > 0 && (totalItems === totalHidden));

                        };

                        scope.processIndex = function () {

                            console.log(
                                'practiceTypeList:processIndex'
                            );

                            for (var key in scope.index) {

                                if (scope.index.hasOwnProperty(key)) {

                                    var group = scope.index[key];

                                    if (Array.isArray(group)) {

                                        group.forEach(function (item) {

                                            if (scope.practiceType && scope.practiceType.id) {

                                                item.selected = (item.id === scope.practiceType.id);

                                            } else {

                                                item.selected = false;

                                            }

                                            if (typeof scope.queryToken === 'string' &&
                                                scope.queryToken.length >= 3) {

                                                if (item.name.indexOf(scope.queryToken) >= 0) {

                                                    item.hide = false;

                                                } else {

                                                    item.hide = false;

                                                }

                                            } else {

                                                item.hide = false;

                                            }

                                        });

                                    }

                                }

                            }

                        };

                        scope.closeView = function() {

                            scope.visible = false;

                        };

                        scope.setPermitType = function (feature) {

                            feature.selected = true;

                            feature.showConfirmation = true;

                            scope.practiceType = feature;

                            scope.selectionId = 'type-' + scope.practiceType.id;

                            scope.filterIndex('');

                            scope.processIndex();

                            scope.clearSearchInput();

                            $timeout(function () {

                                scope.scrollManager.scrollToAnchor(scope.selectionId);

                            }, 200);

                        };

                        scope.$watch('index', function (newVal) {

                            if (newVal) {

                                scope.processIndex();

                            }

                        });

                    }

                };

            }

        ]);

}());