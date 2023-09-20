'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:ProjectviewController
 * @description
 * # ProjectviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('FacilityListController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, mapbox, $window, $timeout, Utility,
                 $interval, LayerService, MapManager, Node, NodeType,
                 QueryParamManager, ProjectIndex, AppConfig, FilterManager,
                 TableSettingManager, TableFilter, FrameDataService) {

            var self = this;

            mapboxgl.accessToken = mapbox.accessToken;

            $rootScope.viewState = {
                'facility': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            $rootScope.page = {
                title: 'Projects'
            };

            self.nodeType = {
                "id": 3,
                "name": "Project",
                "normalized_name": "project"
            };

            var params = $location.search();

            params.sort = 'text:1:asc';

            $location.search(params);

            self.recordTypeIdx = FrameDataService.indexNodeTypes();

            // self.frameData = {};
            //
            // self.frameColumns = FilterManager.getFields('project');

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.hiddenKeys = {};

            self.zeroMatches = false;

            self.clearSearchInput = function () {

                var input = document.getElementById('fac-search');

                if (input) input.value = '';

            };

            self.filterIndex = function (queryToken) {

                console.log(
                    'practiceTypeList:filterIndex'
                );

                console.log(
                    'practiceTypeList:filterIndex:queryToken',
                    queryToken
                );

                var totalItems = 0;

                var totalHidden = 0;

                if (typeof queryToken === 'string') {

                    var token = queryToken.toLowerCase();

                    for (var key in self.index) {

                        if (self.index.hasOwnProperty(key)) {

                            var group = self.index[key];

                            if (Array.isArray(group)) {

                                totalItems += group.length;

                                var hiddenItems = 0;

                                group.forEach(function (item) {

                                    var name = item.name;

                                    if (typeof name === 'string' && name.length) {

                                        if (queryToken.length >= 3) {

                                            item.hide = !(item.name.toLowerCase().indexOf(token) >= 0);

                                        } else {

                                            item.hide = false;

                                        }

                                        if (item.hide) {

                                            hiddenItems++;

                                            totalHidden++;

                                        }

                                    }

                                });

                                self.hiddenKeys[key] = (group.length === hiddenItems);

                            }

                        }

                    }

                }

                self.zeroMatches = (totalItems > 0 && totalHidden > 0 && (totalItems === totalHidden));

            };

            self.showElements = function(createMap) {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

                }, 50);

            };

            self.loadProjectIndex = function() {

                self.showElements(true);

                // ProjectIndex.get().$promise.then(function(successResponse) {
                //
                //     console.log(
                //         'loadProjectIndex:successResponse:',
                //         successResponse
                //     );
                //
                //     // self.rows = successResponse.features;
                //     //
                //     // self.showElements(true);
                //
                //     self.frameRecords = successResponse.features;
                //
                //     self.recordSrc = successResponse.features;
                //
                //     self.summary = {
                //         feature_count: successResponse.features.length,
                //         page_count: Math.ceil(successResponse.features.length / 1e5)
                //     };
                //
                //     console.log(
                //         'loadRecords:summary',
                //         self.summary);
                //
                //     AppConfig.records[self.nodeType.id] = successResponse.features;
                //
                //     self.chunkRecords(self.frameRecords);
                //
                //     // self.focusRecord(successResponse.features);
                //
                //     self.loadFrame();
                //
                //     $timeout(function () {
                //
                //         $rootScope.$broadcast('load:records');
                //
                //     }, 50);
                //
                //     self.showElements(true);
                //
                // }, function(errorResponse) {
                //
                //     console.warn(
                //         'loadProjectIndex:errorResponse:',
                //         errorResponse
                //     );
                //
                //     self.showElements(true);
                //
                // });

            };

            self.loadNodes = function() {

                //
                // Set default query string params.
                //

                self.extractQueryParams();

                self.loadProjectIndex();

            };

            self.focusRecord = function(arr) {

                if (self.queryParams.rec) {

                    arr.forEach(function (feature) {

                        if (feature.id === +self.queryParams.rec) {

                            AppConfig.targetRecord = feature;

                        }

                    });

                }

            };

            self.sliceRecords = function(page, arr) {

                // var start = (page - 1) * 25;
                //
                // var offset = start + 25;

                var start = (page - 1) * 1e5;

                var offset = start + 1e5;

                var chunk = {
                    keys: [],
                    records: arr.slice(start, offset)
                };

                for (var i = 0; i < chunk.records.length; i++) {

                    var record = chunk.records[i];

                    chunk.keys.push(record.id);

                }

                self.chunks.push(chunk);

            };

            self.chunkRecords = function(arr) {

                self.chunks = [];

                var n = 1;

                while (n <= self.summary.page_count) {

                    self.sliceRecords(n, arr);

                    n++;

                }

                self.page = 1;

                try {

                    self.records = self.chunks[0].records;

                } catch (e) {

                    self.records = [];

                }

            };

            self.sortRecords = function(field, order) {

                console.log(
                    'sortRecords:field:',
                    field);

                console.log(
                    'sortRecords:order:',
                    order);

                order = order || 'asc';

                if (!Array.isArray(self.frameRecords)) return;

                var coreAttrs;

                try {
                    coreAttrs = Object.keys(self.frameRecords[0]);
                } catch (e) {
                    coreAttrs = [];
                }

                console.log(
                    'sortRecords:coreAttrs:',
                    coreAttrs);

                self.frameRecords.sort(function (a, b) {

                    var v1,
                        v2;

                    if (coreAttrs.indexOf(field.key) >= 0) {

                        v1 = a[field.key];

                        v2 = b[field.key];

                    } else {

                        try {

                            v1 = self.frameData[a.id][field.key][0];

                            if (typeof v1 === 'string') {
                                v1 = !v1.length ? null : v1.toLowerCase();
                            }

                        } catch (e) {

                            v1 = null;

                        }

                        try {

                            v2 = self.frameData[b.id][field.key][0];

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

                AppConfig.records[self.nodeType.id] = self.frameRecords;

                $timeout(function () {

                    $rootScope.$broadcast('records:sorted');

                }, 50);

                self.chunkRecords(self.frameRecords);

            };

            self.filterRecords = function(filters) {

                // var coreAttrs = [
                //     'id',
                //     'created_by',
                //     'created_on',
                //     'modified_by',
                //     'modified_on',
                //     'name',
                //     'status',
                // ];

                var coreAttrs;

                try {
                    coreAttrs = Object.keys(self.frameRecords[0]);
                } catch (e) {
                    coreAttrs = [];
                }

                self.frameRecords.sort(function (a, b) {

                    var v1,
                        v2;

                    if (coreAttrs.indexOf(field.key) >= 0) {

                        v1 = a[field.key];

                        v2 = b[field.key];

                    } else {

                        try {

                            v1 = self.frameData[a.id][field.key][0];

                        } catch (e) {

                            v1 = null;

                        }

                        try {

                            v2 = self.frameData[b.id][field.key][0];

                        } catch (e) {

                            v2 = null;

                        }

                    }

                    if (order === 'asc') {

                        if (v1 < v2) {

                            return -1;

                        }

                        if (v1 > v2) {

                            return 1;

                        }

                    } else {

                        if (v2 < v1) {

                            return -1;

                        }

                        if (v2 > v1) {

                            return 1;

                        }

                    }

                    return 0;

                });

                self.chunkRecords(self.frameRecords);

            };

            self.setPage = function(dir) {

                if (dir === 'prev') {

                    return (self.page > 1) ? self.page-- : 1;

                } else {

                    return (self.page < self.summary.page_count) ? self.page++ : self.summary.page_count;

                }

            };

            self.shiftWindow = function(params) {

                console.log(
                    'shiftWindow:params:',
                    params);

                // var params = QueryParamManager.getParams();

                self.page = +params.page;

                if (!Number.isInteger(self.page)) {

                    self.page = 1;

                }

                self.records = self.chunks[self.page - 1].records;

            };

            self.updateFeatureCount = function(count) {

                self.summary.feature_count = count;

                self.summary.page_count = Math.ceil(count / 25);

            };

            self.showArchivedRecords = function() {

                self.includeArchived = !self.includeArchived;

                self.loadRecords(self.includeArchived);

            };

            self.loadRecords = function(includeArchived) {

                var params = {
                    id: self.nodeType.id
                };

                if (includeArchived &&
                    typeof includeArchived === 'boolean') {

                    params.archived = true;

                }

                Frame.records(params).$promise.then(function(successResponse) {

                    self.frameRecords = successResponse.features;

                    self.recordSrc = successResponse.features;

                    self.summary = {
                        feature_count: successResponse.features.length,
                        page_count: Math.ceil(successResponse.features.length / 25)
                    };

                    console.log(
                        'loadRecords:summary',
                        self.summary);

                    AppConfig.records[self.nodeType.id] = successResponse.features;

                    self.chunkRecords(self.frameRecords);

                    self.focusRecord(successResponse.features);

                    self.loadFrame();

                    $timeout(function () {

                        $rootScope.$broadcast('load:records');

                    }, 50);

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                    self.showElements();

                });

            };

            self.loadColumns = function() {

                var params = {
                    id: self.nodeType.id
                };

                Frame.columns(params).$promise.then(function(successResponse) {

                    self.frameColumns = successResponse.features;

                    self.loadRecords();

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                    self.showElements();

                });

            };

            self.loadFrame = function() {

                // self.frameData = {};

                self.frameColumns = FilterManager.getFields('project');

                self.frameData = {};

                $timeout(function () {

                    $rootScope.$broadcast('load:frame');

                }, 50);

                // var params = {
                //     id: self.nodeType.id
                // };
                //
                // Frame.get(params).$promise.then(function(successResponse) {
                //
                //     self.frameData = successResponse.tree;
                //
                //     self.showElements();
                //
                //     $timeout(function () {
                //
                //         $rootScope.$broadcast('load:frame');
                //
                //     }, 50);
                //
                // }, function(errorResponse) {
                //
                //     console.log('errorResponse', errorResponse);
                //
                //     self.showElements();
                //
                // });

            };

            self.prependRow = function(data) {

                data.created_by = data.creator.name;

                data.modified_by = data.modified_by.name;

                self.frameRecords.push(data);

            };

            self.loadNodeTypes = function() {

                NodeType.query({}).$promise.then(function(successResponse) {

                    AppConfig.tables = self.tables = successResponse.features;

                    $timeout(function () {

                        $rootScope.$broadcast('load:tables');

                    }, 50);

                    self.tableSummary = successResponse.summary;

                    var nodeType = $route.current.params.nodeType;

                    self.tables.forEach(function (table) {

                        if (table.normalized_name === nodeType) {

                            self.nodeType = table;

                            StorageService.create(
                                'activeTable',
                                JSON.stringify(self.nodeType)
                            );

                        }

                    });

                    //
                    // Set default query string params.
                    //

                    self.extractQueryParams();

                    $rootScope.viewState[self.nodeType.normalized_name] = true;

                    $rootScope.page = {
                        title: self.nodeType.name,
                        actions: []
                    };

                    self.loadNodes();

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                    self.showElements();

                });

            };

            self.extractQueryParams = function () {

                // var params = $location.search();
                //
                // console.log(
                //     'NodeListController:extractQueryParams:params:',
                //     params
                // );
                //
                // console.log(
                //     'NodeListController:extractQueryParams:nodeType:',
                //     self.nodeType.normalized_name
                // );
                //
                // var sortToken = TableSettingManager.getSettings(
                //     'sortToken',
                //     self.nodeType.normalized_name
                // );
                //
                // console.log(
                //     'NodeListController:extractQueryParams:sortToken:',
                //     sortToken
                // );
                //
                // if (typeof sortToken === 'string') {
                //
                //     params.sort = sortToken;
                //
                // } else {
                //
                //     delete params.sort;
                //
                // }
                //
                // var filterToken = TableSettingManager.getSettings(
                //     'filterToken',
                //     self.nodeType.normalized_name
                // );
                //
                // console.log(
                //     'NodeListController:extractQueryParams:filterToken:',
                //     filterToken
                // );
                //
                // if (typeof filterToken === 'string') {
                //
                //     params.filters = filterToken;
                //
                // } else {
                //
                //     delete params.filters;
                //
                // }
                //
                // $location.search(params);

                //
                // Set default query string params.
                //

                var existingParams = QueryParamManager.getParams();

                console.log(
                    'NodeListController:existingParams:',
                    existingParams
                );

                QueryParamManager.setParams(
                    existingParams,
                    true);

                //
                // Set scoped query param variable.
                //

                self.queryParams = QueryParamManager.getParams();

            };

            self.loadNodes();

        });