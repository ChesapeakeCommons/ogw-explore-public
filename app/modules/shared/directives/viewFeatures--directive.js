(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('viewFeatures', ['$window',
            function($window) {
                return {
                    replace: true,
                    restrict: 'E',
                    scope: {
                        collection: '@',
                        id: '@'
                    },
                    template: '<div class="view-features" data-ng-click="page.loadFeatures({{ collection }}, {{ id }})">View {{ collection }}s</button>'
                };
            }
        ]);

}());