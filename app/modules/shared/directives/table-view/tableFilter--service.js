'use strict';

/**
 * @ngdoc service
 * @name CommonsCloud.template
 * @description
 * # template
 * Provider in the Commons Cloud.
 */
angular.module('OilGasWatch')
    .service('TableFilter',
        function(FilterManager, $filter, Utility) {

            var self = this;

            var ops = {
                'eq': function(a, b) {
                    return a === b;
                },
                'neq': function(a, b) {
                    return a !== b;
                },
                'start': function(a, b) {
                    return a.startsWith(b);
                },
                'end': function(a, b) {
                    return a.endsWith(b);
                },
                'in': function(a, b) {
                    return a.indexOf(b) >= 0;
                },
                'not_in': function(a, b) {
                    return a.indexOf(b) < 0;
                },
                'gt': function(a, b) {
                    return a > b;
                },
                'gte': function(a, b) {
                    return a >= b;
                },
                'lt': function(a, b) {
                    return a < b;
                },
                'lte': function(a, b) {
                    return a <= b;
                },
                'empty': function(a, b) {
                    return a === null || typeof a === 'undefined' || !(a + '').length;
                },
                'not_empty': function(a, b) {
                    return a !== null && (a.length > 0 || Utility.isNumber(a) || typeof a === 'boolean');
                },
            };

            var arrayOps = {
                //
                // When using the ``all`` operator, the ``comparator`` is split
                // on the ``::`` delimiter used for concatenated tokens.
                // The condition is met if all members of the resulting
                // array equal the ``value`` string (processed query token).
                //
                // This operation is case sensitive.
                //
                'all': function (comparator, value) {

                    // console.log(
                    //     'TableFilter:arrayOps:all:',
                    //     comparator,
                    //     value
                    // );

                    return comparator.split('::').every(function (token) {
                        //
                        // Pass ``token`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        token = $filter('splitLast')(token, '[');
                        return value.indexOf(token) >= 0;
                    });

                },
                //
                // When using the ``any`` operator, the ``comparator`` is split
                // on the ``::`` delimiter used for concatenated tokens.
                // The condition is met if at least one member of the resulting
                // array equals the ``value`` string (processed query token).
                //
                // This operation is case sensitive.
                //
                'any': function (comparator, value) {

                    // console.log(
                    //     'TableFilter:arrayOps:any:',
                    //     comparator,
                    //     value
                    // );

                    return comparator.split('::').some(function (token) {
                        //
                        // Pass ``token`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        token = $filter('splitLast')(token, '[');
                        return value.indexOf(token) >= 0;
                    });

                },
                //
                // When using the ``start`` operator, the ``comparator`` is split
                // on the ``::`` delimiter used for concatenated tokens.
                // The condition is met if at least one member of the resulting
                // array starts with the ``value`` string (processed query token).
                //
                // This operation is case sensitive.
                //
                'start': function (comparator, value) {

                    // console.log(
                    //     'TableFilter:arrayOps:start:',
                    //     comparator,
                    //     value
                    // );

                    return value.some(function (v) {
                        //
                        // Pass ``v`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        v = $filter('splitLast')(v, '[');
                        return v.startsWith(comparator);
                    });

                },
                //
                // When using the ``end`` operator, the ``comparator`` is split
                // on the ``::`` delimiter used for concatenated tokens.
                // The condition is met if at least one member of the resulting
                // array ends with the ``value`` string (processed query token).
                //
                // This operation is case sensitive.
                //
                'end': function (comparator, value) {

                    // console.log(
                    //     'TableFilter:arrayOps:end:',
                    //     comparator,
                    //     value
                    // );

                    return value.some(function (v) {
                        //
                        // Pass ``v`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        v = $filter('splitLast')(v, '[');
                        return v.endsWith(comparator);
                    });

                },
                //
                // Condition met if ``value`` array is empty.
                //
                'empty': function (comparator, value) {

                    return !value.length;

                },
                //
                // Condition met if ``value`` array is not empty.
                //
                'not_empty': function (comparator, value) {

                    return value.length > 0;

                },
                //
                // When using the ``contains`` operator, the
                // condition is met if any member of the ``value``
                // array contains the ``comparator`` string
                // (processed query token).
                //
                // All operands are converted to lower case.
                //
                'in': function (comparator, value) {

                    return value.some(function (v) {
                        //
                        // Pass ``v`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        v = $filter('splitLast')(v, '[');
                        v = v.toLowerCase();
                        return v.indexOf(comparator) >= 0;
                    });

                },
                //
                // When using the ``does not contain`` operator, the
                // condition is met if any member of the ``value``
                // array does not contain the ``comparator`` string
                // (processed query token).
                //
                // All operands are converted to lower case.
                //
                'not_in': function (comparator, value) {

                    return value.every(function (v) {
                        //
                        // Pass ``v`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        v = $filter('splitLast')(v, '[');
                        v = v.toLowerCase();
                        return v.indexOf(comparator) < 0;
                    });

                },
                //
                // When using the ``equals`` operator, the position
                // of arguments in the call to ``Array.prototype.some()``
                // are reversed. In this case, the ``comparator`` is split
                // on the ``::`` delimiter used for concatenated tokens.
                // The condition is met if any member of the resulting
                // array equals the ``value`` string (processed query token).
                //
                // This operation is case sensitive.
                //
                'eq': function (comparator, value) {

                    return comparator.split('::').some(function (token) {
                        //
                        // Pass ``token`` through ``splitLast`` filter
                        // to clip bracketed primary key identifier.
                        //
                        token = $filter('splitLast')(token, '[');
                        return value.indexOf(token) >= 0;
                    });

                }
            };

            var casedOps = [
                'all',
                'any',
                'eq',
                'neq'
            ];

            var conversions = {
                array: function(value, orientation) {

                    if (orientation === 'value') {

                        return Array.isArray(value) ? value : [];

                    } else {

                        return typeof value === 'string' ? value : null;

                    }

                },
                bool: function(value) {

                    return Utility.parseBoolean(value);

                },
                date: function(value) {

                    if (!value || typeof value !== 'string') return null;

                    value = value.trim();

                    return value ? Date.parse(value) : null;

                },
                number: function(value) {

                    return Utility.parseNumber(value);

                },
                text: function(value) {

                    if (!value || typeof value !== 'string') return '';

                    return value.trim();

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
                fullMatch: function (arr, comparator) {

                    if (!arr.length) return false;

                    return arr.every(function(value) {
                        return value === comparator;
                    });

                },
                partialMatch: function (arr, comparator) {

                    // console.log(
                    //     'TableFilter:partialMatch:arr:',
                    //     arr
                    // );
                    //
                    // console.log(
                    //     'TableFilter:partialMatch:comparator:',
                    //     comparator
                    // );

                    if (!arr.length) return false;

                    return arr.some(function(value) {
                        return value === comparator;
                    });

                },
                getComparator: function (config, typeKey) {

                    // console.log(
                    //     'TableFilter:getComparator:typeKey:',
                    //     typeKey
                    // );

                    if (!angular.isDefined(typeKey)) {

                        throw new Error('Unsupported field type.');

                    }

                    //
                    // Comparator values are ignored for ``emptiness`` tests.
                    // In those cases, simply return the raw query token.

                    if (config.operator.key.indexOf('empty') >= 0) {

                        return config.token;

                    }

                    var comparator = conversions[typeKey](config.token);

                    if ((typeKey === 'text' || typeKey === 'array') &&
                        typeof comparator === 'string' &&
                        casedOps.indexOf(config.operator.key) < 0) {

                        comparator = comparator.toLowerCase();

                    }

                    return comparator;

                },
                getTypeKey: function (config) {

                    return typeMap[config.field.type];

                },
                getValue: function (typeKey, record, frame, config) {

                    // console.log(
                    //     'TableFilter:getValue:typeKey:',
                    //     typeKey
                    // );

                    // console.log(
                    //     'TableFilter:getValue:record:',
                    //     record
                    // );

                    // console.log(
                    //     'TableFilter:getValue:variableKey:',
                    //     variableKey
                    // );
                    //
                    // console.log(
                    //     'TableFilter:getValue:vars:',
                    //     frame[record.id]
                    // );

                    var variableKey = config.field.key;

                    var value;

                    try {

                        var varType = FilterManager.getVarType(config);

                        var specialTypes = ['enum', 'relation'];

                        if (specialTypes.indexOf(varType) >= 0) {

                            value = frame[record.id][variableKey];

                        } else {

                            value = frame[record.id][variableKey][0];

                        }

                    } catch (e) {

                        value = record[variableKey];

                    }

                    // console.log(
                    //     'TableFilter:getValue:value:',
                    //     value
                    // );

                    if (Array.isArray(value)) {

                        return value.map(function(token) {
                            token = $filter('splitLast')(token, '[');
                            token = (casedOps.indexOf(config.operator.key) < 0) ? token.toLowerCase() : token;
                            return token;
                        });

                    }

                    if (typeKey === 'array') {

                        value = conversions[typeKey](value, 'value');

                    } else {

                        value = conversions[typeKey](value);

                    }

                    if (typeKey === 'text' &&
                        config.operator.key !== 'eq') {

                        return value.toLowerCase();

                    }

                    return value;

                },
                evaluateFilter: function (options) {

                    var typeKey = this.getTypeKey(options.config);

                    var comparator = this.getComparator(options.config, typeKey);

                    var value = this.getValue(
                        typeKey,
                        options.record,
                        options.frame,
                        options.config
                    );

                    var match = false;

                    if (casedOps.indexOf(options.config.operator.key) > 0 &&
                        typeof comparator !== 'boolean' &&
                        !comparator) {

                        match = true;

                    } else {

                        match = this.matchValue(
                            options.config,
                            value,
                            comparator
                        );

                    }
                    
                    options.values.push(match);

                },
                deriveConditions: function (filters, record, frame) {

                    var values = [];
                    
                    //
                    // Iterate the filters array and evaluate each condition.
                    //

                    for (var i = 0; i < filters.length; i++) {

                        var config = filters[i];

                        this.evaluateFilter({
                            config: config,
                            frame: frame,
                            record: record,
                            values: values
                        });

                    }

                    return values;

                },
                matchArray: function(config, value, comparator) {

                    // console.log(
                    //     'TableFilter:matchArray:config:',
                    //     config
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchArray:value:',
                    //     value
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchArray:comparator:',
                    //     comparator
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchArray:config.token:',
                    //     config.token
                    // );

                    return arrayOps[config.operator.key](comparator, value);

                },
                matchValue: function(config, value, comparator) {

                    // console.log(
                    //     'TableFilter:matchValue:config:',
                    //     config
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchValue:value:',
                    //     value
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchValue:comparator:',
                    //     comparator
                    // );
                    //
                    // console.log(
                    //     'TableFilter:matchValue:config.token:',
                    //     config.token
                    // );

                    if ((comparator === null || typeof comparator === 'undefined') &&
                        config.operator.key.indexOf('empty') < 0) {

                        return true;

                    } else {

                        var varType = FilterManager.getVarType(config);

                        var specialTypes = ['enum', 'relation'];

                        if (specialTypes.indexOf(varType) >= 0) {

                            return this.matchArray(config, value, comparator);

                        } else {

                            return ops[config.operator.key](value, comparator);

                        }

                    }

                },
                getDisplaySetting: function(values, chain) {

                    var display = false;

                    //
                    // Evaluated when ALL filter conditions must be met.
                    //

                    if (chain.indexOf('OR') < 0) {

                        return this.fullMatch(values, true);

                    }

                    //
                    // Evaluated when ANY filter condition can be met.
                    //

                    if (chain.indexOf('AND') < 0) {

                        return this.partialMatch(values, true);

                    }

                    //
                    // Evaluated when a filter combination must be true.
                    //

                    if (values.length > 1 &&
                        !chain.length) throw new Error('Invalid operator chain.');

                    if (chain[0] === 'AND') {

                        return (values[0] && values[1]) ? true : false;

                    }

                    if (chain[0] === 'OR') {

                        var sliceMatch = this.fullMatch(
                            values.slice(2),
                            true);

                        return (values[0] || values[1]) && sliceMatch ? true : false;

                    }

                    return display;

                },
                applyFilters: function (records, frame, filters, index) {

                    for (var i = 0; i < records.length; i++) {

                        var record = records[i];

                        var values = this.deriveConditions(
                            filters,
                            record,
                            frame
                        );

                        //
                        // Retrieve array of boolean values that
                        // represent the status of each filter
                        // condition.
                        //

                        var arr = index[record.id];

                        if (!Array.isArray(arr)) {

                            arr = [];

                        }

                        //
                        // Re-assign concatenated array to index variable.
                        //

                        index[record.id] = arr.concat(values);

                    }

                },
                findMatches: function (records, index, chain) {

                    var matches = [];

                    const length = records.length;

                    for (var i = 0; i < length; i++) {

                    // for (var i = records.length; i--;) {

                        var record = records[i];

                        var isMatch = this.getDisplaySetting(
                            index[record.id],
                            chain
                        );

                        if (isMatch) {

                            matches.push(record);

                        }

                    }

                    return matches;

                },
                filter: function (typeName, event, filters, records, frame) {

                    console.log(
                        'TableFilter:filter:typeName:',
                        typeName
                    );

                    console.log(
                        'TableFilter:filter:event:',
                        event
                    );

                    console.log(
                        'TableFilter:filter:filters:',
                        filters
                    );

                    if (!Array.isArray(filters)) return records;

                    if (!filters.length) return records;

                    //
                    // Isolate an array of conjunctive operators from
                    // the current filter set.
                    //
                    // Example output: ['AND', 'OR', 'OR']
                    //

                    var logicChain = FilterManager.getLogicChain(typeName);

                    //
                    // Instantiate empty object for tracking record (row) visibility.
                    // Each record's variable values determine visibility via
                    // filter evaluation, which occurs in `TableFilter.applyFilters()`.
                    //

                    var nodeIdx = {};

                    this.applyFilters(
                        records,
                        frame,
                        filters,
                        nodeIdx
                    );

                    //
                    // Compare source records to tracking index
                    //

                    return this.findMatches(
                        records,
                        nodeIdx,
                        logicChain
                    );

                }

            };

        });