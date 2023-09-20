(function () {

    'use strict';

    angular.module('OilGasWatch')
        .filter('stateCode', [
            '$filter',
            'StateIndex',
            function ($filter, StateIndex) {

                return function (value) {

                    if (typeof value !== 'string') {

                        return value;

                    }

                    if (StateIndex.codes.hasOwnProperty(value)) {

                        return StateIndex.codes[value];

                    }

                    return value;

                };

            }]);

}());