(function() {

    'use strict';

    angular.module('OilGasWatch')
        .filter('round', ['$filter', function($filter) {

            return function(d, precision) {

                var number = +d;

                return $filter('number')(number, precision);

            };

        }]);

}());