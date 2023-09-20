(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('CompositeFrame', function(environment, Preprocessors, $resource) {
            return $resource(environment.apiUrl.concat('/v1/composite-view/:id'), {
                id: '@id'
            }, {
                query: {
                    isArray: false
                },
                columns: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/composite-frame/:id/columns')
                },
                records: {
                    method: 'GET',
                    isArray: false,
                    url: environment.apiUrl.concat('/v1/composite-frame/:id/records')
                }
            });
        });

}());