(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Permit', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/data/permit/:id'), {
                'id': '@id',
                'target_id': '@target_id',
                'targetId': '@targetId'
            }, {
                'query': {
                    'isArray': false
                },
                getSingle: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id')
                },
                update: {
                    method: 'PATCH'
                },
                layers: {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/permit/:id/layers'),
                    'isArray': false
                },
             /*  'metrics': {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/data/permit/:id/metrics'),
                    'isArray': false
                },

              */
                'outcomes': {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/data/permit/:id/outcomes'),
                    'isArray': false
                },
                allocations: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/allocations')
                },
                partnerships: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/partnerships')
                },
                reports: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/reports')
                },
                'site': {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/permit/:id/site'),
                    'isArray': false
                },
                'custom': {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/data/permit/:id/readings_custom'),
                    'isArray': false
                },
                models: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/models')
                },
                progress: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/progress')
                },
                publicFeature: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/public')
                },
                tags: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/tags')
                },
                tagGroups: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/tag-groups')
                },
                targetMatrix: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/matrix')
                },
                tasks: {
                    'method': 'GET',
                    'url': environment.apiUrl.concat('/v1/permit/:id/tasks'),
                    'isArray': false
                },
                updateMatrix: {
                    method: 'POST',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/matrix')
                },
                checkStatus: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/status')
                },
                copy: {
                    method: 'POST',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/clone')
                },
                metrics: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/metrics/')
                },
                target: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/target/:target_id')
                },
                targetUpdate: {
                    method: 'PATCH',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/target/:targetId')
                },
                targetDelete: {
                    method: 'DELETE',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/permit/:id/target/:target_id')

                }

            });
        });

}());