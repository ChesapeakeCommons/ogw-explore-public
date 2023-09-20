'use strict';

/**
 * @ngdoc service
 * @name CommonsCloud.template
 * @description
 * # template
 * Provider in the Commons Cloud.
 */
angular.module('OilGasWatch')
    .service('FilterManager', [
        '$rootScope',
        '$location',
        '$timeout',
        'QueryParamManager',
        'StorageService',
        'TableSettingManager',
        function($rootScope, $location, $timeout, QueryParamManager,
                 StorageService, TableSettingManager) {

            var self = this;

            self._newFilter = {};

            self._baseFields = [
                // {
                //     key: 'created_on',
                //     label: 'Date created',
                //     type: 'date'
                // },
                // {
                //     key: 'created_by',
                //     label: 'Created by',
                //     type: 'text'
                // },
                // {
                //     key: 'modified_on',
                //     label: 'Date updated',
                //     type: 'date'
                // },
                // {
                //     key: 'modified_by',
                //     label: 'Updated by',
                //     type: 'text'
                // },
                // {
                //     key: 'id',
                //     label: 'ID',
                //     type: 'number'
                // },
                {
                    key: 'name',
                    label: 'Name',
                    type: 'text'
                },
                // {
                //     key: 'status',
                //     label: 'Status',
                //     type: 'text'
                // }
            ];

            self._operators = {
                array: [
                    {
                        key: 'all',
                        label: 'matches all…'
                    },
                    {
                        key: 'any',
                        label: 'matches any…'
                    },
                    {
                        key: 'eq',
                        label: 'equals…'
                    },
                    {
                        key: 'in',
                        label: 'contains…'
                    },
                    {
                        key: 'not_in',
                        label: 'does not contain…'
                    },
                    {
                        key: 'empty',
                        label: 'is empty'
                    },
                    {
                        key: 'not_empty',
                        label: 'is not empty'
                    },
                ],
                bool: [
                    {
                        key: 'eq',
                        label: 'is…'
                    },
                    {
                        key: 'neq',
                        label: 'is not…'
                    },
                    {
                        key: 'empty',
                        label: 'is empty'
                    },
                    {
                        key: 'not_empty',
                        label: 'is not empty'
                    },
                ],
                date: [
                    {
                        key: 'eq',
                        label: 'is…'
                    },
                    {
                        key: 'neq',
                        label: 'is not…'
                    },
                    {
                        key: 'gt',
                        label: 'is after…'
                    },
                    {
                        key: 'lt',
                        label: 'is before…'
                    },
                    {
                        key: 'empty',
                        label: 'is empty'
                    },
                    {
                        key: 'not_empty',
                        label: 'is not empty'
                    },
                ],
                number: [
                    {
                        key: 'eq',
                        label: 'equals…'
                    },
                    {
                        key: 'neq',
                        label: 'does not equal…'
                    },
                    {
                        key: 'gt',
                        label: 'greater than…'
                    },
                    {
                        key: 'gte',
                        label: 'greater than or equal to…'
                    },
                    {
                        key: 'lt',
                        label: 'less than…'
                    },
                    {
                        key: 'lte',
                        label: 'less than or equal to…'
                    },
                    {
                        key: 'empty',
                        label: 'is empty'
                    },
                    {
                        key: 'not_empty',
                        label: 'is not empty'
                    },
                ],
                text: [
                    {
                        key: 'eq',
                        label: 'equals…'
                    },
                    {
                        key: 'neq',
                        label: 'does not equal…'
                    },
                    {
                        key: 'start',
                        label: 'starts with…'
                    },
                    {
                        key: 'end',
                        label: 'ends with…'
                    },
                    {
                        key: 'in',
                        label: 'contains…'
                    },
                    {
                        key: 'not_in',
                        label: 'does not contain…'
                    },
                    {
                        key: 'empty',
                        label: 'is empty'
                    },
                    {
                        key: 'not_empty',
                        label: 'is not empty'
                    },
                ]
            };

            self.typeMap = {
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

            self._opType = 'date';

            self._operator = self._operators[self._opType][0];

            self._token = undefined;

            self._operatorOptions = [];

            self._filters = {};

            return {
                filters: [],
                createFilter: function (nodeType) {

                    if (!nodeType) {

                        nodeType = JSON.parse(
                            StorageService.find('activeTable')
                        );

                    }

                    console.log(
                        'FilterManager.createFilter:nodeType:',
                        nodeType
                    );

                    var tpl = {
                        field: self._baseFields[0],
                        operator: self._operator,
                        token: self._token
                    };

                    if (!Array.isArray(self._filters[nodeType.normalized_name])) {

                        self._filters[nodeType.normalized_name] = [];

                    }

                    self._filters[nodeType.normalized_name].push(tpl);

                },
                addFilter: function (nodeType, filter, resetParams) {

                    if (!nodeType) {

                        nodeType = JSON.parse(
                            StorageService.find('activeTable')
                        );

                    }

                    console.log(
                        'FilterManager.addFilter:nodeType:',
                        nodeType
                    );

                    resetParams = (typeof resetParams === 'boolean') ? resetParams : true;

                    console.log(
                        'FilterManager.addFilter:resetParams:',
                        resetParams
                    );

                    if (!Array.isArray(self._filters[nodeType.normalized_name])) {

                        self._filters[nodeType.normalized_name] = [];

                    }

                    var filterExists = false;

                    for (var i = 0; i < self._filters[nodeType.normalized_name].length; i++) {

                        var existingFilter = self._filters[nodeType.normalized_name][i];

                        console.log(
                            'FilterManager.addFilter:existingFilter:',
                            existingFilter
                        );

                        if (angular.equals(filter, existingFilter)) filterExists = true;

                    }

                    if (!filterExists) self._filters[nodeType.normalized_name].push(filter);

                    if (resetParams) this.updateParams(nodeType.normalized_name);

                },
                removeFilter: function (nodeType, idx, resetParams, setToken) {

                    resetParams = (typeof resetParams === 'boolean') ? resetParams : true;

                    setToken = (typeof setToken === 'boolean') ? setToken : true;
                    
                    var typeName = nodeType.normalized_name;

                    self._filters[typeName].splice(idx, 1);

                    if (self._filters[typeName].length) {

                        var lastFilter = self._filters[typeName][self._filters[typeName].length - 1];

                        lastFilter.logicOperator = undefined;

                    }

                    if (resetParams) this.updateParams(typeName);

                },
                removeAll: function (nodeType, resetParams, setToken) {

                    resetParams = (typeof resetParams === 'boolean') ? resetParams : true;

                    setToken = (typeof setToken === 'boolean') ? setToken : true;

                    console.log(
                        'FilterManager.removeAll:resetParams',
                        resetParams
                    );

                    console.log(
                        'FilterManager.removeAll:setToken',
                        setToken
                    );

                    self._filters[nodeType.normalized_name] = [];

                    if (resetParams) this.updateParams(nodeType.normalized_name);

                    if (setToken) this.setToken(
                        nodeType,
                        'FilterManager.removeAll'
                    );

                },
                getFields: function () {

                    return JSON.parse(JSON.stringify(self._baseFields));

                },
                getFilters: function (nodeType) {

                    if (!nodeType) {

                        nodeType = JSON.parse(
                            StorageService.find('activeTable')
                        );

                    }

                    console.log(
                        'FilterManager.getFilters:nodeType:',
                        nodeType
                    );

                    return self._filters[nodeType.normalized_name] || [];

                },
                getLogicChain: function (typeName) {

                    var ops = [];

                    var domain = [
                        'AND',
                        'OR'
                    ];

                    for (var i = 0; i < self._filters[typeName].length; i++) {

                        var config = self._filters[typeName][i];

                        var op = (config.logicOperator + '').toUpperCase();

                        if (domain.indexOf(op) >= 0) {

                            ops.push(op);

                        }

                    }

                    return ops;

                },
                getVarType: function (config) {

                    return config.field.type.split('_')[0];

                },
                setField: function (nodeType, filter, field, caller) {

                    console.log(
                        'FilterManager.setField:',
                        nodeType,
                        filter,
                        field,
                        caller
                    );

                    filter.field = field;

                    console.log(
                        'FilterManager.setField:filter.field:',
                        filter.field
                    );

                    filter.operator = this.getOperators(filter.field.type)[0];

                    console.log(
                        'FilterManager.setField:filter.operator:',
                        filter.operator
                    );

                    filter.token = undefined;

                    this.updateParams(nodeType.normalized_name);

                    this.setToken(
                        nodeType,
                        'FilterManager.setField'
                    );

                },
                getOperators: function (varType) {

                    console.log(
                        'FilterManager.getOperators:varType:',
                        varType
                    );

                    var opType = self.typeMap[varType.split('_')[0]];

                    console.log(
                        'FilterManager.getOperators:opType:',
                        opType
                    );

                    return self._operators[opType];

                },
                setOperator: function (nodeType, filter, op) {

                    filter.operator = op;

                    if (op.key === 'in' ||
                        op.key === 'not_in') {

                        try {

                            filter.token = filter.token.split('::')[0];

                        } catch (e) {

                            console.warn(
                                'FilterManager.setOperator:error:',
                                e
                            );

                            filter.token = undefined;

                        }

                    }

                    if (op.key.indexOf('empty') >= 0) {

                        filter.token = undefined;

                    }

                    this.updateParams(nodeType.normalized_name);

                    this.setToken(
                        nodeType,
                        'FilterManager.setOperator'
                    );

                },
                setToken: function (nodeType, origin) {

                    console.log(
                        'FilterManager.setToken:nodeType:',
                        nodeType
                    );

                    console.log(
                        'FilterManager.setToken:origin',
                        origin
                    );

                    console.log(
                        'FilterManager.setToken:filters',
                        self._filters
                    );

                    if (!nodeType) {

                        nodeType = JSON.parse(
                            StorageService.find('activeTable')
                        );

                    }

                    var mod = this;

                    $timeout(function () {

                        $rootScope.$broadcast(
                            'set:filterToken',
                            self._filters[nodeType.normalized_name]
                        );

                        mod.updateParams(nodeType);

                    }, 50);

                },
                updateParams: function (nodeType) {

                    function executeUpdate(activeTable, params) {

                        params.page = 1;

                        TableSettingManager.updateFilterToken(
                            activeTable,
                            params.filters
                        );

                        QueryParamManager.setParams(params);

                    }

                    if (!nodeType) {

                        nodeType = JSON.parse(
                            StorageService.find('activeTable')
                        );

                    }

                    console.log(
                        'FilterManager.updateParams:nodeType:',
                        nodeType
                    );

                    var params = $location.search();

                    var currentFilters = self._filters[nodeType.normalized_name];

                    if (!Array.isArray(currentFilters) ||
                        (Array.isArray(currentFilters) && !currentFilters.length)) {

                        delete params.filters;

                        executeUpdate(nodeType, params);

                        return;

                    }

                    var filterParams = [];

                    console.log(
                        'FilterManager.updateParams:filterParams:',
                        filterParams
                    );

                    for (var i = 0; i < self._filters[nodeType.normalized_name].length; i++) {

                        var config = self._filters[nodeType.normalized_name][i];

                        console.log(
                            'FilterManager.updateParams:config:',
                            config
                        );

                        if (config.operator.key) {

                            var segments = [
                                config.field.key,
                                '|',
                                config.operator.key
                            ];

                            if (config.operator.key.indexOf('empty') < 0 &&
                                config.token) {

                                segments.push('|' + encodeURIComponent(config.token));

                            }

                            if (typeof config.logicOperator === 'string') {

                                segments.push('|' + encodeURIComponent(config.logicOperator));

                            }

                            filterParams.push(segments.join(''));

                        }

                    }

                    console.log(
                        'FilterManager.updateParams:filterParams[1]:',
                        filterParams
                    );

                    if (filterParams.length) {

                        params.filters = encodeURIComponent(
                            btoa(filterParams.join('+'))
                        );

                    } else {

                        delete params.filters;

                    }

                    console.log(
                        'FilterManager.updateParams:params:',
                        params
                    );

                    executeUpdate(nodeType, params);

                }
            };

        }]);