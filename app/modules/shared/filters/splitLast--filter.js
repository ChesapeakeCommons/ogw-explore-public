(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('splitLast', function() {

            return function(value, char, pop) {

                pop = (typeof pop === 'boolean') ? pop : false;

                if (typeof value !== 'string' ||
                    typeof char !== 'string') return value;

                var index = value.lastIndexOf(char);

                if (index < 0) return value;

                if (pop) {

                    return value.substring(index, value.length);

                }

                return value.substring(0, index);

            };

        });

}());