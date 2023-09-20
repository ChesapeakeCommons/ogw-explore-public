(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Rollup', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/rollups'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                pipe: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/pipe-stat/:id')
                }
            });
        });

}());