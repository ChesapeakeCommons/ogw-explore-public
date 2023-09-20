'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:MapInterfaceviewController
 * @description
 * # MapInterfaceviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('AtlasSnapshotController',
        function(environment, Account, Notifications, $rootScope, $http, MapInterface, $routeParams,
                 $scope, $location, mapbox, Site, $window, $timeout,
                 Utility, $interval, AtlasDataManager, AtlasLayoutUtil, ipCookie, ZoomUtil,
                 Practice, Project, Program, LayerUtil, SourceUtil, PopupUtil, MapUtil, LabelLayer,
                 DataLayer, HighlightLayer, WaterReporterInterface, GeographyService, User) {

            var self = this;

            self.queryFeatures = [];

            self.showAllFeatures = false;

            self.urlComponents = LayerUtil.getUrlComponents();

            var DRAINAGE_ID = 'fd.drainage.polygon';

            $rootScope.viewState = {
                'atlas': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            self.clsMap = {
                map: MapInterface,
                practice: Practice,
                program: Program,
                project: Project,
                site: Site,
                territory: GeographyService
            };

            self.layers = [
                {
                    id: 'fd.project.point',
                    name: 'Projects',
                    selected: true
                },
                {
                    id: 'fd.site.*',
                    name: 'Sites',
                    selected: true
                },
                {
                    id: 'fd.practice.*',
                    name: 'Practices',
                    selected: true
                },
                {
                    id: 'wr.station.point',
                    name: 'Water Reporter stations',
                    selected: false
                },
                {
                    id: DRAINAGE_ID,
                    name: 'Drainage',
                    selected: false
                }
            ];

            $rootScope.page = {};

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.padding = {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            };

            self.presentChildModal = function(featureType) {

                if (featureType !== 'practice' &&
                    featureType !== 'site') return;

                self.showChildModal = true;

                self.childType = featureType;

            };

            self.showElements = function() {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

                }, 0);

            };

            self.toggleLayerConstraint = function () {

                console.log(
                    'toggleLayerConstraint:showAllFeatures',
                    self.showAllFeatures
                );

                LayerUtil.toggleFocusFilter(
                    self.map,
                    self.showAllFeatures);

            };

            self.refreshFeatureLayers = function () {

                self.urlComponents.forEach(function (component) {

                    $timeout(function () {

                        self.updateNodeLayer(component[0], component[1]);

                    }, 500);

                });

            };

            self.updateNodeLayer = function (nodeType, geometryType,
                                             programId) {

                if (self.map === undefined) return;

                //
                // Round zoom values.
                //

                var zoom = Utility.precisionRound(
                    self.map.getZoom(),
                    2
                );

                //
                // Abort requests beyond acceptable zoom levels.
                //

                if (zoom < 14 &&
                    nodeType === 'practice' &&
                    geometryType !== 'centroid') return;

                if (zoom < 10 &&
                    nodeType === 'site' &&
                    geometryType !== 'centroid') return;

                //
                // Set default parameters.
                //

                var params = {
                    featureType: nodeType,
                    geometryType: geometryType,
                    zoom: zoom
                };

                //
                // Extract and round map bounds to avoid
                // extraneous requests triggered by micro
                // map movements.
                //

                var boundsArray = self.map.getBounds().toArray();

                var simplifiedBounds = [[], []];

                for (
                    var i = 0, point;
                    point = boundsArray[0][i];
                    i++
                ) {

                    simplifiedBounds[0].push(
                        Utility.precisionRound(point, 4)
                    );

                }

                for (
                    var i = 0, point;
                    point = boundsArray[1][i];
                    i++
                ) {

                    simplifiedBounds[1].push(
                        Utility.precisionRound(point, 4)
                    );

                }

                var bbox = [
                    simplifiedBounds[0].join(','),
                    simplifiedBounds[1].join(',')
                ].join(',');

                console.log(
                    'self.updateNodeLayer:bbox:',
                    bbox
                );

                params.bbox = bbox;

                console.log(
                    'self.updateNodeLayer:urlData:',
                    self.urlData
                );

                //
                // Extract and set ``focus`` parameter.
                //

                try {

                    var nodeString = self.urlData.node;

                    var nodeTokens = nodeString.split('.');

                    params.focus = nodeTokens.join(':');

                } catch (e) {

                    console.warn(
                        'Primary node is undefined.'
                    )

                }

                //
                // Set ``filters`` parameter.
                //

                if (!self.singleProjectMode &&
                    typeof self.filterString === 'string' &&
                    self.filterString.length) {

                    params.filters = self.filterString;

                    // params.t = Date.now();

                }

                //
                // Set ``program`` parameter.
                //

                if (programId) {

                    params.program = programId;

                }

                //
                // Dispatch request to correct resource.
                //

                if (nodeType === 'post' ||
                    nodeType === 'station') {

                    params.access_token = self.user.wr_token;

                    if (!params.access_token) return;

                    WaterReporterInterface.featureLayer(
                        params
                    ).$promise.then(function (successResponse) {

                        console.log(
                            'updateNodeLayer:successResponse:',
                            successResponse
                        );

                        successResponse.features.forEach(function (feature) {

                            feature.id = feature.properties.id;

                            AtlasDataManager.trackFeature(
                                nodeType, geometryType, feature);

                        });

                        var sourceId = 'wr.' + nodeType + '.' + geometryType;

                        var source = self.map.getSource(sourceId);

                        var fetchedFeatures = AtlasDataManager.getFetched(
                            nodeType, geometryType);

                        if (source !== undefined) {

                            source.setData({
                                'type': 'FeatureCollection',
                                'features': fetchedFeatures
                            });

                        }

                    }, function (errorResponse) {

                        console.log('Unable to load node layer data.');

                        self.showElements();

                    });

                } else {

                    params.defer = true;

                    params.access_token = self.accessToken;

                    MapInterface.featureLayer(
                        params
                    ).$promise.then(function (successResponse) {

                        console.log(
                            'updateNodeLayer:successResponse:',
                            successResponse
                        );

                        self.nodeLayer = successResponse;

                        successResponse.features.forEach(function (feature) {

                            AtlasDataManager.trackFeature(
                                nodeType, geometryType, feature);

                        });

                        var sourceId = 'fd.' + nodeType + '.' + geometryType;

                        var source = self.map.getSource(sourceId);

                        var fetchedFeatures = AtlasDataManager.getFetched(
                            nodeType, geometryType);

                        if (source !== undefined) {

                            source.setData({
                                'type': successResponse.type,
                                'features': fetchedFeatures
                            });

                        }

                    }, function (errorResponse) {

                        console.log('Unable to load node layer data.');

                        self.showElements();

                    });

                }

            };

            self.setProgram = function (token) {

                console.log(
                    'self.setProgram:token',
                    token
                );

                console.log(
                    'self.setProgram:programs',
                    self.mapSummary.programs
                );

                self.programSelection = token;

                self.mapSummary.programs.forEach(function (feature) {

                    if (feature.name === token) {

                        self.fetchPrimaryNode(
                            'program',
                            feature.id,
                            feature.id
                        );

                    }

                });

            };

            self.fetchPrimaryNode = function (featureType, featureId,
                                              programId, callback) {

                console.log(
                    'self.fetchPrimaryNode:featureType',
                    featureType
                );

                console.log(
                    'self.fetchPrimaryNode:featureId',
                    featureId
                );

                console.log(
                    'self.fetchPrimaryNode:programId',
                    programId
                );

                //
                // Reset stored array of queried features.
                //

                self.queryFeatures = undefined;

                AtlasDataManager.setQueryFeatures([]);

                var cls = self.clsMap[featureType];

                if (cls === undefined) return;

                var params = {
                    access_token: self.accessToken,
                    id: featureId,
                    defer: true,
                    src: 'atlas'
                };

                if (featureType === 'territory') {

                    params.exclude = [
                        'creator',
                        'geometry',
                        'intersections',
                        'practices',
                        'simple_geometry',
                        'targets',
                        'tasks'
                    ].join(',');

                    if (!Number.isInteger(parseInt(featureId, 10))) {

                        params.id = Utility.machineName(
                            featureId,
                            '_'
                        );

                    }

                }

                if (programId) {

                    params.program = programId;

                }

                cls.getSingle(
                    params
                ).$promise.then(function(successResponse) {

                    delete successResponse.$promise;

                    delete successResponse.$resolved;

                    self.permissions = successResponse.permissions;

                    self.primaryNode = successResponse;

                    if (!self.primaryNode.hasOwnProperty('properties')) {

                        self.primaryNode.properties = self.primaryNode;

                    }

                    self.featureType = self.primaryNode.properties.type;

                    self.featureClass = self.clsMap[self.featureType];

                    if (!self.primaryNode.hasOwnProperty('type')) {

                        self.primaryNode.type = 'Feature';

                    }

                    if ((featureType === 'practice' ||
                        featureType === 'site')) {

                        self.delineateWatershed(self.primaryNode);

                    }

                    AtlasDataManager.setPrimaryNode(self.primaryNode);

                    self.showElements();

                    MapUtil.fitMap(
                        self.map,
                        self.primaryNode,
                        self.padding,
                        false
                    );

                    if (featureType === 'territory') {

                        self.processMetrics(
                            successResponse.metric_progress
                        );

                    } else {

                        self.loadMetrics(self.primaryNode.properties.id);

                    }

                    //
                    // Set banner image in side panel.
                    //

                    AtlasLayoutUtil.clearBannerImage();

                    if (self.primaryNode.properties.picture) {

                        AtlasLayoutUtil.setBannerImage(
                            self.primaryNode
                        );

                    }

                    if (callback) callback();

                }, function(errorResponse) {

                    console.log('Unable to load feature data.');

                    self.showElements();

                    if (callback) callback();

                });

            };

            self.fetchStation = function (target) {

                //
                // Reset stored array of queried features.
                //

                self.queryFeatures = undefined;

                AtlasDataManager.setQueryFeatures([]);

                self.showLayerOptions = false;

                self.station = target;

                self.toggleSidebar(false, true);

                $timeout(function () {

                    var frame = document.getElementsByTagName('iframe')[0];

                    console.log(
                        'map.click:frame:',
                        frame
                    );

                    frame.setAttribute('height', $window.innerHeight);
                    frame.setAttribute('width', $window.innerWidth);

                    frame.style.height = $window.innerHeight;
                    frame.style.width = $window.innerWidth;

                    frame.style.backgroundColor = 'transparent';
                    frame.frameBorder = '0';
                    frame.allowTransparency = 'true';

                    frame.src = [
                        environment.waterReportApiUrl.concat('/v2/embed/station/'),
                        self.station.properties.id,
                        '?t=' + Date.now()
                    ].join('');

                }, 10);

            };

            self.fetchMap = function () {

                self.programSelection = undefined;

                self.primaryNode = undefined;

                if (angular.isDefined(self.mapSummary) &&
                    angular.isDefined(self.map)) {

                    self.processMetrics(self.primaryMetrics);

                    MapUtil.fitMap(
                        self.map,
                        self.mapSummary,
                        self.padding,
                        false
                    );

                    return;

                }

                MapInterface.get({
                    access_token: self.accessToken,
                    id: $routeParams.id,
                    defer: true
                }).$promise.then(function(successResponse) {

                    self.summary = successResponse;

                    self.mapSummary = successResponse;

                    self.featureClass = MapInterface;

                    self.loadMetrics($routeParams.id, true);

                    self.filterString = AtlasDataManager.createFilterString(
                        successResponse
                    );

                    LayerUtil.setGlobalLabelColor(successResponse.style);

                    if (!angular.isDefined(self.map)) {

                        self.stageMap(true);

                    }

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.positionSidebar = function(elem, forceClose) {

                forceClose = (typeof forceClose === 'boolean') ? forceClose : false;

                var transform = 'translateX(' + 0 + 'px)';

                if (self.collapsed || forceClose) {

                    transform = 'translateX(-' + elem.offsetWidth + 'px)';

                }

                elem.style.transform = transform;

            };

            self.toggleSidebar = function(fitMap, forceClose) {

                fitMap = (typeof fitMap === 'boolean') ? fitMap : true;

                forceClose = (typeof forceClose === 'boolean') ? forceClose : false;

                self.collapsed = !self.collapsed;

                console.log(
                    'self.toggleSidebar:collapsed',
                    self.collapsed
                );

                var elem = document.querySelector('.sidebar');

                self.padding.left = self.collapsed ? 100 : elem.offsetWidth + 100;

                console.log(
                    'self.toggleSidebar:padding:',
                    self.padding
                );

                if (fitMap) {

                    MapUtil.fitMap(
                        self.map,
                        self.primaryNode,
                        self.padding,
                        true
                    );

                }

                self.positionSidebar(elem, forceClose);

            };

            self.positionMenu = function(elem) {

                var transform = 'translateX(' + 0 + 'px)';

                if (self.menuCollapsed) {

                    transform = 'translateX(' + elem.offsetWidth + 'px)';

                }

                console.log(
                    'self.positionMenu:transform',
                    transform
                );

                elem.style.transform = transform;

            };

            self.toggleMenu = function() {

                self.menuCollapsed = !self.menuCollapsed;

                console.log(
                    'self.toggleMenu:menuCollapsed',
                    self.menuCollapsed
                );

                var elem = document.querySelector('#sidebar');

                console.log(
                    'self.toggleMenu:elem',
                    elem
                );

                self.positionMenu(elem);

            };

            self.delineateWatershed = function(feature) {

                $http({
                    method: 'POST',
                    url: 'https://watersheds.cci.drexel.edu/api/watershedboundary/',
                    data: feature.geometry
                }).then(function successCallback(successResponse) {

                    console.log(
                        'delineateWatershed:successResponse:',
                        successResponse);

                    var drainageFeature = {
                        "type": "Feature",
                        "geometry": successResponse.data,
                        "properties": {
                            "id": DRAINAGE_ID
                        }
                    };

                    AtlasDataManager.trackFeature(
                        'drainage',
                        'polygon',
                        drainageFeature
                    );

                    // set drainage source data

                    var source = self.map.getSource(DRAINAGE_ID);

                    if (source !== undefined) {

                        source.setData({
                            type: 'FeatureCollection',
                            'features': [
                                drainageFeature
                            ]
                        });

                    }

                }, function errorCallback(errorResponse) {

                    console.log(
                        'delineateWatershed:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.toggleLayer = function(layerId) {

                console.log(
                    'self.toggleLayer:layerId:',
                    layerId
                );

                self.preventFullCycle = true;

                if (layerId.endsWith('*')) {

                    var components = layerId.split('.');

                    var featureType = components[1];

                    var layerTypes = [
                        'linestring',
                        'point',
                        'polygon'
                    ];

                    layerTypes.forEach(function (layerType) {

                        var layerRef = [
                            'fd',
                            featureType,
                            layerType
                        ].join('.');

                        LayerUtil.toggleLayer(layerRef, self.map);

                    });

                } else {

                    LayerUtil.toggleLayer(layerId, self.map);

                }

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

                self.currentStyleString = MapUtil.getStyleString(self.map);

                console.log(
                    'switchMapStyle:currentStyleString:',
                    self.currentStyleString);

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

            self.getMapOptions = function() {

                self.standardStyles = mapbox.standardStyles;

                self.mapStyles = mapbox.baseStyles;

                console.log(
                    'self.createMap --> mapStyles',
                    self.mapStyles);

                self.activeStyle = 0;

                var styleString = self.mapSummary.style;

                console.log(
                    'self.getMapOptions:styleString:',
                    styleString
                );

                self.mapStyles.forEach(function (style, index) {

                    if (style.url === styleString) {

                        self.activeStyle = index;

                    }

                    // if (style.name.toLowerCase() === styleString) {
                    //
                    //     self.activeStyle = index;
                    //
                    // }

                });

                mapboxgl.accessToken = mapbox.accessToken;

                console.log(
                    'self.createMap --> accessToken',
                    mapboxgl.accessToken);

                self.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                self.mapOptions.container = 'map';

                if (typeof styleString === 'string') {

                    self.mapOptions.style = styleString;

                } else {

                    self.mapOptions.style = self.mapStyles[self.activeStyle].url;

                }

                self.mapOptions.transformRequest = function(url, resourceType) {

                    var sessionCookie = ipCookie('OGW_SESSION');

                    if (resourceType === 'Source' &&
                        url.startsWith(environment.apiUrl)) {

                        return {
                            url: url,
                            headers: {
                                'Authorization': 'Bearer ' + sessionCookie
                            },
                            credentials: 'include'  // Include cookies for cross-origin requests.
                        };

                    }

                };

                return self.mapOptions;

            };

            self.createMap = function(options) {

                if (!options) return;

                try {

                    self.map = new mapboxgl.Map(options);

                } catch (e) {

                    console.log(e);

                    return;

                }

                self.map.on('click', function (e) {

                    if (self.station) {

                        self.station = undefined;

                        self.toggleSidebar(false);

                    }

                    var features = LayerUtil.validateQueryFeatures(
                        self.map.queryRenderedFeatures(e.point)
                    );

                    console.log(
                        'map.click:features:',
                        features
                    );

                    if (!features.length) return;

                    if (features.length > 1) {

                        console.log(
                            'map.click:features.length > 1:',
                            features
                        );

                        $scope.$apply(function () {

                            self.queryFeatures = features;

                            AtlasDataManager.setQueryFeatures(
                                features
                            );

                        });

                    } else {

                        var target = features[0];

                        console.log(
                            'map.click:target:',
                            target
                        );

                        // HighlightLayer.setHighlight(
                        //     self.map,
                        //     target
                        // );

                        if (target.layer.id.indexOf('station') >= 0) {

                            console.log(
                                'map.click:station:',
                                target
                            );

                            self.fetchStation(target);

                        } else {

                            var primaryId = undefined;

                            if (angular.isDefined(self.primaryNode)) {

                                primaryId = self.primaryNode.properties.id;

                            }

                            if (target.properties.id !== primaryId) {

                                self.urlData.node = [
                                    target.properties.type,
                                    '.',
                                    target.properties.id
                                ].join('');

                                self.fetchPrimaryNode(
                                    target.properties.type,
                                    target.properties.id
                                );

                            }

                        }

                    }

                });

                self.map.on('styledata', function() {

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

                    //
                    // Remove default project layer filter since
                    // all snapshot features are pre-filtered.
                    //

                    LayerUtil.removeProjectFilter(self.map);

                });

                self.map.on('moveend', function() {

                    // if (self.singleProjectMode) return;

                    // if (angular.isDefined(self.mapSummary) &&
                    //     !self.singleProjectMode) {
                    //
                    //     var projects = self.mapSummary.projects;
                    //
                    //     console.log(
                    //         'self.map.moveend:projects',
                    //         projects
                    //     );
                    //
                    //     if (Array.isArray(projects)) {
                    //
                    //         if (projects.length === 1) {
                    //
                    //             self.singleProjectMode = true;
                    //
                    //             delete self.urlData.filters;
                    //
                    //             self.urlData.node = [
                    //                 'project.',
                    //                 projects[0].id
                    //             ].join('');
                    //
                    //             self.refreshFeatureLayers();
                    //
                    //             return;
                    //
                    //         }
                    //
                    //     }
                    //
                    // }

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

                        self.refreshFeatureLayers();

                    }

                    // self.refreshFeatureLayers();

                });

                self.map.on('load', function() {

                    var scale = new mapboxgl.ScaleControl({
                        maxWidth: 80,
                        unit: 'imperial'
                    });

                    self.map.addControl(scale, 'bottom-right');

                    var nav = new mapboxgl.NavigationControl();

                    self.map.addControl(nav, 'bottom-right');

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

                    self.padding.left = AtlasLayoutUtil.getLeftMapOffset();

                    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);

                    var bounds = turf.bbox(line);

                    self.map.fitBounds(bounds, {
                        padding: self.padding
                    });

                    //
                    // Add reference sources and layers.
                    //

                    LayerUtil.resetCustomIdx();

                    self.populateMap();

                    LayerUtil.resetSources(self.map);

                    //
                    // Remove default project layer filter since
                    // all snapshot features are pre-filtered.
                    //

                    LayerUtil.removeProjectFilter(self.map);

                    //
                    // Make adjustments dictated by core map summary object.
                    //

                    if (angular.isDefined(self.mapSummary)) {

                        var projects = self.mapSummary.projects;

                        console.log(
                            'self.map.load:projects',
                            projects
                        );

                        if (Array.isArray(projects)) {

                            if (projects.length === 1) {

                                self.singleProjectMode = true;

                                self.urlData.node = [
                                    'project.',
                                    projects[0].id
                                ].join('');

                                self.refreshFeatureLayers();

                            }

                        }

                    }

                    MapUtil.fitMap(
                        self.map,
                        self.mapSummary,
                        self.padding,
                        false
                    );

                    LayerUtil.setProgramId(0);

                    LayerUtil.addCustomLayers(
                        self.mapSummary.layers,
                        self.layers,
                        self.padding,
                        self.map,
                        self.fetchPrimaryNode);

                    if (!self.singleProjectMode) {

                        self.updateUrlParams(self.filterString);

                    }

                    self.showElements();

                });

            };

            self.setLayerVisibility = function () {

                var layerRefs = [];

                self.layers.forEach(function (layer) {

                    var visibility = layer.selected ? 'visible' : 'none';

                    if (layer.id.endsWith('*')) {

                        var components = layer.id.split('.');

                        var featureType = components[1];

                        var layerTypes = [
                            'linestring',
                            'point',
                            'polygon'
                        ];

                        layerTypes.forEach(function (layerType) {

                            var layerRef = [
                                'fd',
                                featureType,
                                layerType
                            ].join('.');

                            layerRefs.push({
                                id: layerRef,
                                visibility: visibility
                            });

                        });

                    } else {

                        layerRefs.push({
                            id: layer.id,
                            visibility: visibility
                        });

                    }

                });

                layerRefs.forEach(function (layerRef) {

                    var labelLayerId = layerRef.id + '-label';

                    var labelLayer = self.map.getLayer(labelLayerId);

                    if (labelLayer !== undefined) {

                        self.map.setLayoutProperty(
                            labelLayerId,
                            'visibility',
                            layerRef.visibility
                        );

                    }

                    self.map.setLayoutProperty(
                        layerRef.id,
                        'visibility',
                        layerRef.visibility
                    );

                });

            };

            self.populateMap = function () {

                LayerUtil.addReferenceSources(self.map);

                LayerUtil.addReferenceLayers(self.map);

                LabelLayer.addLabelLayers(self.map);

                DataLayer.addDataLayers(self.map);

                // HighlightLayer.addHighlightLayers(self.map);

                LayerUtil.addCustomLayers(
                    LayerUtil.customLayerIdx(),
                    self.layers,
                    self.padding,
                    self.map,
                    self.fetchPrimaryNode
                );

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                self.setLayerVisibility();

                LayerUtil.toggleFocusFilter(
                    self.map,
                    self.showAllFeatures
                );

            };

            self.stageMap = function(createMap) {

                AtlasLayoutUtil.sizeSidebar();

                if (createMap) {

                    if (!self.mapOptions) {

                        self.mapOptions = self.getMapOptions();

                    }

                    self.createMap(self.mapOptions);

                }

            };

            self.processMetrics = function (data) {

                Utility.processMetrics(data.features);

                if (data.hasOwnProperty('timestamp')) {

                    if (data.timestamp.toString().length === 10) {

                        data.timestamp = data.timestamp * 1000;

                    }

                    self.progressTimestamp = data.timestamp;

                }

                self.metrics = data.features;

                var nodeType;

                if (angular.isDefined(self.primaryNode)) {

                    nodeType = self.primaryNode.properties.type;

                }

                self.metrics.forEach(function(metric) {

                    Utility.calcProgress(
                        metric,
                        true,
                        nodeType
                    );

                });

                self.metrics = Utility.groupByModel(data.features);

                // self.metrics = Utility.groupByModel(data.features);

                console.log('self.metrics', self.metrics);

                $timeout(function () {

                    AtlasLayoutUtil.resizeMainContent();

                }, 50);

            }

            self.loadMetrics = function(featureId, primary) {

                self.featureClass.progress({
                    access_token: self.accessToken,
                    id: featureId,
                    defer: true
                }).$promise.then(function(successResponse) {

                    if (primary) {

                        self.primaryMetrics = successResponse;

                    }

                    self.processMetrics(successResponse);

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.updateUrlParams = function (filterString) {

                if (!angular.isDefined(filterString) ||
                    typeof filterString !== 'string') {

                    filterString = self.urlData.filters;

                }

                console.log(
                    'self.updateUrlParams:filterString',
                    filterString
                );

                var urlParams = AtlasDataManager.createURLData(
                    self.primaryNode,
                    false,
                    {
                        filterString: filterString,
                        style: self.urlData.style,
                        zoom: self.map.getZoom()
                    }
                );

                urlParams.access_token = encodeURIComponent(
                    btoa(self.accessToken)
                );

                console.log(
                    'self.updateUrlParams:urlParams',
                    urlParams
                );

                $location.search(urlParams);

                self.urlData = AtlasDataManager.getData(urlParams);

                console.log(
                    'self.updateUrlParams:urlData',
                    self.urlData
                );

            };

            self.extractUrlParams = function (params) {

                console.log(
                    'extractUrlParams:params:',
                    params
                );

                if (params.access_token) {

                    self.accessToken = atob(
                        decodeURIComponent(params.access_token)
                    );

                }

                self.origin = AtlasDataManager.getOrigin(params);

                console.log(
                    'extractUrlParams:origin:',
                    self.origin
                );

                var dataObj = AtlasDataManager.getData(params);

                console.log(
                    'extractUrlParams:dataObj:',
                    dataObj
                );

                self.urlData = dataObj || {};

                if (!self.user) {

                    self.loadUser();

                }

            };

            window.addEventListener('popstate', function (event) {
                // The popstate event is fired each time when the current history entry changes.

                var params = $location.search();

                self.extractUrlParams(params);

                // var nodeString = self.urlData.node;
                //
                // var nodeTokens = nodeString.split('.');
                //
                // self.fetchPrimaryNode(
                //     nodeTokens[0],
                //     +nodeTokens[1]
                // );

            }, false);

            $scope.$on('$destroy', function () {

                console.log(
                    'AtlasController:destroy...'
                );

                //
                // Perform a hard reset of all map data.
                //

                AtlasDataManager.resetTrackedFeatures();

                // LayerUtil.resetCustomIdx();
                //
                // LayerUtil.removeLayers(self.map);
                //
                // LayerUtil.resetSources(self.map);

                if (angular.isDefined(self.map)) self.map.remove();

            });

            //
            // Verify Account information for proper UI element display
            //

            self.loadUser = function () {

                User.me({
                    access_token: self.accessToken,
                    defer: true
                }).$promise.then(function(userResponse) {

                    $rootScope.user = Account.userObject = userResponse;

                    self.permissions = {};

                    self.user = $rootScope.user;

                    $rootScope.page.title = 'Atlas';

                    self.fetchMap();

                });

            };

            //
            // Assign map to a scoped variable
            //

            var params = $location.search();

            self.extractUrlParams(params, true);

        });