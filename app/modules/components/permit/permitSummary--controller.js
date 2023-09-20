'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('PermitSummaryController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, mapbox, $window, $timeout, Utility,
                 $interval, LayerService, MapManager, Node,
                 QueryParamManager, AtlasDataManager, EJScreenInterface,
                 EsriLayerService, DataLayer, LayerUtil, SourceUtil, FacilityIndex) {

            var self = this;

            mapboxgl.accessToken = mapbox.accessToken;

            $rootScope.viewState = {
                'permit': true
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

            self.statuses = [
                {
                    label: 'All',
                    selected: true
                },
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
                    label: 'All',
                    selected: true
                },
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
                    id: 'boundary',
                    legends: [
                        {
                            title: '',
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#ff4d4d',
                                    label: 'Boundary'
                                }
                            ]
                        }
                    ],
                    name: 'Facility footprint',
                    selected: true
                },
                {
                    id: 'ej-radius',
                    legends: [
                        {
                            title: '',
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#FFFF4D',
                                    label: '3-mile radius'
                                }
                            ]
                        }
                    ],
                    name: '3-Mile Demographic Indicator Radius',
                    selected: false
                },
                {
                    id: 'esri.schools',
                    legends: [
                        {
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#0000ff',
                                    label: 'School'
                                }
                            ]
                        }
                    ],
                    name: 'Public School Locations',
                    selected: false
                },
                {
                    id: 'esri.worship',
                    legends: [
                        {
                            type: 'categorical',
                            symbols: [
                                {
                                    color: '#ffd700',
                                    label: 'Place of worship'
                                }
                            ]
                        }
                    ],
                    name: 'Places of Worship',
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

                    if (createMap) {

                        $timeout(function() {

                            if (!self.mapOptions) {

                                self.mapOptions = self.getMapOptions();

                            }

                            self.createMap(self.mapOptions);

                        }, 50);

                    }

                }, 50);

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

                DataLayer.addDataLayers(self.map, 'facility');

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                LayerUtil.setVisibilityFromArray(
                    self.map,
                    self.layers
                );

                MapManager.addFacilityLayer(
                    self.map,
                    self.featureCollection
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

            self.createMap = function(options) {

                if (!options) return;

                console.log('self.createMap --> options', options);

                self.map = new mapboxgl.Map(options);

                self.map.on('load', function() {

                    var geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        clearOnBlur: true,
                        countries: 'us',
                        mapboxgl: mapboxgl,
                        marker: false,
                        minLength: 3,
                        placeholder: 'Find addresses and places'
                    });

                    document.querySelector('.geocoder').appendChild(geocoder.onAdd(self.map));

                    // self.map.addControl(
                    //     geocoder,
                    //     'top-left'
                    // );

                    var nav = new mapboxgl.NavigationControl();

                    self.map.addControl(nav, 'top-left');

                    var fullScreen = new mapboxgl.FullscreenControl();

                    self.map.addControl(fullScreen, 'top-left');

                    var scale = new mapboxgl.ScaleControl({
                        maxWidth: 80,
                        unit: 'imperial'
                    });

                    self.map.addControl(scale, 'bottom-right');

                    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
                    var bbox = turf.bbox(line);
                    self.map.fitBounds(bbox, { duration: 0, padding: 40 });

                    self.addMapRadius();

                    var nodeId = +($route.current.params.nodeId);

                    if (nodeId === 865) {

                        self.addFootprint();

                    }

                    var el = document.createElement('div');
                    el.className = 'facility-marker';

                    new mapboxgl.Marker(el)
                        .setLngLat(self.location.coordinates)
                        .addTo(self.map);

                    MapManager.createFacilityPopup(self.map);

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

                if (!Array.isArray(self.node.variables)) return null;

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

                    var datum = feature.properties;

                    self.createStaticURL(datum, feature.geometry);

                    if (index.hasOwnProperty(state)) {

                        index[state].push(datum);

                    } else {

                        index[state] = [datum];

                    }

                }

                console.log(
                    'indexFacilities:stateAbbrs:',
                    stateAbbrs
                );

                self.stateAbbrs = stateAbbrs;

                self.index = index;

            };

            self.loadFacilityIndex = function() {

                FacilityIndex.get().$promise.then(function(successResponse) {

                    console.log(
                        'loadProjectIndex:successResponse:',
                        successResponse
                    );

                    self.facilities = successResponse.features;

                    self.indexFacilities();

                    MapManager.rankFacilities(self.facilities);

                    self.featureCollection = {
                        type: 'FeatureCollection',
                        features: self.facilities
                    };

                    self.showElements(true);

                }, function(errorResponse) {

                    console.warn(
                        'loadProjectIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadNode = function() {

                Node.getSingle({
                    id: $route.current.params.nodeId
                }).$promise.then(function(successResponse) {

                    console.log(
                        'loadNode:successResponse:',
                        successResponse
                    );

                    if (!successResponse.hasOwnProperty('id')) {

                        self.makePrivate = true;

                        self.showElements(false);

                    } else {

                        self.node = successResponse;

                        self.location = self.extractLocation();

                        self.loadDemographics();

                        console.log(
                            'loadNode:location:',
                            self.location
                        );

                        self.createStaticURL();

                        self.indexVars();

                        self.loadFacilityIndex();

                        self.graphRequests.forEach(function (config) {

                            self.loadEdges(
                                $route.current.params.nodeId,
                                config.type,
                                config.varId);

                        });

                    }

                }, function(errorResponse) {

                    console.log(
                        'loadNode:errorResponse:',
                        errorResponse
                    );

                    self.alerts = [{
                        'type': 'error',
                        'flag': 'Error!',
                        'msg': 'Unable to load record.',
                        'prompt': 'OK'
                    }];

                    $timeout(closeAlerts, 2000);

                });

            };

            self.loadNode();

        });