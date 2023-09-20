'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('PipelineFilter',
        function ($filter, Utility, $rootScope, $timeout) {

            // name
            // State
            // Product
            // PrjType

            let filters = {
                name: {},
                State: {},
                Product: {},
                PrjType: {}
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
                                'PipelineFilter.activeKeys:values:',
                                key,
                                values
                            );

                            var isActive = values.some(function(value) {
                                return value === true;
                            });

                            console.log(
                                'PipelineFilter.activeKeys:isActive:',
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

                    map.setFilter('ogw-pipeline', this.getFilters());

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
                                'PipelineFilter.getFilters:idx:',
                                filters[key]
                            );

                            let expression = [
                                'in',
                                key
                            ];

                            let values = this.extractFilters(filters[key]);

                            console.log(
                                'PipelineFilter.getFilters:values:',
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
                                    'PipelineFilter.getFilters:expression:',
                                    expression
                                );

                                main.push(expression);

                            }

                        }

                        console.log(
                            'PipelineFilter.getFilters:main:',
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
                        'PipelineFilter.extractFilters:',
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
                        'PipelineFilter.extractFilters:values:',
                        values
                    );

                    return values;

                },
                validateFilters: function () {

                    console.log(
                        'PipelineFilter.validateFilters:',
                        filters
                    );

                    var values = [];

                    for (var key in filters) {

                        if (!filters.hasOwnProperty(key)) {
                            continue;
                        }

                        console.log(
                            'PipelineFilter.validateFilters:idx:',
                            filters[key]
                        );

                        values = values.concat(
                            this.extractFilters(filters[key])
                        );

                    }

                    console.log(
                        'PipelineFilter.validateFilters:values:',
                        values
                    );

                    return values.length > 0;

                }
            };

        });