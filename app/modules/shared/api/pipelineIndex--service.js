(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('PipelineIndex', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/pipeline-index'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });
        });

}());