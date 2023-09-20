'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('StateSummaryController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, mapbox, $window, $timeout, Utility,
                 $interval, LayerService, MapManager, Node,
                 QueryParamManager, AtlasDataManager, EJScreenInterface,
                 EsriLayerService, DataLayer, LayerUtil, SourceUtil,
                 StateIndex, $http, ProjectIndex, FacilityIndex,
                 FacilityFilter) {

            var self = this;

            self.abbr = $route.current.params.nodeId.toUpperCase();

            let alaskaGeometry = turf.lineString([[-168.95, 51.214183], [-129.97, 71.365162]]);

            self.projectFilter = btoa(
                'text:1|eq|' + self.abbr
            );

            self.name = StateIndex.codes[self.abbr];

            // Louisiana

            self.summary = {
                facilities: 69,
                projects: 72,
                ghg: 123600403.4,
                // crit: 111413.21
            };

            mapboxgl.accessToken = mapbox.accessToken;

            $rootScope.viewState = {
                'facility': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            $rootScope.page = {
                title: self.name
            };

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

            self.layers = [];

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
                            let feature;
                            if (self.abbr === 'AK') {
                                feature = {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: alaskaGeometry
                                };
                            } else {
                                feature = self.stateFeature;
                            }
                            MapManager.createBackdropMap(
                                mapbox.backdropOptions,
                                feature.geometry
                            );

                            MapManager.createStaticMap(
                                mapbox.staticOptions,
                                self.stateFeature,
                                'state',
                                turf.bbox(feature.geometry)
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

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                LayerUtil.setVisibilityFromArray(
                    self.map,
                    self.layers
                );

                MapManager.addPipelineLayer(
                    self.map,
                    false,
                    null
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

                for (var i = 0; i < self.mapStyles.length; i++) {

                    var style = self.mapStyles[i];

                    if (style.url.indexOf('light') >= 0) {

                        self.activeStyle = i;

                    }

                }

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

                    var nav = new mapboxgl.NavigationControl();

                    self.map.addControl(nav, 'top-left');

                    var fullScreen = new mapboxgl.FullscreenControl();

                    self.map.addControl(fullScreen, 'top-left');

                    var scale = new mapboxgl.ScaleControl({
                        maxWidth: 80,
                        unit: 'imperial'
                    });

                    self.map.addControl(scale, 'bottom-right');

                    // var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);

                    let geometry;

                    if (self.abbr === 'AK') {
                        geometry = alaskaGeometry;
                            // -179.148909 	51.214183 	179.77847 	71.365162
                        // POLYGON((-168.95 71.6, -129.97 71.6, -129.97 51.02, -168.95 51.02, -168.95 71.6))
                    } else {
                        geometry = turf.polygon(self.location.coordinates);
                    }
                    var bbox = turf.bbox(geometry);
                    self.map.fitBounds(bbox, { duration: 0, padding: 40 });

                    MapManager.createFacilityPopup(self.map);

                    MapManager.createPipelinePopup(self.map);

                    //
                    // Add reference sources and layers.
                    //

                    LayerUtil.resetCustomIdx();

                    self.populateMap();

                    LayerUtil.resetSources(self.map);

                });

                self.map.on('styledata', function() {

                    console.log(
                        'styledata:style:',
                        self.map.getStyle()
                    );

                    //
                    // Reset flag set ahead of single layer visibility change.
                    //

                    if (self.preventFullCycle) {

                        self.preventFullCycle = false;

                        return;

                    }

                    //
                    // Set text color for label layers.
                    //

                    LayerUtil.setTextColor(self.map);

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

                    }

                });

            };

            //
            // End batch import methods
            //

            self.reloadPage = function() {
                $location.reload();
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

                    console.log(
                        'aggregateEmissions:feature:',
                        feature
                    );

                    let status = feature.variables.operating_status.value;

                    console.log(
                        'aggregateEmissions:status:',
                        status
                    );

                    if (typeof status === 'string') {

                        status = status.toLowerCase().trim();

                        if (status !== 'canceled') {

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

                        }

                    }

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

                var facilityCount = 0;

                for (let i = 0; i < self.facilities.length; i++) {

                    let feature = self.facilities[i];

                    FacilityFilter.convertArrays(feature.properties);

                    FacilityFilter.assignStatusCategory(feature.properties);

                    let state = feature.properties.state;

                    if (state === self.abbr) facilityCount++;

                    if (stateAbbrs.indexOf(state) < 0) {

                        stateAbbrs.push(state);

                    }

                    Utility.sortCollection(stateAbbrs);

                    if (index.hasOwnProperty(state)) {

                        index[state].push(feature);

                    } else {

                        index[state] = [feature];

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

                self.facilityCount = facilityCount;

                self.stateAbbrs = stateAbbrs;

                self.index = index;

            };

            self.loadGeometry = function() {

                var baseUrl = [
                    'https://tigerweb.geo.census.gov/arcgis/',
                    'rest/services/TIGERweb/State_County/MapServer/0/query'
                ].join('');

                var params = {
                    where: 'STUSAB LIKE \'' + self.abbr + '\'',
                    f: 'geojson',
                    featureEncoding: 'esriDefault',
                    geometryType: 'esriGeometryEnvelope',
                    objectIds: '',
                    outFields: '*',
                    returnGeometry: true,
                    spatialRel: 'esriSpatialRelIntersects',
                    time: ''
                };

                $http({
                    cache: true,
                    method: 'GET',
                    url: baseUrl,
                    params: params,
                    headers: {}
                }).then(function successCallback(successResponse) {

                    console.log(
                        'loadGeometry:successResponse:',
                        successResponse);

                    self.stateFeature = successResponse.data.features[0];

                    self.location = self.stateFeature.geometry;

                    self.showElements(true);

                }, function errorCallback(errorResponse) {

                    console.log(
                        'loadGeometry:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadFacilityIndex = function() {

                FacilityIndex.get().$promise.then(function(successResponse) {

                    console.log(
                        'loadFacilityIndex:successResponse:',
                        successResponse
                    );

                    self.facilities = successResponse.features;

                    self.indexFacilities();

                    MapManager.rankFacilities(self.facilities);

                    self.featureCollection = {
                        type: 'FeatureCollection',
                        features: self.index[self.abbr]
                    };

                    console.log(
                        'loadFacilityIndex:featureCollection:',
                        self.featureCollection
                    );

                    self.loadGeometry();

                }, function(errorResponse) {

                    console.warn(
                        'loadFacilityIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadProjectIndex = function() {

                ProjectIndex.get().$promise.then(function(successResponse) {

                    console.log(
                        'loadProjectIndex:successResponse:',
                        successResponse
                    );

                    self.projects = successResponse.features.filter(function (feature) {
                        return feature.state === self.abbr;
                    });

                    let projectKeys = self.projects.map(function (item) {
                        return item.project;
                    });

                    console.log(
                        'loadProjectIndex:projectKeys:',
                        projectKeys
                    );

                    self.projectCount = new Set(projectKeys).size;

                    var totalGHG = 0;

                    let ghgIdx = {};

                    let criteriaIdx = {};

                    self.projects.forEach(function (feature) {

                        console.log(
                            'loadProjectIndex:project:',
                            feature
                        );

                        let status = feature.status;

                        console.log(
                            'loadProjectIndex:status:',
                            status
                        );

                        if (typeof status === 'string') {

                            status = status.toLowerCase().trim();

                            if (status !== 'canceled') {

                                ghgIdx[feature.project] = feature.ghg;

                                criteriaIdx[feature.project] = feature.criteria;

                            }

                        }

                    });

                    console.log(
                        'loadProjectIndex:totalGHG:',
                        totalGHG
                    );

                    let ghgValues = Utility.values(ghgIdx);

                    self.totalGHG = ghgValues.reduce((partialSum, a) => partialSum + a, 0);

                    let criteriaValues = Utility.values(criteriaIdx);

                    self.totalCriteria = criteriaValues.reduce((partialSum, a) => partialSum + a, 0);

                }, function(errorResponse) {

                    console.warn(
                        'loadProjectIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadNode = function() {

                self.loadFacilityIndex();

                self.loadProjectIndex();

            };

            FacilityFilter.index(true);

            self.loadNode();

        });