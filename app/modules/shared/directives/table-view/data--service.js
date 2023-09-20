'use strict';

/**
 * @ngdoc function
 * @name
 * @description
 */
angular.module('OilGasWatch')
    .service('FrameDataService',
        function(Account, $location, $log, Node, NodeType, Tag,
                 $rootScope, $route, $interval, $timeout, Utility,
                 QueryParamManager, AppConfig, Frame, CompositeFrame) {

            var self = this;

            self.queryParams = undefined;

            self.nodeTypes = [
                // Composite types
                {
                    id: 1,
                    composite: true,
                    name: 'Project',
                    normalized_name: 'project'
                },
                {
                    id: 3,
                    composite: true,
                    name: 'Clean Air Act - New Source Construction Permits',
                    normalized_name: 'air_construction_permit',
                    tpl_prefix: 'permit4'
                },
                {
                    id: 4,
                    composite: true,
                    name: 'Clean Air Act - Operating Permits',
                    normalized_name: 'air_operating_permit',
                    tpl_prefix: 'permit18'
                },
                {
                    id: 5,
                    composite: true,
                    name: 'Natural Gas Act - Certificates of Public Necessity',
                    normalized_name: 'nga_permit',
                    tpl_prefix: 'permit12'
                },
                {
                    id: 6,
                    composite: true,
                    name: 'Clean Water Act - Wastewater Discharge Permits',
                    normalized_name: 'cwanpdes_permit',
                    tpl_prefix: 'permit16'
                },
                {
                    id: 7,
                    composite: true,
                    name: 'Clean Water Act - Wetland Permits',
                    normalized_name: 'cwa_permit',
                    tpl_prefix: 'permit17'
                },
                {
                    id: 8,
                    composite: true,
                    name: 'Featured Facilities',
                    normalized_name: 'ff',
                    tpl_prefix: 'featuredFacility'
                },
                // {
                //     id: 9,
                //     composite: true,
                //     name: 'Pipeline meta',
                //     normalized_name: 'pm',
                //     tpl_prefix: 'twoColumnRecord'
                // },
                {
                    id: 9,
                    composite: true,
                    name: 'Other permits',
                    normalized_name: 'other_permits',
                    tpl_prefix: 'permit45'
                },
                {
                    id: 10,
                    composite: true,
                    name: 'Pipeline base',
                    normalized_name: 'pb',
                    tpl_prefix: 'twoColumnRecord'
                },
                // Standard types
                {
                    id: 4,
                    name: 'Air Construction',
                    alias: 'Permit No.',
                    normalized_name: 'air_construction',
                    excluded_columns: [
                        'document:8',
                        'enum:24',
                        'relation:44',
                        'text:19'
                    ]
                },
                {
                    id: 18,
                    name: 'Air Operating',
                    alias: 'Permit No.',
                    normalized_name: 'air_operating'
                },
                {
                    id: 2,
                    name: 'Company',
                    normalized_name: 'company'
                },
                {
                    id: 16,
                    name: 'CWA-NPDES',
                    alias: 'NPDES Permit No.',
                    normalized_name: 'cwa_npdes',
                    excluded_columns: [
                        'text:125',
                        'relation:34'
                    ]
                },
                {
                    id: 17,
                    name: 'CWA Wetland',
                    normalized_name: 'cwa_wetland'
                },
                {
                    id: 20,
                    name: 'Data Sources',
                    normalized_name: 'data_sources'
                },
                {
                    id: 1,
                    name: 'Facility',
                    normalized_name: 'facility'
                },
                {
                    id: 19,
                    name: 'Glossary',
                    normalized_name: 'glossary'
                },
                {
                    id: 21,
                    name: 'Map Layers',
                    normalized_name: 'map_layers'
                },
                {
                    id: 15,
                    name: 'NAICS',
                    normalized_name: 'naics'
                },
                {
                    id: 12,
                    name: 'NGA',
                    alias: 'FERC Docket Number',
                    normalized_name: 'nga',
                    excluded_columns: [
                        'document:8',
                        'enum:24',
                        'relation:44',
                        'text:88'
                    ]
                },
                {
                    id: 45,
                    name: 'Other Permits',
                    alias: 'Other Permit No. or Docket ID',
                    normalized_name: 'other_permits',
                    tpl_prefix: 'permit45'
                },
                {
                    id: 48,
                    name: 'MARAD',
                    alias: 'MARAD Docket No.',
                    normalized_name: 'marad'
                },
                {
                    id: 11,
                    name: 'Parent Company',
                    normalized_name: 'parent_company'
                },
                {
                    id: 9,
                    name: 'Pipelines',
                    normalized_name: 'pipelines'
                },
                {
                    id: 3,
                    name: 'Project',
                    normalized_name: 'project',
                    excluded_columns: [
                        'document:8',
                        'enum:24',
                        'relation:5,6,30,36',
                        'text:5,6,11,14,43,114'
                    ]
                }
            ];

            self.getTargetClass = function (composite) {

                composite = typeof composite === 'boolean' ? composite : false;

                if (composite) {

                    return CompositeFrame;

                }

                return Frame;

            };

            return {

                sliceRecords: function(page, arr, chunks) {

                    var start = (page - 1) * 25;

                    var offset = start + 25;

                    var chunk = {
                        keys: [],
                        records: arr.slice(start, offset)
                    };

                    for (var i = 0; i < chunk.records.length; i++) {

                        var record = chunk.records[i];

                        chunk.keys.push(record.id);

                    }

                    chunks.push(chunk);

                },

                chunkRecords: function(summary, arr) {

                    var chunks = [];

                    var n = 1;

                    while (n <= summary.page_count) {

                        this.sliceRecords(n, arr, chunks);

                        n++;

                    }

                    self.page = 1;

                    console.log(
                        'FrameDataService.chunkRecords:chunks:',
                        chunks
                    );

                    try {

                        return chunks;

                    } catch (e) {

                        return [];

                    }

                },

                focusRecord: function(arr) {

                    if (self.queryParams.rec) {

                        arr.forEach(function (feature) {

                            if (feature.id === +self.queryParams.rec) {

                                AppConfig.targetRecord = feature;

                            }

                        });

                    }

                },

                getFrameClass: function (composite) {

                    return self.getTargetClass(composite);

                },

                getNodeTypes: function () {

                    return self.nodeTypes;

                },

                indexNodeTypes: function () {

                    var arr = this.getNodeTypes();

                    var idx = {
                        composite: {}
                    };

                    arr.forEach(function(recordType) {

                        if (recordType.composite) {

                            idx['composite'][recordType.id] = recordType;

                        } else {

                            idx[recordType.id] = recordType;

                        }

                    });

                    console.log(
                        'FrameDataService.indexNodeTypes:idx:',
                        idx
                    );

                    return idx;

                },

                loadRecords: function(frameClass, nodeType, recordDomain, callback) {

                    var params = {
                        id: nodeType.id
                    };

                    if (Array.isArray(recordDomain)) {

                        params.record = recordDomain.join(',');

                    }

                    frameClass.records(params).$promise.then(function(successResponse) {

                        console.log(
                            'FrameDataService.loadRecords:successResponse:',
                            successResponse
                        );

                        self.frameRecords = successResponse.features;

                        callback(self.frameRecords);

                        // self.loadFrame();

                    }, function(errorResponse) {

                        console.log(
                            'FrameDataService.loadRecords:errorResponse:',
                            errorResponse
                        );

                    });

                },

                loadColumns: function(frameClass, nodeType, callback) {

                    console.log(
                        'FrameDataService.loadColumns:nodeType:',
                        nodeType
                    );

                    console.log(
                        'FrameDataService.loadColumns:callback:',
                        callback
                    );

                    var params = {
                        id: nodeType.id
                    };

                    // if (Array.isArray(nodeType.excluded_columns)) {
                    //
                    //     params.domain = nodeType.excluded_columns.join('.');
                    //     params.domain_action = 'exclude';
                    //
                    // }

                    frameClass.columns(params).$promise.then(function(successResponse) {

                        console.log(
                            'FrameDataService.loadColumns:successResponse:',
                            successResponse
                        );

                        self.frameColumns = successResponse.features;

                        callback(self.frameColumns);

                        // self.loadRecords();

                    }, function(errorResponse) {

                        console.log(
                            'FrameDataService.loadColumns:errorResponse:',
                            errorResponse
                        );

                    });

                },

                loadFrame: function(frameClass, nodeType, recordDomain, callback) {

                    console.log(
                        'FrameDataService.loadFrame:nodeType:',
                        nodeType
                    );

                    console.log(
                        'FrameDataService.recordDomain:recordDomain:',
                        recordDomain
                    );

                    console.log(
                        'FrameDataService.loadFrame:callback:',
                        callback
                    );

                    var params = {
                        id: nodeType.id
                    };

                    if (Array.isArray(recordDomain)) {

                        params.record = recordDomain.join(',');

                    }

                    frameClass.get(params).$promise.then(function(successResponse) {

                        console.log(
                            'FrameDataService.loadFrame:successResponse:',
                            successResponse
                        );

                        // self.frameData = successResponse.tree;

                        callback(successResponse.tree);

                        $timeout(function () {

                            $rootScope.$broadcast('load:frame');

                        }, 50);

                    }, function(errorResponse) {

                        console.log(
                            'FrameDataService.loadFrame:errorResponse:',
                            errorResponse
                        );

                    });

                },

                loadNodeTypes: function() {

                    NodeType.query({}).$promise.then(function(successResponse) {

                        console.log(
                            'FrameDataService.loadNodeTypes:successResponse:',
                            successResponse
                        );

                        self.tables = successResponse.features;

                        AppConfig.nodeTypes = self.tables;

                        self.tableSummary = successResponse.summary;

                        var nodeType = $route.current.params.nodeType;

                        self.tables.forEach(function (table) {

                            if (table.normalized_name === nodeType) {

                                self.nodeType = table;

                            }

                        });

                        self.loadColumns();

                    }, function(errorResponse) {

                        console.log(
                            'FrameDataService.loadNodeTypes:errorResponse:',
                            errorResponse
                        );

                    });

                },

                extractQueryParams: function () {

                    //
                    // Set default query string params.
                    //

                    var existingParams = QueryParamManager.getParams();

                    console.log(
                        'FrameDataService.extractQueryParams:existingParams:',
                        existingParams
                    );

                    QueryParamManager.setParams(
                        existingParams,
                        true);

                    //
                    // Set scoped query param variable.
                    //

                    self.queryParams = QueryParamManager.getParams();

                },

                // shiftWindow: function(params, records) {
                //
                //     console.log(
                //         'FrameDataService.shiftWindow:params:',
                //         params);
                //
                //     // var params = QueryParamManager.getParams();
                //
                //     var page = +params.page;
                //
                //     if (!Number.isInteger(page)) {
                //
                //         page = 1;
                //
                //     }
                //
                //     self.records = self.chunks[self.page - 1].records;
                //
                // },

                updateRecordCount: function(summary, count) {

                    if (!Utility.isObject(summary)) {

                        summary = {};

                    }

                    summary.feature_count = count;

                    summary.page_count = Math.ceil(count / 25);

                    return summary;

                }

            }

        });