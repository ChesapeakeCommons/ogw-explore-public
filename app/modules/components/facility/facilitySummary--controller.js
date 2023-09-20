'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('FacilitySummaryController',
        function (Account, Notifications, $rootScope, $route, $routeParams,
                  $scope, $location, mapbox, $window, $timeout, $filter, Utility,
                  $interval, LayerService, MapManager, Node,
                  QueryParamManager, AtlasDataManager, EJScreenInterface,
                  EsriLayerService, DataLayer, LayerUtil, SourceUtil, FacilityIndex,
                  ProjectIndex, Frame, FrameDataService, Stat, FacilityFilter, MarkdownParser) {

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

            self.layers = [
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
                }
            ];

            self.popVars = [
                {
                    "key": "integer_variable:2",
                    "name": "Estimated population within 3 miles",
                    "normalized_name": "estimated_population_within_3_miles",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:26",
                    "name": "Percent Low Income - 3 miles",
                    "normalized_name": "percent_low_income_3_miles",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:27",
                    "name": "Percent People of Color - 3 miles",
                    "normalized_name": "percent_people_of_color_3_miles",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:28",
                    "name": "Percent People over 64 Years Old - 3 miles",
                    "normalized_name": "percent_people_over_64_years_old_3_miles",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:29",
                    "name": "Percent under 5 Years Old - 3 miles",
                    "normalized_name": "percent_under_5_years_old_3_miles",
                    "no_data": "N/A"
                }
            ];

            self.envVars = [
                {
                    "key": "float_variable:32",
                    "name": "2017 Air Toxics Cancer Risk (additional risk per million people)",
                    "normalized_name": "2017_air_toxics_cancer_risk_additional_risk_per_million_people",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:33",
                    "name": "2017 Air Toxics Respiratory Hazard Index",
                    "normalized_name": "2017_air_toxics_respiratory_hazard_index",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:34",
                    "name": "PM2.5 (ug\/m3)",
                    "normalized_name": "pm2_5_ug_m3",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:35",
                    "name": "O3 (ppb)",
                    "normalized_name": "o3_ppb",
                    "no_data": "N/A"
                },
                {
                    "key": "float_variable:36",
                    "name": "Wastewater Discharge Indicator",
                    "normalized_name": "wastewater_discharge_indicator",
                    "no_data": "N/A"
                }
            ];

            self.display = {
                projects: true,
                permits: true,
                permit1: true,
                permit2: true,
                permit3: true,
                permit4: true,
                permit5: true,
                permit6: true,
                permit7: true,
                force: {},
            };

            self.hidePermitSection = function (key) {

                self.display.force[key] = true;

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

            self.showElements = function (createMap) {

                $timeout(function () {

                    self.status.loading = false;

                    self.status.processing = false;

                    $timeout(function () {

                        // if (self.location &&
                        //     self.location.hasOwnProperty('coordinates')) {

                        MapManager.createBackdropMap(
                            mapbox.backdropOptions,
                            self.location
                        );

                        // }

                    }, 100);

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

            self.fetchLayers = function (taskId) {

                LayerService.collection({
                    program: self.project.program_id,
                    sort: 'index'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'self.fetchLayers --> successResponse',
                        successResponse);

                    self.addLayers(successResponse.features);

                    self.layers = successResponse.features;

                    console.log(
                        'self.fetchLayers --> self.layers',
                        self.layers);

                }, function (errorResponse) {

                    console.log(
                        'self.fetchLayers --> errorResponse',
                        errorResponse);

                });

            };

            self.toggleLayer = function (layerId) {

                console.log(
                    'self.toggleLayer:layerId:',
                    layerId
                );

                self.preventFullCycle = true;

                LayerUtil.toggleLayer(layerId, self.map);

                if (self.demoPopup &&
                    layerId === 'ej-radius') {

                    self.demoPopup.remove();

                }

            };

            self.switchMapStyle = function (style, index) {

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

                self.addMapRadius();

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                LayerUtil.setVisibilityFromArray(
                    self.map,
                    self.layers
                );

                let linkedPipelines = self.assocPipelines.map(function (a) {
                    return a.key.toString();
                });

                MapManager.addPipelineLayer(
                    self.map,
                    false,
                    null,
                    linkedPipelines
                );

                MapManager.addFacilityLayer(
                    self.map,
                    self.featureCollection
                );

            };

            self.getMapOptions = function () {

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

            self.addDemoPopup = function () {

                if (!self.demoPopup) {

                    self.demoPopup = new mapboxgl.Popup({
                        closeButton: true,
                        closeOnClick: true,
                        maxWidth: 'none'
                    });

                }

                self.map.on('click', 'ej-radius', function (e) {

                    console.log(
                        'ej-radius.click:',
                        e
                    );

                    var tpl = '<div class=\"label-popup\" style=\"min-width: 320px;\">' +
                        '<div>' +
                        '<span style=\"font-size: .9rem; border-bottom: 1px solid #e0e0e0;\"' +
                        'class=\"name pad-0 pad-b-50p margin-b-75p\">Demographic Indicators<\/span>' +
                        '<ul class=\"list-unstyled margin-0\">';

                    for (var i = 0; i < self.popVars.length; i++) {

                        var feature = self.popVars[i];

                        if (i < self.popVars.length - 1) {

                            tpl += '<li style=\"width: 100%; min-height: 0; border-bottom: 1px dashed #e0e0e0;\"' +
                                'class=\"card reveal fade-in pad-b-75p margin-b-75p\">';

                        } else {

                            tpl += '<li style=\"width: 100%; min-height: 0;\"' +
                                'class=\"card reveal fade-in\">';

                        }

                        tpl += '<div class=\"flex flex-dir-row flex-nwrap flex-align-end\"' +
                            'style=\"width: 100%;\">';

                        tpl += '<div class=\"flex no-grow pad-r-2\">';

                        tpl += '<strong>' + feature.name + '<\/strong>';

                        tpl += '<\/div>';

                        tpl += '<div class=\"flex grow flex-justify-end\">';

                        let value = self.varIndex[feature.key].value || 0;

                        value = $filter('number')(value, 0);

                        // if (feature.key === 'integer_variable:2') {
                        //
                        //     value = $filter('number')(value, 0);
                        //
                        // } else {
                        //
                        //     value = $filter('number')(value, 2);
                        //
                        // }

                        tpl += value;

                        tpl += '<\/div>';

                        tpl += '<\/div>';

                        tpl += '<\/li>';

                    }

                    tpl += '<\/ul>';

                    tpl += '<\/div>';

                    tpl += '<\/div>';

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    self.demoPopup.setLngLat(e.lngLat).setHTML(tpl).addTo(self.map);
                });

            };

            self.addMapRadius = function () {

                if (!Utility.isObject(self.location)) return;

                let _center = turf.point(self.location.coordinates);
                let _radius = 3;
                let _options = {
                    steps: 100,
                    units: 'miles'
                };

                let _circle = turf.circle(_center, _radius, _options);

                var source = self.map.getSource('ej-radius');

                if (source === undefined) {

                    self.map.addSource('ej-radius', {
                        type: 'geojson',
                        data: _circle,
                    });

                }

                var layer = self.map.getLayer('ej-radius');

                if (layer === undefined) {

                    self.map.addLayer({
                        id: 'ej-radius',
                        type: 'fill',
                        source: 'ej-radius',
                        paint: {
                            'fill-color': 'yellow',
                            'fill-opacity': 0.2,
                        },
                    });

                    self.addDemoPopup();

                    self.map.on('mouseenter', 'ej-radius', function () {
                        self.map.getCanvas().style.cursor = 'pointer';
                    });

                    self.map.on('mouseleave', 'ej-radius', function () {
                        self.map.getCanvas().style.cursor = '';
                    });

                }

                var bounds = turf.bbox(_circle);

                self.map.fitBounds(bounds, {
                    padding: 40
                });

            };

            self.addFootprint = function () {

                // var data = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"GeometryCollection","geometries":[{"type":"Polygon","coordinates":[[[-90.83963910395026,29.987355393073308],[-90.86149861179462,29.972164471945106],[-90.86198688486068,29.971774894779834],[-90.85617744855621,29.969300221802353],[-90.84313615367755,29.966250520927595],[-90.83511515659802,29.981739154037417],[-90.8341115579292,29.9828748617233],[-90.83963910395026,29.987355393073308]]]},{"type":"Polygon","coordinates":[[[-90.86267569321637,29.971369806470552],[-90.872144033358,29.96514368118853],[-90.86351817577119,29.956045901790954],[-90.85157949107806,29.953717170124076],[-90.8434512614495,29.965556165871796],[-90.85711411495065,29.968977412741502],[-90.86267569321637,29.971369806470552]]]}]}}]};
                //
                // var source = self.map.getSource('boundary');
                //
                // if (source === undefined) {
                //
                //     self.map.addSource('boundary', {
                //         type: 'geojson',
                //         data: data,
                //     });
                //
                // }
                //
                // var layer = self.map.getLayer('boundary');
                //
                // if (layer === undefined) {
                //
                //     self.map.addLayer({
                //         id: 'boundary',
                //         type: 'fill',
                //         source: 'boundary',
                //         paint: {
                //             'fill-color': 'red',
                //             'fill-opacity': 0.2,
                //         },
                //     });
                //
                // }

            };

            self.createMap = function (options) {

                if (!options) return;

                console.log('self.createMap --> options', options);

                self.map = new mapboxgl.Map(options);

                self.map.on('load', function () {

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

                    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
                    var bbox = turf.bbox(line);
                    self.map.fitBounds(bbox, {duration: 0, padding: 40});

                    if (Utility.isObject(self.location)) {

                        var el = document.createElement('div');
                        el.className = 'facility-marker';

                        new mapboxgl.Marker(el)
                            .setLngLat(self.location.coordinates)
                            .addTo(self.map);

                    }

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

                    }

                });

            };

            //
            // End batch import methods
            //

            self.reloadPage = function () {
                $location.reload();
            };

            self.parseMarkdown = function (data) {

                data.value = MarkdownParser.render(
                    data.value
                );

            };

            self.indexVars = function () {

                self.varIndex = {};

                let mdVars = [
                    'text_variable:86',
                    'text_variable:155',
                ];

                for (let i = 0; i < self.node.variables.length; i++) {

                    let feature = self.node.variables[i];

                    if (mdVars.indexOf(feature.key) >= 0) {

                        self.parseMarkdown(feature);

                    }

                    self.varIndex[feature.normalized_name] = feature;

                    self.varIndex[feature.key] = feature;

                }

                console.log(
                    'indexVars:varIndex',
                    self.varIndex
                );

            };

            self.extractLocation = function () {

                if (!Array.isArray(self.node.variables)) return null;

                for (let i = 0; i < self.node.variables.length; i++) {

                    let feature = self.node.variables[i];

                    if (feature.type.startsWith('location')) {

                        return feature.value;

                    }

                }

            };

            self.createStaticURL = function () {

                if (!self.location) return;

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

                if (!self.location) return;

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

                EJScreenInterface.query(params).$promise.then(function (successResponse) {

                    console.log(
                        'loadDemographics:successResponse:',
                        successResponse
                    );

                }, function (errorResponse) {

                    console.log(
                        'loadDemographics:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.indexFacilities = function () {

                var index = {};

                var stateAbbrs = [];

                for (let i = 0; i < self.facilities.length; i++) {

                    let feature = self.facilities[i];

                    FacilityFilter.convertArrays(feature.properties);

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

            self.loadFacilityIndex = function () {

                FacilityIndex.get().$promise.then(function (successResponse) {

                    console.log(
                        'loadFacilityIndex:successResponse:',
                        successResponse
                    );

                    self.facilities = successResponse.features;

                    self.indexFacilities();

                    MapManager.rankFacilities(self.facilities);

                    //
                    // Create FeatureCollection from filtered facilities array.
                    //

                    var matches = [];

                    self.facilities.forEach(function (d) {

                        if (Array.isArray(self.assocFacilities)) {

                            let keys = self.assocFacilities.map(function (a) {
                                return a.key;
                            });

                            d.properties.assoc = keys.indexOf(d.properties.id) >= 0;

                        }

                        matches.push(d);

                    });

                    self.featureCollection = {
                        type: 'FeatureCollection',
                        features: matches
                    };

                    // self.featureCollection = {
                    //     type: 'FeatureCollection',
                    //     features: self.facilities
                    // };

                    self.showElements(true);

                }, function (errorResponse) {

                    console.warn(
                        'loadFacilityIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.fetchProjects = function (arr) {

                Frame.get({
                    id: 3,
                    record: arr.join(','),
                    // domain: 'relation:5,34,37,41,42,44'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchProjects:successResponse:',
                        successResponse
                    );

                    self.frameData = successResponse.tree;

                    var projectKeys = Utility.linkedKeys(
                        successResponse.tree[self.node.id]['relation:5']
                    );

                    console.log(
                        'fetchProjects:projectKeys:',
                        projectKeys
                    );

                }, function (errorResponse) {

                    console.log(
                        'fetchProjects:errorResponse:',
                        errorResponse);

                });

            };

            self.indexPermitKeys = function (data) {

                //
                // Extra project array from frame tree.
                //

                var subtrees = Utility.values(data);

                let exclude = [
                    'relation:1',
                    'relation:5'
                ];

                subtrees.forEach(function (datum) {

                    for (var key in datum) {

                        if (datum.hasOwnProperty(key) &&
                            exclude.indexOf(key) < 0) {

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
                    'indexPermitKeys:permitIdx:',
                    self.permitIdx
                );

            };

            self.fetchPermitKeys = function (arr) {

                console.log(
                    'fetchPermitKeys:arr:',
                    arr
                );

                //
                // Extract from project frame.
                //

                if (Array.isArray(arr) &&
                    arr.length) {

                    Frame.get({
                        id: 3,
                        record: arr.join(','),
                        // domain: 'relation:6,30,36'
                    }).$promise.then(function (successResponse) {

                        console.log(
                            'fetchPermitKeys:successResponse:',
                            'via project frame',
                            successResponse
                        );

                        self.indexPermitKeys(successResponse.tree);

                    }, function (errorResponse) {

                        console.log('errorResponse', errorResponse);

                    });

                }

                //
                // Extract from facility frame.
                //

                Frame.get({
                    id: 1,
                    record: self.node.id,
                    // domain: 'relation:34,41'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchPermitKeys:successResponse:',
                        'via facility frame',
                        successResponse
                    );

                    self.indexPermitKeys(successResponse.tree);

                }, function (errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.fetchProjectKeys = function () {

                Frame.get({
                    id: 1,
                    record: self.node.id,
                    // domain: 'relation:5,34,37,41,42,44'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchProjectKeys:successResponse:',
                        successResponse
                    );

                    self.projectKeys = Utility.linkedKeys(
                        successResponse.tree[self.node.id]['relation:5']
                    );

                    console.log(
                        'fetchProjectKeys:projectKeys:',
                        self.projectKeys
                    );

                    self.fetchPermitKeys(self.projectKeys);

                    // self.getStats(self.projectKeys);

                }, function (errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.fetchAssociatedFacilities = function (callback) {

                Frame.get({
                    id: 1,
                    record: self.node.id,
                    // domain: 'relation:38'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchAssociatedFacilities:successResponse:',
                        successResponse
                    );

                    try {

                        self.assocFacilities = Utility.linkedKeys(
                            successResponse.tree[self.node.id]['relation:38'],
                            true
                        );

                        console.log(
                            'fetchAssociatedFacilities:assocFacilities:',
                            self.assocFacilities
                        );

                    } catch (e) {

                    }

                    self.fetchAssociatedPipelines();

                }, function (errorResponse) {

                    console.log(
                        'fetchAssociatedFacilities:errorResponse',
                        errorResponse);

                });

            };

            self.fetchAssociatedPipelines = function () {

                Frame.get({
                    id: 1,
                    record: self.node.id,
                    // domain: 'relation:7'
                }).$promise.then(function (successResponse) {

                    console.log(
                        'fetchAssociatedPipelines:successResponse:',
                        successResponse
                    );

                    try {

                        self.assocPipelines = Utility.linkedKeys(
                            successResponse.tree[self.node.id]['relation:7'],
                            true
                        );

                        console.log(
                            'fetchAssociatedPipelines:assocPipelines:',
                            self.assocPipelines
                        );

                    } catch (e) {

                        self.assocPipelines = [];

                    }

                    self.loadFacilityIndex();

                }, function (errorResponse) {

                    console.log(
                        'fetchAssociatedPipelines:errorResponse',
                        errorResponse);

                });

            };

            self.getStats = function (arr) {

                console.log(
                    'getStats:arr:',
                    arr
                );

                const statRequests = [
                    {
                        fn: 'sum',
                        key: 'totalGHG',
                        record: arr.join(','),
                        domain: 'float:15'
                    },
                    {
                        fn: 'sum',
                        key: 'totalCriteria',
                        record: arr.join(','),
                        domain: 'float:16,17,18,19,20,21'
                    }
                ];

                self.stats = {};

                statRequests.forEach(function (config) {

                    Stat.get(config).$promise.then(function (successResponse) {

                        console.log(
                            'getStats:successResponse:',
                            successResponse
                        );

                        try {

                            self.stats[config.key] = successResponse[config.fn];

                            console.log(
                                'getStats:successResponse:',
                                successResponse
                            );

                        } catch (e) {

                        }

                    }, function (errorResponse) {

                        console.log(
                            'getStats:errorResponse',
                            errorResponse);

                    });

                });

            };

            self.loadProjectIndex = function () {

                ProjectIndex.get().$promise.then(function (successResponse) {

                    console.log(
                        'loadProjectIndex:successResponse:',
                        successResponse
                    );

                    self.projects = successResponse.features.filter(function (feature) {
                        return feature.id === self.node.id;
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

                    // console.log(
                    //     'loadProjectIndex:totalGHG:',
                    //     totalGHG
                    // );

                    let ghgValues = Utility.values(ghgIdx);

                    let criteriaValues = Utility.values(criteriaIdx);

                    console.log(
                        'loadProjectIndex:values:',
                        ghgValues,
                        criteriaValues
                    );

                    self.stats = {
                        totalGHG: Utility.sumArray(ghgValues),
                        totalCriteria: Utility.sumArray(criteriaValues)
                    };

                    console.log(
                        'loadProjectIndex:stats:',
                        self.stats
                    );

                }, function (errorResponse) {

                    console.warn(
                        'loadProjectIndex:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.loadNode = function () {

                Node.getSingle({
                    id: $route.current.params.nodeId
                }).$promise.then(function (successResponse) {

                    console.log(
                        'loadNode:successResponse:',
                        successResponse
                    );

                    if (!successResponse.hasOwnProperty('id')) {

                        self.makePrivate = true;

                        self.showElements(false);

                    } else {

                        self.node = successResponse;

                        self.projectFilter = btoa(
                            'relation:5|eq|' + self.node.name
                        );

                        $rootScope.page = {
                            title: self.node.name
                        };

                        self.location = self.extractLocation();

                        // self.loadDemographics();

                        console.log(
                            'loadNode:location:',
                            self.location
                        );

                        self.createStaticURL();

                        self.indexVars();

                        self.fetchProjectKeys();

                        self.fetchAssociatedFacilities();

                        // self.fetchAssociatedPipelines();

                        self.loadProjectIndex();

                    }

                }, function (errorResponse) {

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

            FacilityFilter.index(true);

            self.loadNode();

        });