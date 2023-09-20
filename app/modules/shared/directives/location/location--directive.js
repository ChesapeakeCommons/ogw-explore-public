(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('location', [
            'environment',
            '$timeout',
            'mapbox',
            'MapManager',
            'Utility',
            function(environment, $timeout, mapbox, MapManager, Utility) {
                return {
                    restrict: 'EA',
                    scope: {
                        'organization': '=?',
                        'mapId': '=?',
                        'nodeType': '=?',
                        'postSet': '&',
                        'variable': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'location/location--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.toggleLayer = function(layer) {

                            console.log('scope.toggleLayer --> layer', layer);

                            var layerId = layer.spec.id;

                            var visibility = scope.map.getLayoutProperty(layerId, 'visibility');

                            if (visibility === 'visible') {

                                scope.map.setLayoutProperty(layerId, 'visibility', 'none');

                            } else {

                                scope.map.setLayoutProperty(layerId, 'visibility', 'visible');

                            }

                        };

                        scope.switchMapStyle = function(styleId, index) {

                            console.log('scope.switchMapStyle --> styleId', styleId);

                            console.log('scope.switchMapStyle --> index', index);

                            var center = scope.map.getCenter();

                            var zoom = scope.map.getZoom();

                            if (center.lng && center.lat) {

                                scope.mapOptions.center = [center.lng, center.lat];

                            }

                            if (zoom) {

                                scope.mapOptions.zoom = zoom;

                            }

                            scope.activeStyle = index;

                            scope.mapOptions.style = scope.mapStyles[index].url;

                            scope.map.remove();

                            scope.createMap(scope.mapOptions);

                        };

                        scope.getMapOptions = function() {

                            scope.mapStyles = mapbox.baseStyles;

                            console.log(
                                'scope.createMap --> mapStyles',
                                scope.mapStyles);

                            scope.activeStyle = 0;

                            mapboxgl.accessToken = mapbox.accessToken;

                            console.log(
                                'scope.createMap --> accessToken',
                                mapboxgl.accessToken);

                            scope.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                            scope.mapOptions.container = scope.mapId;

                            scope.mapOptions.style = scope.mapStyles[0].url;

                            return scope.mapOptions;

                        };

                        scope.createMap = function(options, initialSetup) {

                            if (!options) return;

                            console.log('scope.createMap --> options', options);

                            scope.map = new mapboxgl.Map(options);

                            scope.map.on('load', function() {

                                var scale = new mapboxgl.ScaleControl({
                                    maxWidth: 80,
                                    unit: 'imperial'
                                });

                                scope.map.addControl(scale, 'bottom-right');

                                var nav = new mapboxgl.NavigationControl();

                                scope.map.addControl(nav, 'top-left');

                                var fullScreen = new mapboxgl.FullscreenControl();

                                scope.map.addControl(fullScreen, 'top-left');

                                if (initialSetup) {

                                    var geocoder = new MapboxGeocoder({
                                        accessToken: mapboxgl.accessToken,
                                        clearOnBlur: true,
                                        countries: 'us',
                                        mapboxgl: mapboxgl,
                                        marker: false,
                                        minLength: 3,
                                        placeholder: 'Find addresses and places'
                                    });

                                    var selector = scope.mapId + '-geocoder';

                                    document.getElementById(selector).appendChild(
                                        geocoder.onAdd(scope.map)
                                    );

                                }

                                scope.addDrawControls();

                                scope.map.on('draw.create', scope.updateGeometry);
                                scope.map.on('draw.delete', scope.updateGeometry);
                                scope.map.on('draw.update', scope.updateGeometry);

                                var line = turf.lineString([[-125.0011, 24.9493], [-66.9326, 49.5904]]);

                                // 44.967244, -103.771555
                                //
                                // -125.0011, 24.9493, -66.9326, 49.5904

                                var bbox = turf.bbox(line);

                                scope.map.fitBounds(bbox, { duration: 0, padding: 40 });

                                scope.populateMap(scope.map, scope.variable);

                                scope.mapCreated = true;

                                // var nodeExtent = {
                                //     'type': 'Feature',
                                //     'geometry': scope.variable.value,
                                //     'properties': {}
                                // };

                                // MapManager.addFeature(
                                //     scope.map,
                                //     scope.variable,
                                //     'value',
                                //     true,
                                //     true,
                                //     null);

                                // if (scope.layers && scope.layers.length) {
                                //
                                //     scope.addLayers(scope.layers);
                                //
                                // } else {
                                //
                                //     scope.fetchLayers();
                                //
                                // }

                            });

                        };

                        scope.populateMap = function(map, variable, update, delay) {

                            delay = delay || 50;

                            $timeout(function () {

                                if (scope.drawControls) {

                                    scope.drawControls.deleteAll();

                                }

                                var bounds;

                                if (variable.geometry !== null &&
                                    typeof variable.geometry !== 'undefined') {

                                    if (variable.geometry.type === 'Point') {

                                        var bufferedPoint = turf.buffer(
                                            variable.geometry, 0.2, {units: 'kilometers'}
                                        );

                                        bounds = turf.bbox(
                                            bufferedPoint.geometry
                                        );

                                    } else {

                                        bounds = turf.bbox(
                                            variable.geometry
                                        );

                                    }

                                    map.fitBounds(bounds, {
                                        padding: 40
                                    });

                                    if (scope.drawControls) {

                                        var feature = {
                                            id: 'datum-' + variable.id,
                                            type: 'Feature',
                                            properties: {},
                                            paint: {
                                                'fill-color': '#df063e',
                                                'fill-opacity': 0.4
                                            },
                                            geometry: variable.geometry

                                        };

                                        scope.drawControls.add(feature);

                                        scope.drawControls.changeMode(
                                            'simple_select',
                                            {
                                                featureId: 'datum-' + variable.id
                                            });

                                    }

                                    if (update) scope.postSet();

                                }

                            }, delay);

                        };

                        scope.updateGeometry = function(event) {

                            var data = scope.drawControls.getAll();

                            console.log('scope.updateGeometry --> data', data);

                            scope.$apply(function() {

                                if (data.features.length > 0) {

                                    var feature = data.features[0];

                                    scope.dimension = Utility.measureGeometry(feature);

                                    if (feature.geometry) {

                                        scope.variable.geometry = feature.geometry;

                                    }

                                } else {

                                    scope.dimension = Utility.measureGeometry({});

                                    scope.variable.geometry = null;

                                }

                            });

                            scope.postSet({});

                        };

                        scope.addDrawControls = function() {

                            var allowLine = scope.variable.allowed_types.indexOf('linestring') >= 0;

                            var allowPoint = scope.variable.allowed_types.indexOf('point') >= 0;

                            var allowPoly = scope.variable.allowed_types.indexOf('polygon') >= 0;

                            scope.drawControls = new MapboxDraw({
                                displayControlsDefault: false,
                                controls: {
                                    line_string: allowLine,
                                    point: allowPoint,
                                    polygon: allowPoly,
                                    trash: true
                                },
                                userProperties: true,
                                styles: [
                                    {
                                        'id': 'gl-draw-polygon-fill-inactive',
                                        'type': 'fill',
                                        'filter': ['all', ['==', 'active', 'false'],
                                            ['==', '$type', 'Polygon'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'paint': {
                                            'fill-color': '#df063e',
                                            'fill-outline-color': '#df063e',
                                            'fill-opacity': 0.5
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-fill-active',
                                        'type': 'fill',
                                        'filter': ['all', ['==', 'active', 'true'],
                                            ['==', '$type', 'Polygon']
                                        ],
                                        'paint': {
                                            'fill-color': '#df063e',
                                            'fill-outline-color': '#df063e',
                                            'fill-opacity': 0.1
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-midpoint',
                                        'type': 'circle',
                                        'filter': ['all', ['==', '$type', 'Point'],
                                            ['==', 'meta', 'midpoint']
                                        ],
                                        'paint': {
                                            'circle-radius': 3,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-stroke-inactive',
                                        'type': 'line',
                                        'filter': ['all', ['==', 'active', 'false'],
                                            ['==', '$type', 'Polygon'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#df063e',
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-stroke-active',
                                        'type': 'line',
                                        'filter': ['all', ['==', 'active', 'true'],
                                            ['==', '$type', 'Polygon']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#df063e',
                                            'line-dasharray': [0.2, 2],
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-line-inactive',
                                        'type': 'line',
                                        'filter': ['all', ['==', 'active', 'false'],
                                            ['==', '$type', 'LineString'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#df063e',
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-line-active',
                                        'type': 'line',
                                        'filter': ['all', ['==', '$type', 'LineString'],
                                            ['==', 'active', 'true']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#df063e',
                                            'line-dasharray': [0.2, 2],
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
                                        'type': 'circle',
                                        'filter': ['all', ['==', 'meta', 'vertex'],
                                            ['==', '$type', 'Point'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'paint': {
                                            'circle-radius': 5,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-and-line-vertex-inactive',
                                        'type': 'circle',
                                        'filter': ['all', ['==', 'meta', 'vertex'],
                                            ['==', '$type', 'Point'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'paint': {
                                            'circle-radius': 3,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-point-point-stroke-inactive',
                                        'type': 'circle',
                                        'filter': ['all', ['==', 'active', 'false'],
                                            ['==', '$type', 'Point'],
                                            ['==', 'meta', 'feature'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'paint': {
                                            'circle-radius': 5,
                                            'circle-opacity': 1,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-point-inactive',
                                        'type': 'circle',
                                        'filter': ['all', ['==', 'active', 'false'],
                                            ['==', '$type', 'Point'],
                                            ['==', 'meta', 'feature'],
                                            ['!=', 'mode', 'static']
                                        ],
                                        'paint': {
                                            'circle-radius': 3,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-point-stroke-active',
                                        'type': 'circle',
                                        'filter': ['all', ['==', '$type', 'Point'],
                                            ['==', 'active', 'true'],
                                            ['!=', 'meta', 'midpoint']
                                        ],
                                        'paint': {
                                            'circle-radius': 7,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-point-active',
                                        'type': 'circle',
                                        'filter': ['all', ['==', '$type', 'Point'],
                                            ['!=', 'meta', 'midpoint'],
                                            ['==', 'active', 'true']
                                        ],
                                        'paint': {
                                            'circle-radius': 5,
                                            'circle-color': '#df063e'
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-fill-static',
                                        'type': 'fill',
                                        'filter': ['all', ['==', 'mode', 'static'],
                                            ['==', '$type', 'Polygon']
                                        ],
                                        'paint': {
                                            'fill-color': '#404040',
                                            'fill-outline-color': '#404040',
                                            'fill-opacity': 0.1
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-polygon-stroke-static',
                                        'type': 'line',
                                        'filter': ['all', ['==', 'mode', 'static'],
                                            ['==', '$type', 'Polygon']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#404040',
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-line-static',
                                        'type': 'line',
                                        'filter': ['all', ['==', 'mode', 'static'],
                                            ['==', '$type', 'LineString']
                                        ],
                                        'layout': {
                                            'line-cap': 'round',
                                            'line-join': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#404040',
                                            'line-width': 2
                                        }
                                    },
                                    {
                                        'id': 'gl-draw-point-static',
                                        'type': 'circle',
                                        'filter': ['all', ['==', 'mode', 'static'],
                                            ['==', '$type', 'Point']
                                        ],
                                        'paint': {
                                            'circle-radius': 5,
                                            'circle-color': '#404040'
                                        }
                                    }
                                ]

                            });

                            console.log('drawControls', scope.drawControls);

                            scope.map.addControl(scope.drawControls);

                        };

                        scope.$watch('variable', function (newVal) {

                            if (angular.isDefined(newVal)) {

                                if (scope.variable.value &&
                                    !scope.variable.geometry) {

                                    scope.variable.geometry = scope.variable.value;

                                }

                                scope.dimension = Utility.measureGeometry(
                                    scope.variable
                                );

                                if (!scope.mapCreated) {

                                    scope.mapOptions = scope.getMapOptions();

                                    scope.createMap(scope.mapOptions, true);

                                }

                            }

                        });

                    }

                };

            }

        ]);

}());