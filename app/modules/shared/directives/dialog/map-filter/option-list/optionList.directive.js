(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('optionList', [
            '$window',
            'environment',
            'DialogDispatch',
            function ($window, environment, DialogDispatch) {
                return {
                    restrict: 'EA',
                    scope: {
                        'data': '=?',
                        'placeholderText': '@placeholderText'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'dialog/map-filter/option-list/optionList.view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        scope.config = {};

                        scope.reset = function () {

                            let options = scope.config.options;

                            if (Array.isArray(options)) {
                                options.forEach(function (option) {
                                    option.selected = false;
                                });
                            }

                        };

                        scope.filterOptions = function (token) {

                            if (typeof token === 'string' &&
                                token.length >= 2) {
                                scope.config.options = scope.config.immutableOptions.filter(function (option) {
                                    return option.label.toLowerCase().indexOf(token.toLowerCase()) >= 0;
                                });
                            } else {
                                scope.config.options = scope.config.immutableOptions;
                            }

                        };

                        scope.$watch('data', function (newVal) {

                            if (Array.isArray(newVal)) {

                                scope.config.placeholder = scope.placeholderText;

                                scope.config.options = newVal;

                                scope.config.immutableOptions = JSON.parse(
                                    JSON.stringify(newVal)
                                );

                            }

                        }, true);

                    }

                };

            }

        ]);

}());