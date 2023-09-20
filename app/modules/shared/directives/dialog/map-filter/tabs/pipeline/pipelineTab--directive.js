(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('pipelineTab', [
            '$window',
            'environment',
            '$timeout',
            'Utility',
            'MapManager',
            'FacilityFilter',
            '$http',
            function ($window, environment, $timeout, Utility,
                      MapManager, FacilityFilter, $http) {
                return {
                    restrict: 'EA',
                    scope: {
                        'featureCollection': '=?',
                        'map': '=?',
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'dialog/map-filter/tabs/pipeline/pipelineTab--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        scope.disableInputs = false;

                        scope.config = {
                            activeFilters: {},
                            filters: FacilityFilter.index(),
                            filterType: undefined,
                            mode: 'name',
                            options: {
                                name: [],
                                State: [],
                                Product: [],
                                PrjType: []
                            },
                            query: {
                                token: undefined
                            },
                            types: [
                                {
                                    'dirty': false,
                                    'key': 'name',
                                    'label': 'Pipeline name'
                                },
                                {
                                    'dirty': false,
                                    'key': 'State',
                                    'label': 'State(s)'
                                },
                                {
                                    'dirty': false,
                                    'key': 'Product',
                                    'label': 'Product type(s)'
                                },
                                {
                                    'dirty': false,
                                    'key': 'PrjType',
                                    'label': 'Project type'
                                }
                            ]
                        };

                        scope.showFilterModal = true;

                        scope.toggleModal = function () {

                            scope.showFilterModal = !scope.showFilterModal;

                        };

                        scope.resetAll = function () {

                            scope.config.filters = FacilityFilter.index(true);

                            scope.config.filterType = undefined;

                            scope.config.activeFilters = {};

                        };

                        scope.reset = function () {

                            for (let key in scope.config.options) {
                                scope.resetCategory(key);
                            }

                            scope.config.query.token = {};

                            for (let key in scope.config.options) {
                                scope.filterCategory(key, '');
                            }

                            scope.config.types.forEach(function (item) {
                                item.dirty = false;
                            });

                            scope.applyFilters();

                        };

                        scope.resetCategory = function (key) {

                            let options = scope.config.options[key];

                            if (Array.isArray(options)) {
                                options.forEach(function (option) {
                                    option.selected = false;
                                });
                            }

                            // scope.applyFilters();

                        };

                        scope.setDirtyState = function (key, dirty) {
                            scope.config.types.forEach(function (item) {
                                if (item.key === key) {
                                    item.dirty = dirty;
                                }
                            });
                        };

                        scope.filterCategory = function (key, token) {

                            if (typeof token === 'string' &&
                                token.length >= 2) {
                                scope.config.options[key] = scope.config.immutableOptions[key].filter(function (option) {
                                    return option.label.toLowerCase().indexOf(token.toLowerCase()) >= 0;
                                });
                            } else {
                                scope.config.options[key] = scope.config.immutableOptions[key];
                            }

                        };

                        scope.setMode = function (key) {
                            scope.config.mode = key;
                        };

                        scope.extractExpression = function (key) {

                            console.log(
                                'pipelineTab.extractExpression():key:',
                                key
                            );

                            // let tpl = ['in', ['get', key], ['literal', targetIds]];

                            // var breweryFilter=[
                            //     "all",
                            //     ["in", "stateNam", 'Utah','Texas','Florida'],
                            //     ["in", "breweryType", 'Irish','American']
                            // ]
                            // map.setFilter('breweriesLayer',breweryFilter)

                            if (scope.config.options.hasOwnProperty(key)) {

                                let matches = scope.config.options[key].filter(function (option) {
                                    console.log(
                                        'pipelineTab.extractExpression():option:',
                                        option
                                    );
                                    return option.selected;
                                });

                                let labels = matches.map(function (option) {
                                    console.log(
                                        'pipelineTab.extractExpression():option:',
                                        option
                                    );
                                    return option.label;
                                });

                                console.log(
                                    'pipelineTab.extractExpression():labels:',
                                    labels
                                );

                                if (labels.length) {
                                    let subExp = ['any'];
                                    labels.forEach(function (label) {
                                        subExp.push(
                                            ['in', label, ['get', key]]
                                        );
                                    });
                                    scope.setDirtyState(key, true);
                                    return subExp;
                                }
                                scope.setDirtyState(key, false);
                                return [];

                            }

                        };

                        scope.evaluateFilters = function () {

                            console.log(
                                'pipelineTab.evaluateFilters():run:'
                            );

                            // var breweryFilter=[
                            //     "all",
                            //     ["in", "stateNam", 'Utah','Texas','Florida'],
                            //     ["in", "breweryType", 'Irish','American']
                            // ]
                            // map.setFilter('breweriesLayer',breweryFilter)

                            let _filters = ['all'];

                            for (var key in scope.config.options) {

                                let subExp = scope.extractExpression(key);
                                console.log(
                                    'pipelineTab.evaluateFilters():subExp:',
                                    subExp
                                );

                                if (subExp.length) {
                                    _filters.push(subExp);
                                }

                            }

                            console.log(
                                'pipelineTab.evaluateFilters():_filters:',
                                _filters
                            );

                            return _filters;

                        };

                        scope.applyFilters = function () {

                            console.log(
                                'pipelineTab.applyFilters:run'
                            );

                            let _filters = scope.evaluateFilters();

                            if (!_filters.length > 1) {

                                scope.map.setFilter('ogw-pipeline', null);

                            } else {

                                scope.map.setFilter('ogw-pipeline', _filters);

                            }

                        };

                        scope.setFilterOptions = function () {

                            $http.get(
                                'https://services5.arcgis.com/B2Qw3HaAUA1KBIow/ArcGIS/rest/services/Oil_and_Gas_Watch_Pipeline_Routes_/FeatureServer/0/query?where=objectid%3E0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=name%2CState%2CProduct%2CPrjType&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
                            ).then(function (response) {
                                console.log(
                                    'pipelineTab.setFilterOptions():response:',
                                    response
                                );

                                var arr = response.data.features;

                                var uName = [];
                                var uState = [];
                                var uProduct = [];
                                var uPrjType = [];

                                arr.forEach(function (feature) {

                                    feature = feature.properties;

                                    uName.push(feature.name);

                                    try {
                                        uState = uState.concat(feature['State'].split(','));
                                    } catch (e) {
                                        //
                                    }

                                    try {
                                        uProduct = uProduct.concat(feature['Product'].split(','));
                                    } catch (e) {
                                        //
                                    }

                                    // uProduct.push(feature['Product']);

                                    uPrjType.push(feature['PrjType']);

                                    console.log(
                                        'pipelineTab.setFilterOptions():feature:',
                                        feature
                                    );

                                });

                                scope.config.options = {
                                    name: Utility.makeSelectable(
                                        Utility.setFromArray(uName).sort()
                                    ),
                                    State: Utility.makeSelectable(
                                        Utility.setFromArray(uState).sort()
                                    ),
                                    Product: Utility.makeSelectable(
                                        Utility.setFromArray(uProduct).sort()
                                    ),
                                    PrjType: Utility.makeSelectable(
                                        Utility.setFromArray(uPrjType).sort()
                                    )
                                };

                                console.log(
                                    'pipelineTab.setFilterOptions():options:',
                                    scope.config.options
                                );

                                scope.config.immutableOptions = JSON.parse(
                                    JSON.stringify(scope.config.options)
                                );

                            });

                        };

                        scope.$on('mapFilters:set', function (event, data) {

                            console.log(
                                'pipelineTab.mapFilters:set:event:',
                                event
                            );

                            console.log(
                                'pipelineTab.mapFilters:set:data:',
                                data
                            );

                            if (scope.map &&
                                scope.map.loaded()) {

                                $timeout(function () {

                                    scope.applyFilters();

                                }, 0);

                            }

                        });

                        scope.$on('mapFilters:reset', function (event, data) {

                            console.log(
                                'pipelineTab.mapFilters:reset:event:',
                                event
                            );

                            console.log(
                                'pipelineTab.mapFilters:reset:data:',
                                data
                            );

                            if (scope.map &&
                                scope.map.loaded()) {

                                $timeout(function () {

                                    scope.reset();

                                }, 0);

                            }

                        });

                        scope.$watch('featureCollection', function (newVal, oldVal) {

                            if (newVal) {

                                scope.setFilterOptions();

                                console.log(
                                    'pipelineTab:options:',
                                    scope.config.options);

                                // if (scope.setDefaults) scope.setStatusDefaults();

                            }

                        }, true);

                        scope.$watch('map', function (newVal) {

                            if (newVal) {

                                scope.map.on('move', function (e) {

                                    scope.$apply(function () {
                                        scope.disableInputs = true;
                                    });

                                });

                                scope.map.on('moveend', function (e) {

                                    $timeout(function () {

                                        scope.$apply(function () {
                                            scope.disableInputs = false;
                                        });

                                    }, 500);

                                });

                            }

                        });

                    }

                };

            }

        ]);

}());