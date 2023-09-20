(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('boolToString', function() {

            return function(value) {

                if (typeof value === 'boolean') {

                    return value ? 'yes' : 'no';

                }

                return value;

            };

        });

}());