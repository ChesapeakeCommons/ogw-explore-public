(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('ProjectIndex', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/project-index'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });
        });

}());