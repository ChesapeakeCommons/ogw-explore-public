(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Stat', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/stat/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });
        });

}());