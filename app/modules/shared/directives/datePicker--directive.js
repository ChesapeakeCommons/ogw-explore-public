(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('dateOptions', [
            'environment',
            '$window',
            'Utility',
            '$timeout',
            function(environment, $window, Utility, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        date: '=?',
                        extend: '=?',
                        present: '=?',
                        search: '&',
                        setAction: '&',
                        start: '=?',
                        timestamp: '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'datePicker--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.dateParts = {
                            day: '',
                            month: '',
                            year: ''
                        };

                        function pad(a, maxLength) {

                            if (typeof a !== 'string') return;

                            var string = a + '';

                            return string.length === (maxLength - 1) ? '0' + string : string;

                        }

                        scope.validateDay = function() {

                            //
                            // Keep a list of months containing 30 days (April, June, September, November)
                            //

                            var thirtyGroup = [
                                4,
                                6,
                                9,
                                11
                            ];

                            var day = +scope.dateParts.day;
                            var month = +scope.dateParts.month;
                            var year = +scope.dateParts.year;

                            if (month === 2) {

                                if (Utility.isLeap(year)) {

                                    // If the user changes the month, reset upper bound if necessary

                                    if (day > 29) scope.dateParts.day = '29';

                                } else {

                                    // If the user changes the month, reset upper bound if necessary

                                    if (day > 28) scope.dateParts.day = '28';

                                }

                            } else if (thirtyGroup.indexOf(month) > -1) {

                                // If the user changes the month, reset upper bound if necessary

                                if (day > 30) scope.dateParts.day = '30';

                            } else {

                                if (day > 31) scope.dateParts.day = '31';

                            }

                        };

                        scope.validateMonth = function() {

                            var month = +scope.dateParts.month;

                            return Number.isInteger(month) && month >= 1 && month <= 12;

                        };

                        scope.setDate = function() {

                            console.log(
                                'scope.setDate:dateParts',
                                scope.dateParts);

                            $timeout(function () {

                                var components = [];

                                scope.dateParts.month = pad(scope.dateParts.month, 2);

                                scope.dateParts.day = pad(scope.dateParts.day, 2);

                                //
                                // Handle month input
                                //

                                if (scope.dateParts.month.length) {

                                    if (scope.dateParts.month.length > 2) {

                                        scope.dateParts.month = scope.dateParts.month.slice(0, -1);

                                    }

                                    components.push(
                                        pad(scope.dateParts.month, 2)
                                    );

                                }

                                if (!scope.validateMonth()) {

                                    scope.dateParts.month = '';

                                    return;

                                }

                                //
                                // Handle day input
                                //

                                if (scope.dateParts.day.length) {

                                    if (scope.dateParts.day.length > 2) {

                                        scope.dateParts.day = scope.dateParts.day.slice(0, -1);

                                    }

                                    components.push(
                                        pad(scope.dateParts.day, 2)
                                    );

                                }

                                scope.validateDay();

                                //
                                // Handle year input
                                //

                                if (!scope.dateParts.year.startsWith('1') &&
                                    !scope.dateParts.year.startsWith('2')) {

                                    scope.dateParts.year = '';

                                    return;

                                }

                                if (scope.dateParts.year.length > 4) {

                                    scope.dateParts.year = scope.dateParts.year.slice(0, -1);

                                }

                                if (scope.dateParts.year.length < 4) {

                                    return;

                                    // components.push(
                                    //     scope.dateParts.year
                                    // );

                                }

                                console.log(
                                    'scope.setDate:components',
                                    components);

                                scope.date = [
                                    scope.dateParts.year,
                                    scope.dateParts.month,
                                    scope.dateParts.day
                                ].join('-');

                                if (scope.setAction) {

                                    $timeout(function () {

                                        scope.setAction({});

                                    }, 200);

                                }

                                // if (components.length === 3) {
                                //
                                //     scope.date = components.join('-');
                                //
                                // } else {
                                //
                                //     scope.date = null;
                                //
                                // }

                            }, 200);

                        };

                        scope.$watch('date', function(newVal) {

                            console.log(
                                'scope.$watch(date):newVal:',
                                newVal
                            );

                            if (angular.isDefined(newVal) && newVal) {

                                if (typeof newVal === 'number') {

                                    var date = new Date(newVal);

                                    scope.dateParts = {
                                        year: '' + date.getFullYear(),
                                        month: pad(date.getMonth() + 1),
                                        day: pad(date.getDate())
                                    };

                                } else if (typeof newVal === 'string') {

                                    var parts = newVal.split('-');

                                    scope.dateParts = {
                                        year: parts[0],
                                        month: parts[1],
                                        day: parts[2]
                                    };

                                }

                            }

                        }, true);

                    }

                };
            }
        ]);

}());