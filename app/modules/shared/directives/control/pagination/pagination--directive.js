(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('pagination', [
            '$window',
            'environment',
            'QueryParamManager',
            function($window, environment, QueryParamManager) {
                return {
                    restrict: 'EA',
                    scope: {
                        'params': '=?',
                        'rotate': '&',
                        'summary': '=?',
                        'updateParams': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/pagination/pagination--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        // if (!scope.params.hasOwnProperty('page')) {
                        //
                        //     throw 'A `page` parameter is required.';
                        // }
                        //
                        // if (!scope.params.hasOwnProperty('limit')) {
                        //
                        //     throw 'A `limit` parameter is required.';
                        // }

                        if (typeof scope.updateParams === 'undefined') {

                            scope.updateParams = false;

                        }

                        scope.changeLimit = function (limit) {

                            console.log(
                                'changeLimit:limit:',
                                limit
                            );

                            scope.params.limit = limit;
                            scope.params.page = 1;

                            console.log(
                                'changeLimit:params:',
                                scope.params
                            );

                            if (scope.updateParams) QueryParamManager.setParams(scope.params);

                            scope.rotate({
                                params: scope.params
                            });

                        };

                        scope.setPage = function(dir, page) {

                            console.log(
                                'setPage:dir:',
                                dir
                            );

                            console.log(
                                'setPage:page:',
                                page
                            );

                            if (dir === 'prev') {

                                page = (page > 1) ? page - 1 : 1;

                            } else {

                                page = (page < scope.summary.page_count) ? page + 1 : scope.summary.page_count;

                            }

                            console.log(
                                'setPage:page[2]:',
                                page
                            );

                            return page;

                        };

                        scope.getPage = function (dir) {

                            var currentPage = +scope.params.page;

                            console.log(
                                'getPage:currentPage:',
                                currentPage
                            );

                            if (!Number.isInteger(currentPage)) {

                                currentPage = 1;

                            }

                            console.log(
                                'getPage:currentPage[2]:',
                                currentPage
                            );

                            if (dir === 'first') {

                                scope.params.page = 1;

                            } else if (dir === 'last') {

                                scope.params.page = scope.summary.page_count;

                            } else {

                                scope.params.page = scope.setPage(dir, currentPage);

                            }

                            // if (page < 1) {
                            //
                            //     scope.params.page = 1;
                            //
                            // } else if (page <= scope.summary.page_count) {
                            //
                            //     scope.params.page = page;
                            //
                            // } else {
                            //
                            //     scope.params.page = scope.summary.page_count;
                            //
                            // }

                            console.log(
                                'getPage:params:',
                                scope.params
                            );

                            if (scope.updateParams) QueryParamManager.setParams(scope.params);

                            scope.rotate({
                                params: scope.params
                            });

                            scope.windowBounds();

                        };

                        scope.windowBounds = function () {

                            var featureCount = scope.summary.feature_count;

                            console.log(
                                'windowBounds:featureCount:',
                                featureCount
                            );

                            var page = +scope.params.page;

                            if (!Number.isInteger(page)) page = 1;

                            console.log(
                                'windowBounds:page:',
                                page
                            );

                            scope.boundaryLow = scope.params.page === 1 ? 1 : (25 * (page - 1)) + 1;

                            console.log(
                                'windowBounds:boundaryLow:',
                                scope.boundaryLow
                            );

                            // scope.boundaryLow = scope.params.page === 1 ? 1 : (scope.params.limit * (scope.params.page - 1)) + 1;

                            var maxCount = 25 * page;

                            console.log(
                                'windowBounds:maxCount:',
                                maxCount
                            );

                            if (featureCount <= maxCount) {

                                scope.boundaryHigh = featureCount;

                            } else {

                                scope.boundaryHigh = maxCount;

                            }

                        };

                        scope.$watch('summary', function (newVal) {

                            if (newVal) {

                                scope.windowBounds();

                            }

                        }, true);

                        scope.$watch('params', function (newVal) {

                            if (typeof newVal === 'undefined') {

                                //

                            } else {

                                // scope.params = newVal;

                                if (scope.summary) scope.windowBounds();

                            }

                        });

                    }

                };

            }

        ]);

}());