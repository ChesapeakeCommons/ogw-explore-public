(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('facilityTab', [
            '$window',
            'environment',
            '$timeout',
            'Utility',
            'MapManager',
            'FacilityFilter',
            function ($window, environment, $timeout, Utility,
                      MapManager, FacilityFilter) {
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
                            'dialog/map-filter/tabs/facility/facilityTab--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        let uName = [];
                        let uState = [];
                        let uCompany = [];
                        let uSector = [];
                        let uStatus = [];
                        let uOpCat = [];
                        let uType = [];

                        scope.disableInputs = false;

                        scope.config = {
                            activeFilters: {},
                            filters: FacilityFilter.index(),
                            filterType: undefined,
                            mode: 'name',
                            options: {
                                name: [],
                                state: [],
                                company: [],
                                opCat: [],
                                sector: [],
                                status: [],
                                _type: []
                            },
                            query: {
                                token: undefined
                            },
                            types: [
                                {
                                    'dirty': false,
                                    'key': 'name',
                                    'label': 'Facility name'
                                },
                                {
                                    'dirty': false,
                                    'key': 'state',
                                    'label': 'State'
                                },
                                {
                                    'dirty': false,
                                    'key': 'company',
                                    'label': 'Company'
                                },
                                {
                                    'dirty': false,
                                    'key': 'sector',
                                    'label': 'Industry sector'
                                },
                                {
                                    'dirty': false,
                                    'key': 'opCat',
                                    'label': 'Operating category'
                                },
                                {
                                    'dirty': false,
                                    'key': 'status',
                                    'label': 'Operating status'
                                },
                                {
                                    'dirty': false,
                                    'key': '_type',
                                    'label': 'Project type'
                                }
                                // 'State',
                                // 'Company',
                                // 'Industry sector',
                                // 'Operating category',
                                // 'Operating status',
                                // 'Project type'
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
                                'facilityTab.extractExpression():key:',
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
                                        'facilityTab.extractExpression():option:',
                                        option
                                    );
                                    return option.selected;
                                });

                                let labels = matches.map(function (option) {
                                    console.log(
                                        'facilityTab.extractExpression():option:',
                                        option
                                    );
                                    return option.label;
                                });

                                console.log(
                                    'facilityTab.extractExpression():labels:',
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
                                'facilityTab.evaluateFilters():run:'
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
                                    'facilityTab.evaluateFilters():subExp:',
                                    subExp
                                );

                                if (subExp.length) {
                                    _filters.push(subExp);
                                }

                            }

                            console.log(
                                'facilityTab.evaluateFilters():_filters:',
                                _filters
                            );

                            return _filters;

                        };

                        scope.applyFilters = function () {

                            console.log(
                                'facilityTab.applyFilters:run'
                            );

                            let _filters = scope.evaluateFilters();

                            if (!_filters.length > 1) {

                                scope.map.setFilter('ogw-facility', null);

                            } else {

                                scope.map.setFilter('ogw-facility', _filters);

                            }

                        };

                        scope.setFilterOptions = function () {

                            var arr = scope.featureCollection.features;

                            // var uName = [];
                            // var uState = [];
                            // var uCompany = [];
                            // var uSector = [];
                            // var uStatus = [];
                            // var uOpCat = [];
                            // var uType = [];

                            arr.forEach(function (feature) {

                                feature = feature.properties;

                                uName.push(feature.name);

                                uState.push(feature.state);

                                uCompany = uCompany.concat(feature.company);

                                try {
                                    feature.companies = feature.company.join(' ');
                                } catch (e) {
                                    feature.companies = '';
                                }

                                uSector = uSector.concat(feature.sectors);

                                try {
                                    feature.sector = feature.sectors.join(' ');
                                } catch (e) {
                                    feature.sector = '';
                                }

                                uStatus = uStatus.concat(feature.statuses);

                                try {
                                    feature.status = feature.statuses.join(' ');
                                } catch (e) {
                                    feature.status = '';
                                }

                                uOpCat = uOpCat.concat(feature.opCat);

                                try {
                                    feature.category = feature.opCat.join(' ');
                                } catch (e) {
                                    feature.category = '';
                                }

                                uType = uType.concat(feature.types);

                                try {
                                    feature._type = feature.types.join(' ');
                                } catch (e) {
                                    feature._type = '';
                                }

                                console.log(
                                    'facilityTab.setFilterOptions():feature:',
                                    feature
                                );

                            });

                            scope.config.options = {
                                name: Utility.makeSelectable(
                                    Utility.setFromArray(uName).sort()
                                ),
                                state: Utility.makeSelectable(
                                    Utility.setFromArray(uState).sort()
                                ),
                                company: Utility.makeSelectable(
                                    Utility.setFromArray(uCompany).sort()
                                ),
                                sector: Utility.makeSelectable(
                                    Utility.setFromArray(uSector).sort()
                                ),
                                status: Utility.makeSelectable(
                                    Utility.setFromArray(uStatus).sort()
                                ),
                                opCat: Utility.makeSelectable(
                                    Utility.setFromArray(uOpCat).sort()
                                ),
                                _type: Utility.makeSelectable(
                                    Utility.setFromArray(uType).sort()
                                )
                            };

                            console.log(
                                'facilityTab.setFilterOptions():options:',
                                scope.config.options
                            );

                            scope.config.immutableOptions = JSON.parse(
                                JSON.stringify(scope.config.options)
                            );

                        };

                        scope.$on('mapFilters:set', function (event, data) {

                            console.log(
                                'facilityTab.mapFilters:set:event:',
                                event
                            );

                            console.log(
                                'facilityTab.mapFilters:set:data:',
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
                                'facilityTab.mapFilters:reset:event:',
                                event
                            );

                            console.log(
                                'facilityTab.mapFilters:reset:data:',
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
                                    'facilityTab:options:',
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