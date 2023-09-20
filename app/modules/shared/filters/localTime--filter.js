(function() {

    'use strict';

    angular.module('OilGasWatch')
        .filter('localTime', ['$filter', function($filter) {

            return function(value) {

                if (typeof value === 'string') {

                    return moment.utc(value).local().format();

                }

                return value;

            };

        }]);

}());