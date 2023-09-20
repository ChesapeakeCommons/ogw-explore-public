(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .controller('HomeController', [
            'Account',
            'Notifications',
            '$rootScope',
            '$route',
            '$routeParams',
            '$scope',
            '$location',
            'mapbox',
            '$window',
            '$timeout',
            'Utility',
            '$interval',
            'LayerService',
            'MapManager',
            'Node',
            'QueryParamManager',
            'AtlasDataManager',
            'EJScreenInterface',
            'EsriLayerService',
            'DataLayer',
            'LayerUtil',
            'SourceUtil',
            'Rollup',
            'ProjectIndex',
            'FacilityIndex',
            'FrameDataService',
            'MapUtil',
            'FacilityFilter',
            function (Account, Notifications, $rootScope, $route, $routeParams,
                      $scope, $location, mapbox, $window, $timeout, Utility,
                      $interval, LayerService, MapManager, Node,
                      QueryParamManager, AtlasDataManager, EJScreenInterface,
                      EsriLayerService, DataLayer, LayerUtil, SourceUtil,
                      Rollup, ProjectIndex, FacilityIndex, FrameDataService, MapUtil,
                      FacilityFilter) {

                var self = this;

                mapboxgl.accessToken = mapbox.accessToken;

                self.recordTypeIdx = FrameDataService.indexNodeTypes();

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

                self.graph = {};

                self.graphRequests = [
                    {
                        type: 'projects',
                        varId: 5
                    }
                ];

                self.showFilterModal = true;

                self.layers = [];

                self.showElements = function (createMap) {

                    $timeout(function () {

                        self.status.loading = false;

                        self.status.processing = false;

                        if (createMap) {

                            $timeout(function () {

                                if (!self.mapOptions) {

                                    self.mapOptions = self.getMapOptions();

                                }

                                self.createMap(self.mapOptions);

                            }, 50);

                        }

                    }, 50);

                };

                self.addLayers = function (arr) {

                    arr.forEach(function (feature) {

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

                self.toggleLayer = function (layerId) {

                    console.log(
                        'self.toggleLayer:layerId:',
                        layerId
                    );

                    self.preventFullCycle = true;

                    LayerUtil.toggleLayer(layerId, self.map);

                };

                self.switchMapStyle = function (style, index) {

                    console.log('self.switchMapStyle --> styleId', style);

                    console.log('self.switchMapStyle --> index', index);

                    console.log(
                        'self.switchMapStyle:map',
                        self.map
                    );

                    console.log(
                        'self.switchMapStyle:currentStyle',
                        self.map.getStyle()
                    );

                    self.visibilityIndex = LayerUtil.visibilityIndex(self.map);

                    console.log(
                        'switchMapStyle:visibilityIndex:',
                        self.visibilityIndex);

                    self.currentStyleString = MapUtil.getStyleString(self.map);

                    console.log(
                        'switchMapStyle:currentStyleString:',
                        self.currentStyleString);

                    //
                    // Update URL data.
                    //

                    // if (self.primaryNode) {
                    //
                    //     self.updateUrlParams();
                    //
                    // }

                    self.mapOptions.style = self.mapStyles[index].url;

                    console.log(
                        'switchMapStyle:targetStyle:',
                        self.mapOptions.style
                    );

                    LayerUtil.setGlobalLabelColor(
                        self.mapOptions.style
                    );

                    try {

                        self.map.setStyle(
                            self.mapOptions.style,
                            {
                                diff: false
                            }
                        );

                    } catch (e) {

                        console.warn(
                            'self.switchMapStyle:error:',
                            e
                        );

                    }

                };

                self.populateMap = function () {

                    LayerUtil.addReferenceSources(self.map);

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
                        self.featureCollection,
                        false,
                        40,
                        'nation'
                    );

                };

                self.getMapOptions = function () {

                    self.mapStyles = mapbox.baseStyles;

                    console.log(
                        'self.createMap --> mapStyles',
                        self.mapStyles);

                    for (var i = 0; i < self.mapStyles.length; i++) {

                        var style = self.mapStyles[i];

                        if (style.url.indexOf('satellite') >= 0) {

                            self.activeStyle = i;

                        }

                    }

                    console.log(
                        'self.createMap --> accessToken',
                        mapboxgl.accessToken);

                    self.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                    self.mapOptions.container = 'primary--map';

                    self.mapOptions.style = self.mapStyles[self.activeStyle].url;

                    return self.mapOptions;

                };

                self.createStaticURL = function (feature, geometry) {

                    var lat,
                        lng;

                    try {

                        lat = geometry.coordinates[1];
                        lng = geometry.coordinates[0];

                    } catch (e) {

                        lat = 0;
                        lng = 0;

                    }

                    feature.mapThumbnail = [
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

                self.createMap = function (options) {

                    if (!options) return;

                    console.log('self.createMap --> options', options);

                    self.map = new mapboxgl.Map(options);

                    self.map.on('load', function () {

                        // self.map.scrollZoom.disable();

                        // var nav = new mapboxgl.NavigationControl();
                        //
                        // self.map.addControl(nav, 'top-left');

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

                        self.map.setCenter([-103.771556, 44.967243]);

                        self.map.setZoom(3);

                        const bounds = new mapboxgl.LngLatBounds(
                            new mapboxgl.LngLat(-125.0011, 24.9493),
                            new mapboxgl.LngLat(-66.9326, 49.5904)
                        );

                        self.map.fitBounds(bounds, {
                            padding: 40
                        });

                        MapManager.createFacilityPopup(self.map);

                        MapManager.createPipelinePopup(self.map);

                        //
                        // Add reference sources and layers.
                        //

                        LayerUtil.resetCustomIdx();

                        self.populateMap();

                        LayerUtil.resetSources(self.map);

                    });

                    self.map.on('styledata', function () {

                        console.log(
                            'styledata:style:',
                            self.map.getStyle()
                        );

                        console.log(
                            'styledata:currentStyleString:',
                            self.currentStyleString
                        );

                        //
                        // Reset flag set ahead of single layer visibility change.
                        //

                        if (self.preventFullCycle) {

                            self.preventFullCycle = false;

                            return;

                        }

                        var styleString = MapUtil.getStyleString(self.map);

                        console.log(
                            'styledata:styleString:',
                            styleString
                        );

                        //
                        // Set text color for label layers.
                        //

                        LayerUtil.setTextColor(self.map);

                        if (!angular.isDefined(self.currentStyleString)) return;

                        //
                        // Restore reference sources and layers.
                        //

                        self.populateMap();

                        //
                        // Restore feature source data.
                        //

                        SourceUtil.restoreSources(self.map);

                    });

                    self.map.on('moveend', function () {

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

                            // EsriLayerService.refreshFeatureLayers(self.map);

                            // self.refreshFeatureLayers();

                        }

                    });

                };

                self.loadRollups = function () {

                    Rollup.get().$promise.then(function (successResponse) {

                        console.log(
                            'loadRollups:successResponse:',
                            successResponse
                        );

                        self.rollups = successResponse;

                    }, function (errorResponse) {

                        console.warn(
                            'loadRollups:errorResponse:',
                            errorResponse
                        );

                    });

                    Rollup.get({
                        status: 'operating'
                    }).$promise.then(function (successResponse) {

                        console.log(
                            'loadRollups:successResponse:operating:',
                            successResponse
                        );

                        self.operatingRollups = successResponse;

                    }, function (errorResponse) {

                        console.warn(
                            'loadRollups:errorResponse:operating:',
                            errorResponse
                        );

                    });

                };

                self.loadFacilityIndex = function () {

                    FacilityIndex.get().$promise.then(function (successResponse) {

                        console.log(
                            'loadFacilityIndex:successResponse:',
                            successResponse
                        );

                        self.facilities = successResponse.features;

                        self.indexFacilities();

                        MapManager.rankFacilities(self.facilities);

                        self.featureCollection = {
                            type: 'FeatureCollection',
                            properties: {
                                set: Date.now()
                            },
                            features: self.facilities
                        };

                        console.log(
                            'loadFacilityIndex:featureCollection:',
                            self.featureCollection
                        );

                        self.showElements(true);

                    }, function (errorResponse) {

                        console.warn(
                            'loadProjectIndex:errorResponse:',
                            errorResponse
                        );

                    });

                };

                self.loadProjectIndex = function () {

                    ProjectIndex.get().$promise.then(function (successResponse) {

                        console.log(
                            'loadProjectIndex:successResponse:',
                            successResponse
                        );

                        self.projects = successResponse.features.filter(function (project) {
                            return Utility.isNumber(project.ghg);
                        });

                    }, function (errorResponse) {

                        console.warn(
                            'loadProjectIndex:errorResponse:',
                            errorResponse
                        );

                    });

                };

                self.indexFacilities = function () {

                    var index = {};

                    var stateAbbrs = [];

                    for (let i = 0; i < self.facilities.length; i++) {

                        let feature = self.facilities[i];

                        feature.properties.matched = true;

                        // FacilityFilter.convertArrays(feature.properties);

                        FacilityFilter.assignStatusCategory(feature.properties);

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

                FacilityFilter.index(true);

                self.loadRollups();

                self.loadProjectIndex();

                self.loadFacilityIndex();

                $scope.$on('facilityLayer:ready', function (event, target) {

                    console.log(
                        'HomeController.facilityLayer:ready',
                        event,
                        target
                    );

                    self.facilityLayerReady = true;

                });

            }

        ]);

}());