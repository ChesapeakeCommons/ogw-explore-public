(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Variable', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/variables/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                collection: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/variables')
                },
                getSingle: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/variables/:id')
                },
                updateIndices: {
                    method: 'POST',
                    url: environment.apiUrl.concat('/v1/variables/indices')
                },
                update: {
                    method: 'PATCH'
                },
                members: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/variables/:id/members')
                },
                tags: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/variables/:id/tags')
                },
                tagGroups: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/variables/:id/tag-groups')
                }
            });
        });

}());