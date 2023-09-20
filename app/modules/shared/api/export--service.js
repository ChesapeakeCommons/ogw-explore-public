(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('Export', function(environment, $resource) {

            return $resource(environment.apiUrl.concat('/v1/export/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                }
            });

        });

}());