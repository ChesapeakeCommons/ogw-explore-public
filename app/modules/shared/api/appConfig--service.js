'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('AppConfig', function() {

        return {
            newDocuments: [],
            newNode: undefined,
            records: {},
            tables: undefined,
            targetRecord: undefined
        };

    });