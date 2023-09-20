(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('normalizeString', function() {

            return function(value) {

                if (typeof value !== 'string') return value;

                value = value.toLowerCase().trim();

                value = value.replace(/[^\w]+/g, ' ');

                return value.replace(' ', '_');

            };

        });

}());