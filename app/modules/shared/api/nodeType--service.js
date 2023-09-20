(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('NodeType', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/node-type/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                collection: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/node-type')
                },
                getSingle: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/node-type/:id')
                },
                update: {
                    method: 'PATCH'
                },
                variables: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/node-type/:id/variables')
                }
            });
        });

}());