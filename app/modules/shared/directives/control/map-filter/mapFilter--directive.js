(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('mapFilter', [
            '$window',
            'environment',
            '$timeout',
            'Utility',
            'MapManager',
            'FacilityFilter',
            'DialogDispatch',
            function($window, environment, $timeout, Utility,
                     MapManager, FacilityFilter, DialogDispatch) {
                return {
                    restrict: 'EA',
                    scope: {
                        'featureCollection': '=?',
                        'map': '=?',
                        'postSelect': '&',
                        'setDefaults': '=?',
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'control/map-filter/mapFilter--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        if (typeof scope.setDefaults !== 'boolean') {

                            scope.setDefaults = false;

                        }

                        scope.disableInputs = false;

                        scope.config = {
                            activeFilters: {},
                            filters: FacilityFilter.index(),
                            filterType: undefined,
                            options: {
                                facility: [],
                                state: [],
                                company: [],
                                sector: [],
                                status: [],
                                _type: []
                            },
                            types: [
                                'Facility',
                                'State',
                                'Company',
                                'Industry sector',
                                'Operating category',
                                'Operating status',
                                'Project type'
                            ]
                        };

                        scope.showFilterModal = true;

                        scope.showFilters = function(){
                            DialogDispatch.send(
                                'mapFilters:display',
                                null,
                                true
                            );
                        };

                        scope.toggleModal = function () {

                            scope.showFilterModal = !scope.showFilterModal;

                        };

                        scope.resetAll = function () {

                            scope.config.filters = FacilityFilter.index(true);

                            scope.config.filterType = undefined;

                            scope.config.activeFilters = {};

                        };

                        scope.reset = function () {

                            scope.switchType();

                        };

                        scope.resetCategory = function (key) {

                            scope.config.filters[key] = {};

                        };

                        scope.switchType = function () {

                            // scope.config.filters = {
                            //     facility: undefined,
                            //     state: undefined,
                            //     company: undefined,
                            //     sector: undefined,
                            //     status: undefined
                            // };

                        };

                        scope.validateFilters = function () {

                            console.log(
                                'mapFilter.validateFilters:',
                                scope.config.filters
                            );

                            var values = [];

                            for (var key in scope.config.filters) {

                                if (!scope.config.filters.hasOwnProperty(key)) {
                                    continue;
                                }

                                console.log(
                                    'mapFilter.validateFilters:idx:',
                                    scope.config.filters[key]
                                );

                                values = values.concat(
                                    Utility.values(scope.config.filters[key]).filter(function (value) {
                                        return value === true;
                                    })
                                );

                            }

                            console.log(
                                'mapFilter.validateFilters:values:',
                                values
                            );

                            if (!values.length) return false;

                            return values.some(function(value) {
                                return value;
                            });

                        };

                        scope.activeKeys = function () {

                            var arr = [];

                            for (var key in scope.config.filters) {

                                if (scope.config.filters.hasOwnProperty(key)) {

                                    var values = Utility.values(
                                        scope.config.filters[key]
                                    );

                                    console.log(
                                        'mapFilter.activeKeys:values:',
                                        key,
                                        values
                                    );

                                    var isActive = values.some(function(value) {
                                        return value === true;
                                    });

                                    console.log(
                                        'mapFilter.activeKeys:isActive:',
                                        isActive
                                    );

                                    if (values.length && isActive) arr.push(key);

                                }

                            }

                            return arr;

                        };

                        scope.getMatchStates = function (data, activeKeys) {

                            // console.log(
                            //     'mapFilter.getMatchStates:arr:',
                            //     activeKeys
                            // );

                            var matchStates = [];

                            activeKeys.forEach(function (key) {

                                var comparators = [];

                                var idx = scope.config.filters[key];

                                // console.log(
                                //     'mapFilter.getMatchStates:idx:',
                                //     idx
                                // );

                                for (var k in idx) {

                                    if (idx.hasOwnProperty(k)) {

                                        var value = idx[k];

                                        if (value) comparators.push(k);

                                    }

                                }

                                matchStates.push(
                                    scope.compare(key, comparators, data)
                                );

                            });

                            // console.log(
                            //     'mapFilter.getMatchStates:matchStates:',
                            //     matchStates
                            // );

                            return matchStates;

                        };

                        scope.compare = function (key, comparators, data) {

                            console.log(
                                'mapFilter.compare:key:',
                                key
                            );

                            console.log(
                                'mapFilter.compare:comparators:',
                                comparators
                            );

                            switch (key) {

                                case 'facility':

                                    return comparators.some(function(value) {
                                        return data.name === value;
                                    });

                                case 'state':

                                    return comparators.some(function(value) {
                                        return data.state === value;
                                    });

                                case 'opCat':

                                    return comparators.some(function(value) {
                                        return data.opCat === value;
                                    });

                                case '_companies':

                                    return comparators.some(function(value) {
                                        return data.company.indexOf(value) >= 0;
                                    });

                                case '_sectors':

                                    return comparators.some(function(value) {
                                        return data.sectors.indexOf(value) >= 0;
                                    });

                                case '_statuses':

                                    return comparators.some(function(value) {
                                        return data.statuses.indexOf(value) >= 0;
                                    });

                                case '_types':

                                    return comparators.some(function(value) {
                                        return data.types.indexOf(value) >= 0;
                                    });

                                default:

                                    return false;

                            }

                        };

                        scope.evaluateFilters = function () {

                            console.log(
                                'mapFilter.evaluateFilters:run'
                            );

                            // var breweryFilter=[
                            //     "all",
                            //     ["in", "stateNam", 'Utah','Texas','Florida'],
                            //     ["in", "breweryType", 'Irish','American']
                            // ]
                            // map.setFilter('breweriesLayer',breweryFilter)

                            var cp = JSON.parse(JSON.stringify(scope.featureCollection));

                            var activeKeys = scope.activeKeys();

                            console.log(
                                'mapFilter.evaluateFilters:activeKeys:',
                                activeKeys
                            );

                            cp.features.forEach(function (feature) {

                                var prop = feature.properties;

                                var matchStates = scope.getMatchStates(
                                    prop,
                                    activeKeys
                                );

                                var states = Utility.values(matchStates);

                                let matched = states.every(function(value) {
                                    return value === true;
                                });

                                console.log(
                                    'mapFilter.evaluateFilters:matched:',
                                    matched
                                );

                                feature.properties.matched = matched;

                            });

                            scope.map.getSource('ogw-facility').setData(cp);

                        };

                        scope.applyFilters = function () {

                            console.log(
                                'mapFilter.applyFilters:run'
                            );

                            if (!scope.validateFilters()) {

                                scope.map.setFilter('ogw-facility', null);

                            } else {

                                scope.evaluateFilters();

                                scope.map.setFilter('ogw-facility', ['==', ['get', 'matched'], true]);

                            }

                        };

                        scope.setStatusDefaults = function() {

                            let exclude = [
                                'Canceled',
                                'Operating',
                                'Unknown'
                            ];

                            let opCats = scope.config.options.opCat;

                            opCats.forEach(function (cat) {

                                if (exclude.indexOf(cat) < 0) {

                                    scope.config.filters.opCat[cat] = true;

                                }

                            });

                        };

                        scope.setFilterOptions = function () {

                            var arr = scope.featureCollection.features;

                            var uFacility = [];
                            var uState = [];
                            var uCompany = [];
                            var uSector = [];
                            var uStatus = [];
                            var uOpCat = [];
                            var uType = [];

                            arr.forEach(function (feature) {

                                feature = feature.properties;

                                uFacility.push(feature.name);

                                uState.push(feature.state);

                                uCompany = uCompany.concat(feature.company);

                                uSector = uSector.concat(feature.sectors);

                                uStatus = uStatus.concat(feature.statuses);

                                uOpCat = uOpCat.concat(feature.opCat);

                                uType = uType.concat(feature.types);

                            });

                            scope.config.options = {
                                facility: Utility.setFromArray(uFacility).sort(),
                                state: Utility.setFromArray(uState).sort(),
                                company: Utility.setFromArray(uCompany).sort(),
                                sector: Utility.setFromArray(uSector).sort(),
                                status: Utility.setFromArray(uStatus).sort(),
                                opCat: Utility.setFromArray(uOpCat).sort(),
                                _type: Utility.setFromArray(uType).sort()
                            };

                        };

                        scope.$watch('config.activeFilters', function (newVal, oldVal) {

                            if (newVal) {

                                console.log(
                                    'mapFilter.activeFilters:old:',
                                    oldVal
                                );

                                console.log(
                                    'mapFilter.activeFilters:new:',
                                    newVal
                                );

                                if (scope.map &&
                                    scope.map.loaded()) {

                                    $timeout(function () {

                                        scope.applyFilters();

                                    }, 200);

                                }

                            }

                        }, true);

                        scope.$watch('config.filters', function (newVal, oldVal) {

                            if (newVal) {

                                console.log(
                                    'mapFilter.filters:old:',
                                    oldVal
                                );

                                console.log(
                                    'mapFilter.filters:new:',
                                    newVal
                                );

                                if (scope.map &&
                                    scope.map.loaded()) {

                                    $timeout(function () {

                                        scope.applyFilters();

                                    }, 200);

                                }

                            }

                        }, true);

                        scope.$watch('featureCollection', function (newVal, oldVal) {

                            if (newVal) {

                                scope.setFilterOptions();

                                console.log(
                                    'mapFilter:options:',
                                    scope.config.options);

                                if (scope.setDefaults) scope.setStatusDefaults();

                            }

                        }, true);

                        scope.$watch('map', function (newVal) {

                            if (newVal) {

                                scope.map.on('move', function(e) {

                                    scope.$apply(function () {
                                        scope.disableInputs = true;
                                    });

                                });

                                scope.map.on('moveend', function(e) {

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