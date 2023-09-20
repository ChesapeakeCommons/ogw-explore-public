(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('pathSplit', function() {

            return function(value, index) {

                var components = value.split('/');

                if (components.length > 1) {

                    return components[components.length - 1];

                } else {

                    return components[0];

                }

            };

        });

}());