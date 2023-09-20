(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Node', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/nodes/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                collection: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes')
                },
                getSingle: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id')
                },
                graph: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id/graph/:varId')
                },
                update: {
                    method: 'PATCH'
                },
                members: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id/members')
                },
                nameMap: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/name-map')
                },
                shallowList: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/shallow-list')
                },
                tags: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id/tags')
                },
                tagGroups: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id/tag-groups')
                },
                variables: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/nodes/:id/variables')
                }
            });
        });

}());