(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('OutcomeService', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/outcomes'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });
        });

}());