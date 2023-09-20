'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('StateListController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, mapbox, $window, $timeout, Utility,
                 $interval, LayerService, MapManager, Node,
                 QueryParamManager, AtlasDataManager, EJScreenInterface,
                 EsriLayerService, DataLayer, LayerUtil, SourceUtil, fac) {

            var self = this;

            mapboxgl.accessToken = mapbox.accessToken;

            $rootScope.viewState = {
                'facility': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            $rootScope.page = {};

            self.map = undefined;

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.hiddenKeys = {};

            self.zeroMatches = false;

            self.clearSearchInput = function () {

                var input = document.getElementById('fac-search');

                if (input) input.value = '';

            };

            self.filterIndex = function (queryToken) {

                console.log(
                    'practiceTypeList:filterIndex'
                );

                console.log(
                    'practiceTypeList:filterIndex:queryToken',
                    queryToken
                );

                var totalItems = 0;

                var totalHidden = 0;

                if (typeof queryToken === 'string') {

                    var token = queryToken.toLowerCase();

                    for (var key in self.index) {

                        if (self.index.hasOwnProperty(key)) {

                            var group = self.index[key];

                            if (Array.isArray(group)) {

                                totalItems += group.length;

                                var hiddenItems = 0;

                                group.forEach(function (item) {

                                    var name = item.name;

                                    if (typeof name === 'string' && name.length) {

                                        if (queryToken.length >= 3) {

                                            item.hide = !(item.name.toLowerCase().indexOf(token) >= 0);

                                        } else {

                                            item.hide = false;

                                        }

                                        if (item.hide) {

                                            hiddenItems++;

                                            totalHidden++;

                                        }

                                    }

                                });

                                self.hiddenKeys[key] = (group.length === hiddenItems);

                            }

                        }

                    }

                }

                self.zeroMatches = (totalItems > 0 && totalHidden > 0 && (totalItems === totalHidden));

            };

            self.featureCollection = fac.idx;

            self.statuses = [
                {
                    label: 'Pre-construction',
                    selected: false
                },
                {
                    label: 'Under construction',
                    selected: false
                },
                {
                    label: 'Partially operating',
                    selected: false
                },
                {
                    label: 'Operating',
                    selected: false
                }
            ];

            self.sectors = [
                {
                    label: 'Liquefied Natural Gas',
                    selected: false
                },
                {
                    label: 'Natural Gas',
                    selected: false
                },
                {
                    label: 'Nitrogen',
                    selected: false
                },
                {
                    label: 'Oil',
                    selected: false
                },
                {
                    label: 'Other',
                    selected: false
                },
                {
                    label: 'Petrochemicals and Plastics',
                    selected: false
                }
            ];

            self.layers = [
                {
                    id: 'esri.race_pop',
                    legends: [
                        {
                            title: 'Predominant category',
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#b9a087',
                                    label: 'White Alone, not Hispanic'
                                },
                                {
                                    color: '#78aea0',
                                    label: 'Hispanic or Latino'
                                },
                                {
                                    color: '#d9bf0d',
                                    label: 'Black or African American Alone, not Hispanic'
                                },
                                {
                                    color: '#ab579d',
                                    label: 'Asian Alone, not Hispanic'
                                },
                                {
                                    color: '#1e8553',
                                    label: 'American Indian and Alaska Native Alone, not Hispanic'
                                },
                                {
                                    color: '#c44245',
                                    label: 'Two or more races, not Hispanic'
                                },
                                {
                                    color: '#6a28c7',
                                    label: 'Native Hawaiian and Other Pacific Islander, not Hispanic'
                                },
                                {
                                    color: '#00b6f1',
                                    label: 'Some other race, not Hispanic'
                                }
                            ]
                        },
                        {
                            title: 'Strength of predominance',
                            type: 'quantitative',
                            labels: {
                                low: '< 13',
                                middle: null,
                                high: '> 97',
                            },
                            gradient: [
                                'linear-gradient(',
                                [
                                    'to top',
                                    'rgba(0,0,0,0.15) 0%',
                                    'rgba(0,0,0,0.75) 100%'
                                ].join(','),
                                ')'
                            ].join('')
                        }
                    ],
                    name: 'ACS Race and Hispanic Origin Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.poverty_by_age',
                    legends: [
                        {
                            title: 'Percent of population whose income in the past 12 months is below poverty level',
                            type: 'quantitative',
                            labels: {
                                low: '< 1%',
                                middle: '13% - national figure',
                                high: '> 26%',
                            },
                            gradient: [
                                'linear-gradient(',
                                [
                                    'to top',
                                    '#fffcd4 0%',
                                    '#fffcd4 3.85%',
                                    '#e7ae9d 26.92%',
                                    '#ce6065 50%',
                                    '#88314f 76.92%',
                                    '#420239 100%'
                                ].join(','),
                                ')'
                            ].join('')
                        }
                    ],
                    name: 'ACS Poverty Status Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.total_pop',
                    legends: [
                        {
                            title: 'Percent of Population in Dependent Age Groups (under 18 and 65+)',
                            type: 'quantitative',
                            labels: {
                                low: '< 30%',
                                middle: '38% - national figure',
                                high: '> 46%',
                            },
                            gradient: [
                                'linear-gradient(',
                                [
                                    'to top',
                                    '#fffcd4 0%',
                                    '#fffcd4 65.22%',
                                    '#c8bcd4 73.91%',
                                    '#907cd4 82.61%',
                                    '#504692 91.30%',
                                    '#10104f 100%'
                                ].join(','),
                                ')'
                            ].join('')
                        }
                    ],
                    name: 'ACS Population Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.class1',
                    legends: [
                        {
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#8dd3c7',
                                    label: 'BIA'
                                },
                                {
                                    color: '#feffb4',
                                    label: 'FS'
                                },
                                {
                                    color: '#bebad9',
                                    label: 'FWS'
                                },
                                {
                                    color: '#fb8073',
                                    label: 'NPS'
                                }
                            ]
                        }
                    ],
                    name: 'Mandatory Class 1 Areas, US EPA, OAR, OAQPS',
                    selected: false
                },
                {
                    id: 'esri.ozone',
                    legends: [
                        {
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#73b2ff',
                                    label: 'Maintenance'
                                },
                                {
                                    color: '#004da8',
                                    label: 'Nonattainment',
                                }
                            ]
                        }
                    ],
                    name: 'Nonattainment Areas for the 2008 8-hour Ozone Standards',
                    selected: false
                }
            ];

            self.popVars = [
                {
                    "name": "Estimated population within 3 miles",
                    "normalized_name": "estimated_population_within_3_miles"
                },
                {
                    "name": "Percent Low Income - 3 miles",
                    "normalized_name": "percent_low_income_3_miles"
                },
                {
                    "name": "Percent People of Color - 3 miles",
                    "normalized_name": "percent_people_of_color_3_miles"
                },
                {
                    "name": "Percent People over 64 Years Old - 3 miles",
                    "normalized_name": "percent_people_over_64_years_old_3_miles"
                },
                {
                    "name": "Percent under 5 Years Old - 3 miles",
                    "normalized_name": "percent_under_5_years_old_3_miles"
                }
            ];

            self.airPollutants = [
                {
                    "id": 15,
                    "key": "float_variable:15",
                    "normalized_name": "greenhouse_gases_co2e",
                    "name": "Greenhouse Gases (CO₂e)",
                    "index": 8
                },
                {
                    "id": 16,
                    "key": "float_variable:16",
                    "normalized_name": "particulate_matter_pm2_5",
                    "name": "Particulate Matter (PM2.5)",
                    "index": 9
                },
                {
                    "id": 17,
                    "key": "float_variable:17",
                    "normalized_name": "volatile_organic_compounds_voc",
                    "name": "Volatile Organic Compounds (VOC)",
                    "index": 10
                },
                {
                    "id": 18,
                    "key": "float_variable:18",
                    "normalized_name": "nitrogen_oxides_nox",
                    "name": "Nitrogen Oxides (NOₓ)",
                    "index": 11
                },
                {
                    "id": 19,
                    "key": "float_variable:19",
                    "normalized_name": "sulfur_dioxide_so2",
                    "name": "Sulfur Dioxide (SO₂)",
                    "index": 12
                },
                {
                    "id": 20,
                    "key": "float_variable:20",
                    "normalized_name": "carbon_monoxide_co",
                    "name": "Carbon Monoxide (CO)",
                    "index": 13
                },
                {
                    "id": 21,
                    "key": "float_variable:21",
                    "normalized_name": "hazardous_air_pollutants_haps",
                    "name": "Hazardous Air Pollutants (HAPs)",
                    "index": 14
                },
                {
                    "id": 34,
                    "key": "float_variable:34",
                    "normalized_name": "pm2_5_ug_m3",
                    "name": "PM2.5 (ug\/m3)",
                    "index": 8
                },
                {
                    "id": 35,
                    "key": "float_variable:35",
                    "normalized_name": "o3_ppb",
                    "name": "O3 (ppb)",
                    "index": 7
                }
            ];

            self.pollutantVisibility = {};

            self.permitVisibility = {};

            self.togglePollutants = function(projectId) {

                self.pollutantVisibility[projectId] = !self.pollutantVisibility[projectId];

            };

            self.togglePermits = function(projectId) {

                self.permitVisibility[projectId] = !self.permitVisibility[projectId];

            };

            self.graph = {};

            self.graphRequests = [
                {
                    type: 'projects',
                    varId: 5
                }
            ];

            self.showElements = function(createMap) {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

                    $timeout(function() {

                        if (self.location.hasOwnProperty('coordinates')) {

                            MapManager.createBackdropMap(
                                mapbox.backdropOptions,
                                self.location
                            );

                        }

                    }, 100);

                    // if (createMap) {
                    //
                    //     $timeout(function() {
                    //
                    //         if (!self.mapOptions) {
                    //
                    //             self.mapOptions = self.getMapOptions();
                    //
                    //         }
                    //
                    //         self.createMap(self.mapOptions);
                    //
                    //     }, 50);
                    //
                    // }

                }, 50);

            };

            //
            // Assign project to a scoped variable
            //

            self.loadProject = function() {

                project.$promise.then(function(successResponse) {

                    console.log('self.project', successResponse);

                    var project_ = successResponse;

                    if (!successResponse.permissions.read &&
                        !successResponse.permissions.write) {

                        self.makePrivate = true;

                        self.showElements(false);

                    } else {

                        self.permissions.can_edit = successResponse.permissions.write;
                        self.permissions.can_delete = successResponse.permissions.write;

                        if (project_.extent) {

                            project_.staticURL = self.buildStaticMapURL(project_.extent);

                        }

                        self.project = project_;

                        self.atlasParams = AtlasDataManager.createURLData(self.project);

                        $rootScope.page.title = 'Project Summary';

                        self.loadMetrics();

                        self.loadSites();

                        self.loadArea();

                        self.loadPartnerships();

                    }

                    self.tags = Utility.processTags(self.project.tags);

                }).catch(function(errorResponse) {

                    console.log('loadProject.errorResponse', errorResponse);

                    self.showElements(false);

                });

            };

            self.addLayers = function(arr) {

                arr.forEach(function(feature) {

                    console.log(
                        'self.addLayers --> feature',
                        feature);

                    var spec = feature.layer_spec || {};

                    console.log(
                        'self.addLayers --> spec',
                        spec);

                    feature.spec = spec;

                    console.log(
                        'self.addLayers --> feature.spec',
                        feature.spec);

                    if (!feature.selected ||
                        typeof feature.selected === 'undefined') {

                        feature.selected = false;

                    } else {

                        feature.spec.layout.visibility = 'visible';

                    }

                    if (feature.spec.id) {

                        try {

                            self.map.addLayer(feature.spec);

                        } catch (error) {

                            console.log(
                                'self.addLayers --> error',
                                error);

                        }

                    }

                });

                return arr;

            };

            self.fetchLayers = function(taskId) {

                LayerService.collection({
                    program: self.project.program_id,
                    sort: 'index'
                }).$promise.then(function(successResponse) {

                    console.log(
                        'self.fetchLayers --> successResponse',
                        successResponse);

                    self.addLayers(successResponse.features);

                    self.layers = successResponse.features;

                    console.log(
                        'self.fetchLayers --> self.layers',
                        self.layers);

                }, function(errorResponse) {

                    console.log(
                        'self.fetchLayers --> errorResponse',
                        errorResponse);

                });

            };

            self.toggleLayer = function(layerId) {

                console.log(
                    'self.toggleLayer:layerId:',
                    layerId
                );

                self.preventFullCycle = true;

                LayerUtil.toggleLayer(layerId, self.map);

            };

            self.switchMapStyle = function(style, index) {

                console.log('self.switchMapStyle --> styleId', style);

                console.log('self.switchMapStyle --> index', index);

                console.log(
                    'self.switchMapStyle:currentStyle',
                    self.map.getStyle()
                );

                self.visibilityIndex = LayerUtil.visibilityIndex(self.map);

                console.log(
                    'switchMapStyle:visibilityIndex:',
                    self.visibilityIndex);

                // self.currentStyleString = MapUtil.getStyleString(self.map);
                //
                // console.log(
                //     'switchMapStyle:currentStyleString:',
                //     self.currentStyleString);

                //
                // Update URL data.
                //

                // if (self.primaryNode) {
                //
                //     self.updateUrlParams();
                //
                // }

                self.mapOptions.style = self.mapStyles[index].url;

                LayerUtil.setGlobalLabelColor(
                    self.mapOptions.style
                );

                self.map.setStyle(
                    self.mapStyles[index].url,
                    {
                        diff: false
                    }
                );

            };

            self.populateMap = function () {

                LayerUtil.addReferenceSources(self.map);

                LayerUtil.addReferenceLayers(self.map);

                // LabelLayer.addLabelLayers(self.map);

                DataLayer.addDataLayers(self.map);

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                LayerUtil.setVisibilityFromArray(
                    self.map,
                    self.layers
                );

            };

            self.getMapOptions = function() {

                self.mapStyles = mapbox.baseStyles;

                console.log(
                    'self.createMap --> mapStyles',
                    self.mapStyles);

                self.activeStyle = 1;

                // mapboxgl.accessToken = mapbox.accessToken;

                console.log(
                    'self.createMap --> accessToken',
                    mapboxgl.accessToken);

                self.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                self.mapOptions.container = 'primary--map';

                self.mapOptions.style = self.mapStyles[self.activeStyle].url;

                return self.mapOptions;

            };

            self.filterFacilities = function (index) {

                var target = self.statuses[index];

                var arr = JSON.parse(JSON.stringify(fac.idx.features));

                var matches = arr.filter(function (feature) {

                    var statuses = feature.properties.statuses;

                    return statuses.indexOf(target.label) >= 0;

                });

                var featureCollection = {
                    'type': 'FeatureCollection',
                    'features': matches
                };

                var source = self.map.getSource('ogw-facility');

                if (source !== undefined) {

                    source.setData({
                        'type': 'FeatureCollection',
                        'features': matches
                    });

                } else {

                    self.map.addSource('ogw-facility', {
                        'type': 'geojson',
                        'data': featureCollection
                    });

                }

                // if (!status.selected) {
                //
                //     self.facStatus = undefined;
                //
                //     self.map.setLayoutProperty(
                //         'ogw-facility',
                //         'visibility',
                //         'visible'
                //     );
                //
                //     self.map.setLayoutProperty(
                //         'fac-filter',
                //         'visibility',
                //         'none'
                //     );
                //
                // } else {
                //
                //     self.map.setLayoutProperty(
                //         'ogw-facility',
                //         'visibility',
                //         'none'
                //     );
                //
                //     self.facStatus = status;
                //
                //     var arr = JSON.parse(JSON.stringify(fac.idx.features));
                //
                //     var matches = arr.filter(function (feature) {
                //
                //         var statuses = feature.properties.statuses;
                //
                //         return statuses.indexOf(status.label) >= 0;
                //
                //     });
                //
                //     var featureCollection = {
                //         'type': 'FeatureCollection',
                //         'features': matches
                //     };
                //
                //     var source = self.map.getSource('ogw-facility');
                //
                //     if (source !== undefined) {
                //
                //         source.setData({
                //             'type': 'FeatureCollection',
                //             'features': matches
                //         });
                //
                //     } else {
                //
                //         self.map.addSource('fac-filter', {
                //             'type': 'geojson',
                //             'data': featureCollection
                //         });
                //
                //     }
                //
                //     var layer = self.map.getSource('ogw-facility');
                //
                //     if (layer === undefined) {
                //
                //         self.map.addLayer({
                //             'id': 'fac-filter',
                //             'type': 'circle',
                //             'source': 'ogw-facility', // reference the data source
                //             'layout': {},
                //             'paint': {
                //                 'circle-color': '#ff0000',
                //                 'circle-radius': [
                //                     'interpolate',
                //                     ['exponential', 0.5],
                //                     ['zoom'],
                //                     2,
                //                     0.5,
                //                     20,
                //                     6
                //                 ],
                //                 'circle-stroke-width': 2,
                //                 'circle-stroke-color': '#FFFFFF'
                //             }
                //         });
                //
                //     } else {
                //
                //         self.map.setLayoutProperty(
                //             'fac-filter',
                //             'visibility',
                //             'visible'
                //         );
                //
                //     }
                //
                // }

            };

            self.addMapRadius = function () {

                let _center = turf.point(self.location.coordinates);
                let _radius = 3;
                let _options = {
                    steps: 100,
                    units: 'miles'
                };

                let _circle = turf.circle(_center, _radius, _options);

                self.map.addSource('ej-radius', {
                    type: 'geojson',
                    data: _circle,
                });

                self.map.addLayer({
                    id: 'circle-fill',
                    type: 'fill',
                    source: 'ej-radius',
                    paint: {
                        'fill-color': 'yellow',
                        'fill-opacity': 0.2,
                    },
                });

                var bounds = turf.bbox(_circle);

                self.map.fitBounds(bounds, {
                    padding: 40
                });

            };

            self.createMap = function(options) {

                if (!options) return;

                console.log('self.createMap --> options', options);

                self.map = new mapboxgl.Map(options);

                self.map.on('load', function() {

                    // var nav = new mapboxgl.NavigationControl();
                    //
                    // self.map.addControl(nav, 'top-left');
                    //
                    // var fullScreen = new mapboxgl.FullscreenControl();
                    //
                    // self.map.addControl(fullScreen, 'top-left');

                    var geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        clearOnBlur: true,
                        countries: 'us',
                        mapboxgl: mapboxgl,
                        marker: false,
                        minLength: 3,
                        placeholder: 'Find addresses and places'
                    });

                    self.map.addControl(
                        geocoder,
                        'top-left'
                    );

                    var nav = new mapboxgl.NavigationControl();

                    self.map.addControl(nav, 'top-left');

                    var fullScreen = new mapboxgl.FullscreenControl();

                    self.map.addControl(fullScreen, 'top-left');

                    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
                    var bbox = turf.bbox(line);
                    self.map.fitBounds(bbox, { duration: 0, padding: 40 });

                    // var feature = {
                    //     'type': 'Feature',
                    //     'geometry': self.location,
                    //     'properties': {
                    //         'id': self.node.id,
                    //         'name': self.node.name
                    //     }
                    // };

                    // MapManager.addFeature(
                    //     self.map,
                    //     feature,
                    //     null,
                    //     true,
                    //     false);

                    self.addMapRadius();

                    var el = document.createElement('div');
                    el.className = 'facility-marker';

                    new mapboxgl.Marker(el)
                        .setLngLat(self.location.coordinates)
                        .addTo(self.map);

                    self.map.addSource('ogw-facility', {
                        'type': 'geojson',
                        'data': self.featureCollection
                    });

                    self.map.addLayer({
                        'id': 'ogw-facility',
                        'type': 'circle',
                        'source': 'ogw-facility', // reference the data source
                        'layout': {},
                        'paint': {
                            'circle-color': '#ff0000',
                            'circle-radius': [
                                'interpolate',
                                ['exponential', 0.5],
                                ['zoom'],
                                2,
                                0.5,
                                20,
                                6
                            ],
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF'
                        }
                    });

                    self.map.on('click', 'ogw-facility', function (e) {

                        console.log(e);

                        console.log(e.features);

                        $scope.$apply(function () {

                            $location.path('facility/' + e.features[0].properties.id);

                        });

                    });

                    self.map.on('mouseenter', 'ogw-facility', function () {
                        self.map.getCanvas().style.cursor = 'pointer';
                    });

                    self.map.on('mouseleave', 'ogw-facility', function () {
                        self.map.getCanvas().style.cursor = '';
                    });

                    //
                    // Add reference sources and layers.
                    //

                    LayerUtil.resetCustomIdx();

                    self.populateMap();

                    LayerUtil.resetSources(self.map);

                    // if (self.layers && self.layers.length) {
                    //
                    //     self.addLayers(self.layers);
                    //
                    // } else {
                    //
                    //     self.fetchLayers();
                    //
                    // }

                });

                self.map.on('styledata', function() {

                    console.log(
                        'styledata:style:',
                        self.map.getStyle()
                    );

                    // console.log(
                    //     'styledata:currentStyleString:',
                    //     self.currentStyleString
                    // );

                    //
                    // Reset flag set ahead of single layer visibility change.
                    //

                    if (self.preventFullCycle) {

                        self.preventFullCycle = false;

                        return;

                    }

                    // var styleString = MapUtil.getStyleString(self.map);
                    //
                    // console.log(
                    //     'styledata:styleString:',
                    //     styleString
                    // );

                    //
                    // Set text color for label layers.
                    //

                    LayerUtil.setTextColor(self.map);

                    // if (!angular.isDefined(self.currentStyleString)) return;

                    //
                    // Restore reference sources and layers.
                    //

                    self.populateMap();

                    //
                    // Restore feature source data.
                    //

                    SourceUtil.restoreSources(self.map);

                });

                self.map.on('moveend', function() {

                    var center = self.map.getCenter();

                    console.log(
                        'self.map.moveend:center:',
                        center
                    );

                    if (!self.mapCenter) {

                        self.mapCenter = center;

                    }

                    console.log(
                        'self.map.moveend:self.mapCenter:',
                        self.mapCenter
                    );

                    var zoom = Utility.precisionRound(
                        self.map.getZoom(),
                        2
                    );

                    console.log(
                        'self.map.moveend:zoom:',
                        zoom
                    );

                    if (!self.trackedZoom) {

                        self.trackedZoom = zoom;

                    }

                    console.log(
                        'self.map.moveend:self.trackedZoom:',
                        self.trackedZoom
                    );

                    var zoomDelta = Math.abs(
                        Math.floor(zoom) - Math.floor(self.trackedZoom)
                    );

                    console.log(
                        'self.map.moveend:zoomDelta:',
                        zoomDelta
                    );

                    var lngDelta = Math.abs(center.lng - self.mapCenter.lng);

                    console.log(
                        'self.map.moveend:lngDelta:',
                        lngDelta
                    );

                    var latDelta = Math.abs(center.lat - self.mapCenter.lat);

                    console.log(
                        'self.map.moveend:latDelta:',
                        latDelta
                    );

                    var tolerance = 0.001;

                    if (zoomDelta > 0 ||
                        lngDelta >= tolerance ||
                        latDelta >= tolerance) {

                        self.mapCenter = center;

                        self.trackedZoom = zoom;

                        EsriLayerService.refreshFeatureLayers(self.map);

                        // self.refreshFeatureLayers();

                    }

                });

            };

            //
            // End batch import methods
            //

            self.reloadPage = function() {
                $location.reload();
            };

            self.indexVars = function() {

                self.varIndex = {};

                for (let i = 0; i < self.node.variables.length; i++) {

                    let feature = self.node.variables[i];

                    self.varIndex[feature.normalized_name] = feature;

                }

                console.log(
                    'indexVars:varIndex',
                    self.varIndex
                );

            };

            self.extractLocation = function() {

                for (let i = 0; i < self.node.variables.length; i++) {

                    let feature = self.node.variables[i];

                    if (feature.type.startsWith('location')) {

                        return feature.value;

                    }

                }

            };

            self.createStaticURL = function() {

                var lat = 0,
                    lng = 0;

                if (self.location.hasOwnProperty('coordinates')) {

                    lat = self.location.coordinates[1];
                    lng = self.location.coordinates[0];

                }

                self.staticUrl = [
                    'https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/',
                    [
                        lng,
                        lat,
                        5,
                        0
                    ].join(','),
                    '/640x640?access_token=',
                    mapboxgl.accessToken
                ].join('');

            };

            self.loadDemographics = function () {

                var geometry = {
                    spatialReference: {
                        wkid: 4326
                    },
                    x: self.location.coordinates[0],
                    y: self.location.coordinates[1]
                };

                var params = {
                    namestr: '',
                    geometry: geometry,
                    distance: 3,
                    unit: 9035,
                    areatype: '',
                    areaid: '',
                    f: 'pjson'
                };

                EJScreenInterface.query(params).$promise.then(function(successResponse) {

                    console.log(
                        'loadDemographics:successResponse:',
                        successResponse
                    );

                }, function(errorResponse) {

                    console.log(
                        'loadDemographics:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.incrementEmissions = function(varIndex, arr) {

                console.log(
                    'incrementEmissions:varIndex:',
                    varIndex
                );

                var total = 0;

                arr.forEach(function (feature) {

                    if (varIndex.hasOwnProperty(feature.normalized_name)) {

                        console.log(
                            'incrementEmissions:feature:',
                            feature
                        );

                        var value = varIndex[feature.normalized_name].value;

                        console.log(
                            'incrementEmissions:value:',
                            value
                        );

                        if (typeof value === 'number' &&
                            value > -Infinity) {

                            console.log(
                                'incrementEmissions:match'
                            );

                            total += value;

                        }

                    }

                });

                return total;

            };

            self.aggregateEmissions = function() {

                console.log(
                    'aggregateEmissions:projects:',
                    self.graph.projects
                );

                if (!Array.isArray(self.graph.projects)) return;

                self.graph.projects.forEach(function (feature) {

                    self.totalGHG = self.incrementEmissions(
                        feature.variables,
                        self.airPollutants.filter(function (feature) {

                            return feature.normalized_name === 'greenhouse_gases_co2e';

                        })
                    );

                    self.totalCriteria = self.incrementEmissions(
                        feature.variables,
                        self.airPollutants.filter(function (feature) {

                            return feature.normalized_name !== 'greenhouse_gases_co2e';

                        })
                    );

                });

            };

            self.countPreConstruction = function() {

                self.preConstruction = 0;

                if (!Array.isArray(self.graph.projects)) return;

                self.graph.projects.forEach(function (feature) {

                    var status = feature.variables.operating_status.value;

                    console.log(
                        'countPreConstruction:status:',
                        status
                    );

                    if (typeof status === 'string') {

                        status = status.toLowerCase().trim();

                        if (status === 'pre-construction') {

                            self.preConstruction += 1;

                        }

                    }

                });

            };

            self.loadPermits = function(projectId) {

                if (!Array.isArray(self.graph.projects)) return;

                self.graph.permits = {};

                self.graph.projects.forEach(function (feature) {

                    self.loadEdges(feature.id, 'permits', 6);

                });

            };

            self.loadEdges = function(nodeId, type, varId) {

                Node.graph({
                    id: nodeId,
                    varId: varId
                }).$promise.then(function(successResponse) {

                    console.log(
                        'loadEdges:successResponse:',
                        successResponse
                    );

                    successResponse.features.forEach(function (feature) {

                        var data = feature.variables;

                        var idx = {};

                        data.forEach(function (variable) {

                            idx[variable.normalized_name] = variable;

                        });

                        feature.variables = idx;

                    });

                    if (type === 'permits') {

                        self.graph.permits[nodeId] = successResponse.features;

                    } else {

                        self.graph[type] = successResponse.features;

                    }

                    self.aggregateEmissions();

                    self.countPreConstruction();

                    if (type === 'projects') self.loadPermits();

                }, function(errorResponse) {

                    console.log(
                        'loadEdges:errorResponse:',
                        errorResponse
                    );

                    self.alerts = [{
                        'type': 'error',
                        'flag': 'Error!',
                        'msg': 'Unable to load linked records.',
                        'prompt': 'OK'
                    }];

                    $timeout(closeAlerts, 2000);

                });

            };

            self.indexFacilities = function() {

                var index = {};

                var stateAbbrs = [];

                for (let i = 0; i < self.facilities.length; i++) {

                    let feature = self.facilities[i];

                    let state = feature.properties.state;

                    if (stateAbbrs.indexOf(state) < 0) {

                        stateAbbrs.push(state);

                    }

                    Utility.sortCollection(stateAbbrs);

                    if (index.hasOwnProperty(state)) {

                        index[state].push(feature.properties);

                    } else {

                        index[state] = [feature.properties];

                    }

                }

                console.log(
                    'indexFacilities:index:',
                    index
                );

                console.log(
                    'indexFacilities:stateAbbrs:',
                    stateAbbrs
                );

                self.stateAbbrs = stateAbbrs;

                self.index = index;

            };

            self.loadNodes = function() {

                self.facilities = self.featureCollection.features;

                self.indexFacilities();

                self.location = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [-125.8657877461, 25.046176975],
                                [-66.6750098822, 25.046176975],
                                [-66.6750098822, 49.4595441893],
                                [-125.8657877461, 49.4595441893],
                                [-125.8657877461, 25.046176975]
                            ]
                        ]
                    }
                };

                self.showElements(true);

                // Node.getSingle({
                //     id: $route.current.params.nodeId
                // }).$promise.then(function(successResponse) {
                //
                //     console.log(
                //         'loadNode:successResponse:',
                //         successResponse
                //     );
                //
                //     self.node = successResponse;
                //
                //     self.location = self.extractLocation();
                //
                //     self.loadDemographics();
                //
                //     console.log(
                //         'loadNode:location:',
                //         self.location
                //     );
                //
                //     self.createStaticURL();
                //
                //     self.indexVars();
                //
                //     self.graphRequests.forEach(function (config) {
                //
                //         self.loadEdges(
                //             $route.current.params.nodeId,
                //             config.type,
                //             config.varId);
                //
                //     });
                //
                //     self.showElements(true);
                //
                // }, function(errorResponse) {
                //
                //     console.log(
                //         'loadNode:errorResponse:',
                //         errorResponse
                //     );
                //
                //     self.alerts = [{
                //         'type': 'error',
                //         'flag': 'Error!',
                //         'msg': 'Unable to load record.',
                //         'prompt': 'OK'
                //     }];
                //
                //     $timeout(closeAlerts, 2000);
                //
                // });

            };

            self.loadNodes();

        });