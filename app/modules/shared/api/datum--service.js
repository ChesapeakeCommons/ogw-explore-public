(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Datum', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/datum/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                collection: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/datum')
                },
                getSingle: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/datum/:id')
                },
                update: {
                    method: 'PATCH'
                }
            });
        });

}());