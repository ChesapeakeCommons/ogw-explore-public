'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('FacilityFilter',
        function ($filter, Utility, $rootScope, $timeout) {

            let filters = {
                facility: {},
                opCat: {},
                state: {},
                _companies: {},
                _sectors: {},
                _statuses: {},
                _types: {}
            };

            return {
                activeKeys: function () {

                    var arr = [];

                    for (var key in filters) {

                        if (filters.hasOwnProperty(key)) {

                            var values = Utility.values(
                                filters[key]
                            );

                            console.log(
                                'FacilityFilter.activeKeys:values:',
                                key,
                                values
                            );

                            var isActive = values.some(function(value) {
                                return value === true;
                            });

                            console.log(
                                'FacilityFilter.activeKeys:isActive:',
                                isActive
                            );

                            if (values.length && isActive) arr.push(key);

                        }

                    }

                    return arr;

                },
                addFilter: function (key) {

                    //

                },
                applyFilters: function (map) {

                    map.setFilter('ogw-facility', this.getFilters());

                },
                getFilters: function () {

                    if (this.validateFilters()) {

                        let main = [
                            'all'
                        ];

                        for (var key in filters) {

                            if (!filters.hasOwnProperty(key)) {
                                continue;
                            }

                            console.log(
                                'FacilityFilter.getFilters:idx:',
                                filters[key]
                            );

                            let expression = [
                                'in',
                                key
                            ];

                            let values = this.extractFilters(filters[key]);

                            console.log(
                                'FacilityFilter.getFilters:values:',
                                values
                            );

                            if (values.length) {

                                // let capture = [
                                //     'literal',
                                //     []
                                // ];

                                values.forEach(function (value) {

                                    expression.push(value);

                                });

                                // expression.push(capture);

                                console.log(
                                    'FacilityFilter.getFilters:expression:',
                                    expression
                                );

                                main.push(expression);

                            }

                        }

                        console.log(
                            'FacilityFilter.getFilters:main:',
                            main
                        );

                        return main;

                    }

                    return null;

                },
                index: function (reset) {

                    if (reset && typeof reset === 'boolean') {

                        let base = {};

                        let keys = Object.keys(filters);

                        keys.forEach(function (key) {

                            base[key] = {};

                        });

                        filters = base;

                    }

                    return filters;

                },
                extractFilters: function (group) {

                    console.log(
                        'FacilityFilter.extractFilters:',
                        group
                    );

                    var values = [];

                    for (var key in group) {

                        if (!group.hasOwnProperty(key)) {
                            continue;
                        }

                        if (group[key]) {

                            values.push(key);

                        }

                    }

                    console.log(
                        'FacilityFilter.extractFilters:values:',
                        values
                    );

                    return values;

                },
                validateFilters: function () {

                    console.log(
                        'FacilityFilter.validateFilters:',
                        filters
                    );

                    var values = [];

                    for (var key in filters) {

                        if (!filters.hasOwnProperty(key)) {
                            continue;
                        }

                        console.log(
                            'FacilityFilter.validateFilters:idx:',
                            filters[key]
                        );

                        values = values.concat(
                            this.extractFilters(filters[key])
                        );

                    }

                    console.log(
                        'FacilityFilter.validateFilters:values:',
                        values
                    );

                    return values.length > 0;

                },
                convertArrays: function(properties) {

                    let mappings = [
                        {
                            src: 'company',
                            tgt: '_companies'
                        },
                        {
                            src: 'sectors',
                            tgt: '_sectors'
                        },
                        {
                            src: 'statuses',
                            tgt: '_statuses'
                        },
                        {
                            src: 'types',
                            tgt: '_types'
                        }
                    ];

                    mappings.forEach(function (item) {

                        try {

                            properties[item.tgt] = properties[item.src].join(',');

                        } catch (e) {

                            properties[item.tgt] = '';

                        }

                    });

                },
                assignStatusCategory: function (properties) {

                    let cat = 'Not fully operating';

                    let statuses = properties.statuses;

                    if (!Array.isArray(statuses)) {

                        cat = 'Unknown';

                    } else {

                        if (statuses.indexOf('Unknown') >= 0) {

                            cat = 'Unknown';

                        }

                        if (statuses.indexOf('Canceled') >= 0) {

                            cat = 'Canceled';

                        } else if (statuses.indexOf('Operating') >= 0 ||
                                   statuses.indexOf('Commissioning') >= 0) {

                            cat = 'Operating';

                        }

                    }

                    properties.opCat = cat;

                    // "operating = operating
                    // commissioning = operating
                    // under construction = not fully operating
                    // partially-operating = not fully operating
                    // pre-construction = not fully operating
                    // announced = not fully operating
                    // on hold = not fully operating
                    // unknown = unknown - include in rollup stats
                    // canceled = canceled"

                }
            };

        });