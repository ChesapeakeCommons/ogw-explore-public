(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .filter('numStr', function (Utility) {

            function parseExpNot(str) {

                console.log(
                    '$filter:numStr:parseExpNot():str:',
                    str
                );

                if (str.indexOf('-') >= 0) {

                    return str;

                }

                return Number(str).toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }
                );

            }

            return function (value) {

                if (!Utility.isNumber(value)) return '';

                try {

                    let str = value.toString().toLowerCase();

                    console.log(
                        '$filter:numStr:str:',
                        str
                    );

                    // Handle exponential notation.

                    if (str.indexOf('e') >= 0) {

                        return parseExpNot(str);

                    }

                    let precision = 0;

                    let groups = str.split('.');

                    console.log(
                        '$filter:numStr:groups:',
                        groups
                    );

                    if (groups.length > 1) precision = groups[1].length;

                    console.log(
                        '$filter:numStr:precision:',
                        precision
                    );

                    return Number(value).toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: precision,
                            maximumFractionDigits: precision
                        }
                    );

                } catch (e) {

                    console.error(
                        '$filter:numStr:error:',
                        e
                    );

                    return '';

                }

            };

        });

}());