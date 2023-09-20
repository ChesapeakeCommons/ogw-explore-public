'use strict';

/**
 * @ngdoc service
 * @name CommonsCloud.template
 * @description
 * # template
 * Provider in the Commons Cloud.
 */
angular.module('OilGasWatch')
    .service('TableSort', function($rootScope, $timeout, AppConfig, FrameDataService) {

        var self = this;

        // !a ? 1 : (!b ? -1 : (a.localeCompare(b)))

        var comps = {
            number: function(a, b) {
                return !a ? 1 : (!b ? -1 : (a - b))
            },
            text: function(a, b) {
                return !a ? 1 : (!b ? -1 : (a.localeCompare(b)))
            }
            // number: function(a, b) { return a - b; },
            // text: function(a, b) { return a > b ? 1 : a < b ? -1 : 0; }
            // number: function(a, b) {
            //     return (a === null) - (b === null) || -(a > b) || +(a < b);
            // },
            // text: function(a, b) {
            //     return (a === null) - (b === null) || a > b ? 1 : a < b ? -1 : 0;
            // }
        };

        // (a === null) - (b === null) || -(a > b) || +(a < b);

        function getValue(cell) {

            var v = (cell.textContent + '').trim();

            // if (!v.length) return null;

            return v;

        }

        var sortTypes = {
            date: {
                get: function(cell) {
                    return Date.parse(getValue(cell));
                },
                sort: comps.number
            },
            number: {
                get: function(cell) {
                    return +(getValue(cell).replace(/,/g, ''));
                },
                sort: comps.number
            },
            text: {
                get: function(cell) {
                    return getValue(cell);
                },
                sort: comps.text
            }
        };

        var typeMap = {
            bool: 'bool',
            date: 'date',
            document: 'text',
            enum: 'array',
            float: 'number',
            integer: 'number',
            number: 'number',
            relation: 'array',
            text: 'text'
        };

        return {

            sort: function(field, order, nodeType, frameRecords, frameData) {

                order = order || 'asc';

                var coreAttrs = [
                    'id',
                    'created_by',
                    'created_on',
                    'modified_by',
                    'modified_on',
                    'name',
                    'status',
                ];

                if (!Array.isArray(frameRecords)) return;

                frameRecords.sort(function (a, b) {

                    var v1,
                        v2;

                    if (coreAttrs.indexOf(field.key) >= 0) {

                        v1 = a[field.key];

                        v2 = b[field.key];

                    } else {

                        try {

                            v1 = frameData[a.id][field.key][0];

                            if (typeof v1 === 'string') {
                                v1 = !v1.length ? null : v1.toLowerCase();
                            }

                        } catch (e) {

                            v1 = null;

                        }

                        try {

                            v2 = frameData[b.id][field.key][0];

                            if (typeof v2 === 'string') {
                                v2 = !v2.length ? null : v2.toLowerCase();
                            }

                        } catch (e) {

                            v2 = null;

                        }

                    }

                    // equal items sort equally
                    if (v1 === v2) {
                        return 0;
                    }
                    // nulls sort after anything else
                    else if (v1 === null) {
                        return 1;
                    }
                    else if (v2 === null) {
                        return -1;
                    }
                    // otherwise, if we're ascending, lowest sorts first
                    else if (order === 'asc') {
                        return v1 < v2 ? -1 : 1;
                    }
                    // if descending, highest sorts first
                    else {
                        return v1 < v2 ? 1 : -1;
                    }

                });

                AppConfig.records[nodeType.id] = frameRecords;

                $timeout(function () {

                    $rootScope.$broadcast('records:sorted');

                }, 50);

                // return FrameDataService.chunkRecords(frameRecords);

            }

        };

    });