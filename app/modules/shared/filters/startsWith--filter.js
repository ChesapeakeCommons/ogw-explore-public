(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('startsWith', function() {

            return function(value, token) {

                var string = value + '';

                return string.startsWith(token);

            };

        });

}());