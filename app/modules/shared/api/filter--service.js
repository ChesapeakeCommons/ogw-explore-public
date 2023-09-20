(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Filters', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/data/filters'), {
                id: '@id'
            }, {
                locationsByYear: {
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/data/filters/facilities-by-year')
                },
                customGeographies: {
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/data/filters/program/:id/custom-geographies')
                },
                grantees: {
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/data/filters/program/:id/grantees')
                },
                practices: {
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/data/filters/program/:id/practices')
                }
            });

        });

}());