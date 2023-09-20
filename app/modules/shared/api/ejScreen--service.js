(function() {

    'use strict';

    /**
     * @ngdoc service
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .service('EJScreenInterface', function(environment, Preprocessors, $resource) {
            return $resource('https://ejscreen.epa.gov/mapper/ejscreenRESTbroker.aspx', {}, {
                query: {
                    isArray: false,
                    cache: true,
                    headers: {}
                }
            });
        });

}());