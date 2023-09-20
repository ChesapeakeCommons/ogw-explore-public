'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('PipelineSummaryController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, $window, $timeout, $filter, mapbox, Utility,
                 $interval, LayerService, Node, MapManager,
                 QueryParamManager, AtlasDataManager,
                 EsriLayerService, DataLayer, LayerUtil, SourceUtil, FacilityIndex,
                 ProjectIndex, Frame, FrameDataService, Stat, Rollup, MarkdownParser) {

            var self = this;

            mapboxgl.accessToken = mapbox.accessToken;

            $rootScope.viewState = {
                'pipeline': true
            };

            $rootScope.page = {};

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.permitIdx = {};

            self.permitCount = 0;

            self.frameRequests = {
                project: [
                    {
                        recordType: 3,
                        key: 'project'
                    }
                ],
                permit: [
                    {
                        recordType: 4,
                        key: 'air_construction'
                    },
                    {
                        recordType: 12,
                        key: 'nga'
                    },
                    {
                        recordType: 16,
                        key: 'cwa_npdes'
                    },
                    {
                        recordType: 17,
                        key: 'cwa_wetland'
                    },
                    {
                        recordType: 18,
                        key: 'air_operating'
                    }
                ]
            };

            self.recordTypeIdx = FrameDataService.indexNodeTypes();

            self.showElements = function(createMap) {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

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

            self.switchMapStyle = function(style, index) {

                console.log(
                    'PipelineSummaryController.switchMapStyle --> styleId',
                    style
                );

                console.log(
                    'PipelineSummaryController.switchMapStyle --> index',
                    index
                );

                console.log(
                    'PipelineSummaryController.switchMapStyle:currentStyle',
                    self.map.getStyle()
                );

                self.visibilityIndex = LayerUtil.visibilityIndex(self.map);

                console.log(
                    'PipelineSummaryController.switchMapStyle:visibilityIndex:',
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

                // LayerUtil.addReferenceSources(self.map);

                // LayerUtil.addReferenceLayers(self.map);

                // LabelLayer.addLabelLayers(self.map);

                // DataLayer.addDataLayers(self.map, 'facility');

                LayerUtil.setVisibility(
                    self.map,
                    self.visibilityIndex
                );

                LayerUtil.setVisibilityFromArray(
                    self.map,
                    self.layers
                );

                let geometry = self.varIndex['location_variable:9'].value;

                if (!Utility.isObject(geometry)) {

                    let associatedFacilities = self.featureCollection.features.filter(function (feature) {
                        return feature.properties.assoc;
                    });

                    if (associatedFacilities.length) {

                        let features = turf.featureCollection(associatedFacilities);

                        geometry = turf.envelope(features);

                    } else {
                        geometry = turf.lineString([[-124.848974, 24.396308], [-66.885444, 49.384358]]);
                    }

                }

                console.log(
                    'PipelineSummaryController.populateMap():geometry:',
                    geometry
                );

                MapManager.addPipelineLayer(
                    self.map,
                    true,
                    100,
                    [self.node.id.toString()],
                    geometry
                );

                MapManager.addFacilityLayer(
                    self.map,
                    self.featureCollection,
                    false
                );

            };

            self.getMapOptions = function() {

                self.mapStyles = mapbox.baseStyles;

                console.log(
                    'PipelineSummaryController.getMapOptions:mapStyles',
                    self.mapStyles);

                self.activeStyle = 1;

                console.log(
                    'PipelineSummaryController.getMapOptions:accessToken',
                    mapboxgl.accessToken);

                self.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                self.mapOptions.container = 'primary--map';

                self.mapOptions.style = self.mapStyles[self.activeStyle].url;

                return self.mapOptions;

            };

            self.layers = [];

            self.createMap = function(options) {

                if (!options) return;

                console.log(
                    'PipelineSummaryController.createMap:options',
                    options
                );

                self.map = new mapboxgl.Map(options);

                // self.map.once('idle', function () {
                //     var geocoder = new MapboxGeocoder({
                //         accessToken: mapboxgl.accessToken,
                //         clearOnBlur: true,
                //         countries: 'us',
                //         mapboxgl: mapboxgl,
                //         marker: false,
                //         minLength: 3,
                //         placeholder: 'Find addresses and places'
                //     });
                //
                //     document.querySelector('.geocoder').appendChild(geocoder.onAdd(self.map));
                //
                //     var nav = new mapboxgl.NavigationControl();
                //
                //     self.map.addControl(nav, 'top-left');
                //
                //     var fullScreen = new mapboxgl.FullscreenControl();
                //
                //     self.map.addControl(fullScreen, 'top-left');
                //
                //     var scale = new mapboxgl.ScaleControl({
                //         maxWidth: 80,
                //         unit: 'imperial'
                //     });
                //
                //     self.map.addControl(scale, 'bottom-right');
                // });

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

                    // self.map.setCenter([-103.771556, 44.967243]);

                    // self.map.setZoom(5);

                    // var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
                    //
                    // var polygon = turf.polygon(self.location.coordinates);
                    // var bbox = turf.bbox(polygon);
                    // self.map.fitBounds(bbox, { duration: 0, padding: 40 });

                    MapManager.createFacilityPopup(self.map);

                    MapManager.createPipelinePopup(self.map);

                    //
                    // Add reference sources and layers.
                    //

                    LayerUtil.resetCustomIdx();

                    // self.populateMap();

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
                        'PipelineSummaryController.styledata:style:',
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
                        'PipelineSummaryController.map.moveend:center:',
                        center
                    );

                    if (!self.mapCenter) {

                        self.mapCenter = center;

                    }

                    console.log(
                        'PipelineSummaryController.map.moveend:self.mapCenter:',
                        self.mapCenter
                    );

                    var zoom = Utility.precisionRound(
                        self.map.getZoom(),
                        2
                    );

                    console.log(
                        'PipelineSummaryController.map.moveend:zoom:',
                        zoom
                    );

                    if (!self.trackedZoom) {

                        self.trackedZoom = zoom;

                    }

                    console.log(
                        'PipelineSummaryController.map.moveend:self.trackedZoom:',
                        self.trackedZoom
                    );

                    var zoomDelta = Math.abs(
                        Math.floor(zoom) - Math.floor(self.trackedZoom)
                    );

                    console.log(
                        'PipelineSummaryController.map.moveend:zoomDelta:',
                        zoomDelta
                    );

                    var lngDelta = Math.abs(center.lng - self.mapCenter.lng);

                    console.log(
                        'PipelineSummaryController.map.moveend:lngDelta:',
                        lngDelta
                    );

                    var latDelta = Math.abs(center.lat - self.mapCenter.lat);

                    console.log(
                        'PipelineSummaryController.map.moveend:latDelta:',
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

            self.parseMarkdown = function(data) {

                data.value = MarkdownParser.render(
                    data.value
                );

            };

            self.indexVars = function() {

                self.varIndex = {};

                let mdVars = [
                    'text_variable:49',
                    'text_variable:156',
                ];

                for (let i = 0; i < self.node.variables.length; i++) {

                    let feature = self.node.variables[i];

                    if (mdVars.indexOf(feature.key) >= 0) {

                        self.parseMarkdown(feature);

                    }

                    self.varIndex[feature.normalized_name] = feature;

                    self.varIndex[feature.key] = feature;

                }

                // for (let i = 0; i < self.node.variables.length; i++) {
                //
                //     let feature = self.node.variables[i];
                //
                //     self.varIndex[feature.normalized_name] = feature;
                //
                // }

                console.log(
                    'PipelineSummaryController.indexVars:varIndex',
                    self.varIndex
                );

            };

            self.parseAffectedStates = function(arr) {

                console.log(
                    'PipelineSummaryController.parseAffectedStates:',
                    arr
                );

                if (arr && Array.isArray(arr)) {

                    let fullNames = [];

                    arr.forEach(function (item) {
                        fullNames.push(
                            $filter('stateCode')(item.value)
                        );
                    });

                    fullNames.sort();

                    console.log(
                        'PipelineSummaryController.parseAffectedStates:',
                        fullNames
                    );

                    self.affectedStates = fullNames.join(', ');

                } else {

                    self.affectedStates = 'N/A';

                }

            };

            self.fetchProjects = function (arr) {

                Frame.get({
                    id: 3,
                    record: arr.join(','),
                    // domain: 'relation:5,34,37,41,42,44'
                }).$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.fetchProjects:successResponse:',
                        successResponse
                    );

                    self.frameData = successResponse.tree;

                    var projectKeys = Utility.linkedKeys(
                        successResponse.tree[self.node.id]['relation:5']
                    );

                    console.log(
                        'PipelineSummaryController.fetchProjects:projectKeys:',
                        projectKeys
                    );

                }, function(errorResponse) {

                    console.log(
                        'PipelineSummaryController.fetchProjects:errorResponse:',
                        errorResponse);

                });

            };

            self.indexPermitKeys = function (data) {

                console.log(
                    'PipelineSummaryController.indexPermitKeys:data:',
                    data
                );

                //
                // Extra project array from frame tree.
                //

                var subtrees = Utility.values(data);

                let permitKeys = [
                    'relation:29',
                    'relation:47',
                    'relation:56',
                    'relation:58'
                ];

                subtrees.forEach(function (datum) {

                    for (var key in datum) {

                        if (datum.hasOwnProperty(key) &&
                            permitKeys.indexOf(key) >= 0) {

                            if (!self.permitIdx.hasOwnProperty(key)) {

                                self.permitIdx[key] = [];

                            }

                            var keys = Utility.linkedKeys(
                                datum[key]
                            );

                            self.permitCount += keys.length;

                            self.permitIdx[key] = self.permitIdx[key].concat(keys);

                        }

                    }

                });

                console.log(
                    'PipelineSummaryController.indexPermitKeys:idx:',
                    self.permitIdx
                );

            };

            self.fetchPermitKeys = function (arr) {

                //
                // Extract from project frame.
                //

                // Frame.get({
                //     id: 3,
                //     record: arr.join(','),
                //     domain: 'relation:6,30,36'
                // }).$promise.then(function(successResponse) {
                //
                //     console.log(
                //         'fetchPermitKeys:successResponse:',
                //         'via project frame',
                //         successResponse
                //     );
                //
                //     self.indexPermitKeys(successResponse.tree);
                //
                // }, function(errorResponse) {
                //
                //     console.log('errorResponse', errorResponse);
                //
                // });

                //
                // Extract from pipeline frame.
                //

                Frame.get({
                    id: 9,
                    record: self.node.id,
                    // domain: 'relation:29'
                }).$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.fetchPermitKeys:successResponse:',
                        'via facility frame',
                        successResponse
                    );

                    self.indexPermitKeys(successResponse.tree);

                }, function(errorResponse) {

                    console.log('PipelineSummaryController.errorResponse', errorResponse);

                });

            };

            self.fetchFacilityKeys = function () {

                Frame.get({
                    id: 9,
                    record: self.node.id,
                    // domain: 'relation:7'
                }).$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.fetchFacilityKeys:successResponse:',
                        successResponse
                    );

                    try {

                        self.facilityKeys = Utility.linkedKeys(
                            successResponse.tree[self.node.id]['relation:7']
                        );

                        console.log(
                            'PipelineSummaryController.fetchFacilityKeys:facilityKeys:',
                            self.facilityKeys
                        );

                        self.loadFacilityIndex();

                    } catch (e) {

                    }

                }, function(errorResponse) {

                    console.log(
                        'PipelineSummaryController.fetchFacilityKeys:errorResponse',
                        errorResponse);

                });

            };

            self.fetchAssociatedFacilities = function () {

                Frame.get({
                    id: 9,
                    record: self.node.id,
                    // domain: 'relation:7'
                }).$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.fetchAssociatedFacilities:successResponse:',
                        successResponse
                    );

                    try {

                        self.assocFacilities = Utility.linkedKeys(
                            successResponse.tree[self.node.id]['relation:7'],
                            true
                        );

                        console.log(
                            'PipelineSummaryController.fetchAssociatedFacilities:assocFacilities:',
                            self.assocFacilities
                        );

                    } catch (e) {

                    }

                }, function(errorResponse) {

                    console.log(
                        'PipelineSummaryController.fetchAssociatedFacilities:errorResponse',
                        errorResponse);

                });

            };

            self.fetchAssociatedPipelines = function () {

                Frame.get({
                    id: 9,
                    record: self.node.id,
                    // domain: 'relation:7'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchAssociatedPipelines:successResponse:',
                        successResponse
                    );

                    try {

                        self.assocPipelines = Utility.linkedKeys(
                            successResponse.tree[self.node.id]['relation:40'],
                            true
                        );

                        console.log(
                            'fetchAssociatedPipelines:assocPipelines:',
                            self.assocPipelines
                        );

                    } catch (e) {

                    }

                }, function (errorResponse) {

                    console.log(
                        'fetchAssociatedPipelines:errorResponse',
                        errorResponse);

                });

            };

            self.getStats = function () {

                Rollup.pipe({
                    id: self.node.id
                }).$promise.then(function(successResponse) {

                    console.log(
                        'getStats:successResponse:',
                        successResponse
                    );

                    self.rollupStats = successResponse;

                }, function(errorResponse) {

                    console.warn(
                        'getStats:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadFacilityIndex = function() {

                FacilityIndex.get().$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.loadFacilityIndex:successResponse:',
                        successResponse
                    );

                    self.facilities = successResponse.features;

                    MapManager.rankFacilities(self.facilities);

                    //
                    // Create FeatureCollection from filtered facilities array.
                    //

                    var matches = [];

                    self.facilities.forEach(function (d) {

                        d.properties.assoc = self.facilityKeys.indexOf(d.properties.id) >= 0;

                        matches.push(d);

                    });

                    self.featureCollection = {
                        type: 'FeatureCollection',
                        features: matches
                    };

                    self.showElements(true);

                    // self.loadGeometry();

                }, function(errorResponse) {

                    console.warn(
                        'PipelineSummaryController.loadFacilityIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadNode = function() {

                Node.getSingle({
                    id: $route.current.params.nodeId
                }).$promise.then(function(successResponse) {

                    console.log(
                        'PipelineSummaryController.loadNode:successResponse:',
                        successResponse
                    );

                    if (!successResponse.hasOwnProperty('id')) {

                        self.makePrivate = true;

                        self.showElements(false);

                    } else {

                        self.recordDomain = [
                            successResponse.id
                        ];

                        self.baseRecordType = self.recordTypeIdx[9];

                        self.node = successResponse;

                        self.projectFilter = btoa(
                            'name|eq|' + self.node.name
                        );

                        $rootScope.page = {
                            title: self.node.name
                        };

                        console.log(
                            'PipelineSummaryController.loadNode:location:',
                            self.location
                        );

                        self.indexVars();

                        self.parseAffectedStates(
                            self.varIndex['affected_state_s'].values
                        );

                        self.fetchFacilityKeys();

                        self.fetchAssociatedFacilities();

                        // self.fetchAssociatedPipelines();

                        self.fetchPermitKeys([
                            self.node.id
                        ]);

                        self.getStats();

                        // self.getStats([
                        //     self.node.id
                        // ]);

                        // self.showElements(true);

                    }

                }, function(errorResponse) {

                    console.log(
                        'PipelineSummaryController.loadNode:errorResponse:',
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