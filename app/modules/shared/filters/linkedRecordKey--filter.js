(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('linkedRecordKey', function(Utility) {

            return function(value) {

                try {

                    var sepIdx = value.lastIndexOf('[');

                    var key = value.substring(sepIdx);

                    key = JSON.parse(key)[0];

                    if (Utility.isNumber(key)) {

                        return key;

                    }

                    return value;

                } catch (e) {
                    
                    return value;

                }

            };

        });

}());