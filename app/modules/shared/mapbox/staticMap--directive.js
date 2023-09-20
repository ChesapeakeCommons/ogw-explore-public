(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('staticMap', [
            'environment',
            '$window',
            'Utility',
            function(environment, $window, Utility) {
                return {
                    restrict: 'A',
                    scope: {
                        geometry: '=?',
                        mapStyle: '@'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/mapbox/',
                            // Directive path
                            'staticMap--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.createStaticURL = function(geometry) {

                            var lat,
                                lng;

                            try {

                                lat = geometry.value.coordinates[1];
                                lng = geometry.value.coordinates[0];

                            } catch (e) {

                                lat = 0;
                                lng = 0;

                            }

                            const thumbnailLoc = [
                                'https://api.mapbox.com/styles/v1/mapbox',
                                scope.mapStyle,
                                'static',
                                [
                                    lng,
                                    lat,
                                    12,
                                    0
                                ].join(','),
                                '640x640@2x'
                            ].join('/');

                            const thumbnailUrl = new URL(thumbnailLoc);

                            thumbnailUrl.searchParams.append(
                                'access_token',
                                mapboxgl.accessToken
                            );

                            scope.thumbnail = thumbnailUrl.href;

                        };

                        scope.$watch('geometry', function (newVal) {

                            if (Utility.isObject(newVal)) {

                                scope.createStaticURL(newVal);

                            }

                        });

                    }

                };
            }
        ]);

}());