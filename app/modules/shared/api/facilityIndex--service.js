(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('FacilityIndex', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/facility-index'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });
        });

}());