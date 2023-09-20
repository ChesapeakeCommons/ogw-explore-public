'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.toAcres
 * @description
 * # toAcres
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .filter('toAcres', [function() {

        /**
         * Convert the given whole number (assuming square feet) to acres
         *
         * @param (number) squareFeet
         *    The number of square feet you wish to convert to acres
         *
         * @return (number) acres
         *    The conversion result in acres
         *
         * @see https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=acres%20to%20square%20feet
         */
        return function(squareFeet) {
            var acres = (squareFeet / 43560);
            return acres;
        };

    }]);