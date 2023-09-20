(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('tableView', [
            'environment',
            '$window',
            '$timeout',
            '$interval',
            '$location',
            'AnchorScroll',
            'Node',
            'Variable',
            'AppConfig',
            'TableLayoutUtil',
            'TableSort',
            'TableFilter',
            'FrameManager',
            'FilterManager',
            'TableSettingManager',
            'FrameDataService',
            'Utility',
            'PermitSort',
            function (environment, $window, $timeout, $interval, $location,
                      AnchorScroll, Node, Variable, AppConfig,
                      TableLayoutUtil, TableSort,
                      TableFilter, FrameManager, FilterManager,
                      TableSettingManager, FrameDataService, Utility, PermitSort) {
                return {
                    restrict: 'EA',
                    scope: {
                        'addControls': '=?',
                        'alerts': '=?',
                        'autosize': '=?',
                        'callback': '&',
                        'columns': '=?',
                        'composite': '=?',
                        'dragEnabled': '=?',
                        'featureType': '@',
                        'frameData': '=?',
                        'hideWhenEmpty': '=?',
                        'hideCallback': '&',
                        'includeMod': '=?',
                        'includeRecordName': '=?',
                        'index': '=?',
                        'limitDomain': '=?',
                        'nodeType': '=?',
                        'permissions': '=?',
                        'postDelete': '&',
                        'records': '=?',
                        'recordDomain': '=?',
                        'recordIdx': '=?',
                        'renderComplete': '=?',
                        'queryParams': '=?',
                        'specialData': '=?',
                        'visible': '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        console.log(
                            'tableView:attrs:',
                            attrs
                        );

                        var tplPrefix = attrs.featureType;

                        if (!tplPrefix) {

                            var containerEl = document.getElementById('grid');

                            tplPrefix = containerEl.getAttribute('data-tpl-prefix');

                        }

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'table-view/views/',
                            // Template file
                            tplPrefix + 'Table--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        scope.display = {};

                        if (typeof scope.includeRecordName !== 'boolean') {

                            scope.includeRecordName = true;

                        }

                        if (typeof scope.renderComplete !== 'boolean') {

                            scope.renderComplete = false;

                        }

                        if (typeof scope.addControls !== 'boolean') {

                            scope.addControls = false;

                        }

                        if (typeof scope.dragEnabled !== 'boolean') {

                            scope.dragEnabled = false;

                        }

                        if (typeof scope.limitDomain !== 'boolean') {

                            scope.limitDomain = false;

                        }

                        if (typeof scope.composite !== 'boolean') {

                            scope.composite = false;

                        }

                        if (typeof scope.autosize !== 'boolean') {

                            scope.autosize = false;

                        }

                        if (scope.autosize) {

                            // element[0].style.height = window.innerHeight + 'px';

                        }

                        scope.frameClass = FrameDataService.getFrameClass(
                            scope.composite
                        );

                        var collections = [
                            'comment',
                            'table',
                            'variable'
                        ];

                        scope.colWidths = {};

                        scope.baseCols = FilterManager.getFields();

                        scope.appConfig = AppConfig;

                        scope.targetNode = undefined;

                        scope.showFormModal = false;

                        scope.resizeComplete = false;

                        $window.scrollTo(0, 0);

                        scope.page = 1;

                        scope.shiftWindow = function(params) {

                            console.log(
                                'FrameDataService.shiftWindow:params:',
                                params);

                            scope.page = +params.page;

                            if (!Number.isInteger(scope.page)) {

                                scope.page = 1;

                            }

                            scope.records = scope.chunks[scope.page - 1].records;

                        };

                        scope.resize = function () {

                            if (!Array.isArray(scope.records)) return;

                            $timeout(function () {

                                TableLayoutUtil.resizeMainContent(scope.records.length);

                                scope.resizeComplete = true;

                            }, 10);

                            $timeout(function () {

                                scope.renderComplete = true;

                            }, 100);

                        };

                        scope.addListeners = function () {

                            $timeout(function () {

                                TableLayoutUtil.addColResizeListeners(
                                    scope.nodeType
                                );

                            }, 200);

                        };

                        scope.getTableHeight = function () {

                            $timeout(function () {

                                scope.tableHeight =  (26 * 36) + 'px';

                            }, 100);

                        };

                        function closeAlerts() {

                            scope.alerts = [];

                        }

                        scope.sortTable = function (event, origin) {

                            // TableSort.sort(event, origin);

                        };

                        scope.setColWidths = function (cols, idx) {

                            console.log(
                                'tableView:setColWidths:cols',
                                cols
                            );

                            idx = idx || {};

                            console.log(
                                'tableView:setColWidths:idx',
                                idx
                            );

                            for (var i = 0; i < cols.length; i++) {

                                var col = cols[i];

                                var colType = col.type.split('_')[0];

                                var widths = {
                                    bool: 110,
                                    date: 110,
                                    document: 200,
                                    location: 110,
                                    number: 110,
                                    relation: 200,
                                    text: 200
                                };

                                if (colType.startsWith('float') ||
                                    colType.startsWith('integer')) {

                                    colType = 'number';

                                }

                                if (colType.startsWith('enum')) {

                                    colType = 'text';

                                }

                                try {

                                    var existingWidth = +(idx[col.key].replace('px', ''));

                                    console.log(
                                        'tableView:setColWidths:existingWidth',
                                        col.key,
                                        existingWidth
                                    );

                                    if (existingWidth > -Infinity) {

                                        idx[col.key] = existingWidth + 'px';

                                    } else {

                                        idx[col.key] = widths[colType] + 'px';

                                    }

                                } catch (e) {

                                    console.warn(e);

                                    idx[col.key] = widths[colType] + 'px';

                                }

                                // if (typeof idx[col.key] === 'undefined') {
                                //
                                //     idx[col.key] = widths[colType] + 'px';
                                //
                                // }

                            }

                            TableLayoutUtil.setColWidths(
                                scope.nodeType.normalized_name,
                                idx);

                            scope.colWidths = idx;

                            // $timeout(function () {
                            //
                            //     TableSettingManager.updateColumnWidth(
                            //         scope.nodeType,
                            //         scope.colWidths
                            //     );
                            //
                            // }, 50);

                        };

                        //
                        // Additional scope vars.
                        //

                        scope.tipManager = {};

                        scope.modalManager = {
                            action: undefined
                        };

                        scope.resetTip = function (key, recordId) {

                            var existing = scope.tipManager[key];

                            scope.tipManager = {};

                            if (existing === recordId) return;

                            if (key && recordId) {
                                scope.tipManager[key] = recordId;
                            }

                        };

                        scope.toggleActionModal = function (recordId) {

                            var existing = scope.modalManager.action;

                            scope.modalManager = {};

                            if (existing === recordId) return;

                            if (recordId) {
                                scope.modalManager.action = recordId;
                            }

                        };

                        scope.processIndex = function (arr) {

                            if (Array.isArray(arr)) {

                                arr.sort(function (a, b) {
                                    if (a.index < b.index) return -1;
                                    if (a.index > b.index) return 1;
                                    return 0;
                                });

                                scope.index = arr;

                            }

                        };

                        // scope.editNode = function (node) {
                        //
                        //     $location.path('/facilities/' + recordId + '/edit');
                        //
                        // };

                        scope.presentDeletionDialog = function (record, index) {

                            scope.record = record;

                            scope.rowIdx = index;

                            scope.showDeletionDialog = true;

                            scope.modalManager = {};

                        };

                        scope.presentExportDialog = function (record) {

                            scope.record = record;

                            scope.showExportDialog = true;

                            scope.modalManager = {};

                        };

                        scope.archiveNode = function (record, archived) {

                            archived = archived || false;

                            var data = {
                                archived: archived
                            };

                            var successMsg,
                                errorMsg;

                            if (archived) {

                                successMsg = 'Record move to archive.';

                                errorMsg = 'Something went wrong and the record was not archived.';

                            } else {

                                successMsg = 'Record restored from archive.';

                                errorMsg = 'Something went wrong and the record was not restored from the archive.';

                            }

                            Node.update({
                                id: record.id
                            }, data).$promise.then(function(successResponse) {

                                scope.callback();

                                scope.alerts = [{
                                    'type': 'success',
                                    'flag': 'Success!',
                                    'msg': successMsg,
                                    'prompt': 'OK'
                                }];

                                $timeout(closeAlerts, 2000);

                            }).catch(function(error) {

                                // Do something with the error

                                scope.alerts = [{
                                    'type': 'error',
                                    'flag': 'Error!',
                                    'msg': errorMsg,
                                    'prompt': 'OK'
                                }];

                                $timeout(closeAlerts, 2000);

                            });

                        };

                        scope.updateQueryParams = function(record, removeParam) {

                            var urlParams = $location.search();

                            console.log(
                                'tableView:updateQueryParams.urlParams',
                                urlParams
                            );

                            if (removeParam) {

                                delete urlParams.rec;

                            } else {

                                urlParams.rec = record.id;

                                if (record.type &&
                                    record.type.indexOf('variable') >= 0) {

                                    urlParams.type = record.type.split('_')[0];

                                }

                            }

                            console.log(
                                'tableView:updateQueryParams.urlParams[2]',
                                urlParams
                            );

                            $location.search(urlParams);

                        };

                        scope.setTargetNode = function(node) {

                            scope.modalManager = {};

                            scope.targetNode = node;

                            var arr;

                            if (Array.isArray(scope.records)) {

                                arr = scope.records;

                            } else {

                                arr = scope.index;

                            }

                            for (var i = 0; i < arr.length; i++) {

                                var record = arr[i];

                                if (node.id === record.id) {

                                    // if (i > 0) {
                                    //
                                    //     scope.previousRecord = arr[i - 1];
                                    //
                                    // } else {
                                    //
                                    //     scope.previousRecord = undefined;
                                    //
                                    // }
                                    //
                                    // if (i < arr.length - 1) {
                                    //
                                    //     scope.nextRecord = arr[i + 1];
                                    //
                                    // } else {
                                    //
                                    //     scope.nextRecord = undefined;
                                    //
                                    // }

                                    scope.recordIdx = i;

                                }

                            }

                            scope.showFormModal = !scope.showFormModal;

                            scope.updateQueryParams(node);

                        };

                        scope.removeRecord = function(index) {

                            if (Number.isInteger(index)) scope.records.splice(index, 1);

                            if (scope.postDelete) scope.postDelete();

                        };

                        scope.setDefaultColWidths = function(data) {

                            scope.setColWidths(
                                scope.baseCols,
                                TableLayoutUtil.colWidths[scope.nodeType.normalized_name]
                            );

                            scope.setColWidths(
                                data,
                                TableLayoutUtil.colWidths[scope.nodeType.normalized_name]
                            );

                        };

                        scope.$watch('index', function (newVal) {

                            if (newVal) {

                                scope.processIndex(newVal);

                                // scope.resize();

                            }

                        });

                        scope.$watch('records', function (newVal) {

                            if (newVal) {

                                $timeout(function () {

                                    if (scope.featureType.startsWith('permit') &&
                                        !scope.composite) {

                                        scope.watchPermits();

                                    }

                                    // scope.resize();

                                }, 50);

                            }

                        });

                        scope.$watch('frameData', function (newVal) {

                            if (Utility.isObject(newVal)) {

                                // scope.processIndex(newVal);

                                FrameManager.setFrame(newVal);

                                $timeout(function () {

                                    scope.resize();

                                    scope.addListeners();

                                }, 50);

                            }

                        });

                        scope.$watch('appConfig.nodeTypes', function (newVal) {

                            console.log(
                                'tableView:appConfig.nodeTypes',
                                newVal
                            );

                            if (Array.isArray(newVal)) {

                                AppConfig.tables.forEach(function (type) {

                                    collections.push(type.normalized_name);

                                });

                            }

                        });

                        scope.$watch('appConfig.targetRecord', function (newVal) {

                            console.log(
                                'tableView:appConfig.targetRecord',
                                newVal
                            );

                            if (newVal) {

                                scope.updateQueryParams(newVal);

                                scope.setTargetNode(newVal);

                            }

                        });

                        scope.$watch('columns', function (newVal) {

                            console.log(
                                'tableView:columns',
                                newVal
                            );

                            if (Array.isArray(newVal)) {

                                var storedSettings = TableSettingManager.getSettings(
                                    'colWidths',
                                    scope.nodeType.normalized_name
                                );

                                console.log(
                                    'tableView:columns:storedSettings',
                                    storedSettings
                                );

                                try {

                                    if (Object.keys(storedSettings).length) {

                                        scope.setColWidths(newVal, storedSettings);

                                        // scope.colWidths = storedSettings;
                                        //
                                        // TableLayoutUtil.setColWidths(
                                        //     scope.nodeType.normalized_name,
                                        //     storedSettings);

                                    } else {

                                        scope.setDefaultColWidths(newVal);

                                    }

                                } catch (e) {

                                    console.warn(e);

                                    scope.setDefaultColWidths(newVal);

                                }

                                console.log(
                                    'tableView:colWidths',
                                    scope.colWidths
                                );

                            }

                        });

                        scope.loadData = function () {

                            console.log(
                                'tableView:loadData:nodeType:',
                                scope.nodeType
                            );

                            console.log(
                                'tableView:loadData:recordDomain:',
                                scope.recordDomain
                            );

                            if (!Utility.isObject(scope.nodeType)) return;

                            if (!Number.isInteger(scope.nodeType.id)) return;

                            if (!Array.isArray(scope.recordDomain) && scope.limitDomain) return;

                            FrameDataService.loadColumns(
                                scope.frameClass,
                                scope.nodeType,
                                function (data) {
                                    scope.columns = data;
                                }
                            );

                            FrameDataService.loadRecords(
                                scope.frameClass,
                                scope.nodeType,
                                scope.recordDomain,
                                function (data) {
                                    scope.frameRecords = data;
                                    scope.recordSrc = data;
                                    scope.summary = {
                                        feature_count: data.length,
                                        page_count: Math.ceil(data.length / 25)
                                    };
                                    scope.chunks = FrameDataService.chunkRecords(
                                        scope.summary,
                                        scope.frameRecords
                                    );

                                    try {
                                        scope.records = scope.chunks[0].records;
                                    } catch (e) {
                                        if (scope.hideWhenEmpty) {
                                            scope.forceHide = true;
                                            scope.hideCallback();
                                        }
                                        scope.emptyRecordSet = true;
                                    }
                                    console.log(
                                        'tableView:loadData:records:',
                                        scope.records
                                    );
                                }
                            );

                            FrameDataService.loadFrame(
                                scope.frameClass,
                                scope.nodeType,
                                scope.recordDomain,
                                function (data) {
                                    scope.frameData = data;
                                }
                            );

                            scope.loadGateCheck = true;

                        };

                        var gatePoll = $interval(function() {

                            if (scope.loadGateCheck) {

                                $timeout(function () {

                                    $interval.cancel(gatePoll);

                                }, 0);

                                return;

                            }

                            scope.loadData();

                        }, 100);

                        scope.setPermitSortKeys = function () {

                            console.log(
                                'tableView.setPermitSortKeys:run:',
                                scope.loadGateCheck,
                                scope.records
                            );

                            scope.records.forEach(function (record) {

                                PermitSort.setKey(
                                    record,
                                    scope.frameData,
                                    scope.featureType
                                );

                            });

                            scope.records.sort(
                                function(a, b) {
                                    if (a.project === b.project) {
                                        // Date issued is only important inside a project group.
                                        return b.date - a.date;
                                    }
                                    return a.project > b.project ? 1 : -1;
                                });

                        };

                        scope.watchPermits = function () {

                            var permitLoadPoll = $interval(function() {

                                console.log(
                                    'tableView.watchPermits:poll:',
                                    scope.loadGateCheck
                                );

                                if (scope.loadGateCheck) {

                                    $timeout(function () {

                                        $interval.cancel(permitLoadPoll);

                                        scope.setPermitSortKeys();

                                    }, 0);

                                }

                            }, 100);

                        };

                        // scope.loadData();

                        // scope.$watch('recordDomain', function (newVal) {
                        //
                        //     console.log(
                        //         'tableView:recordDomain:',
                        //         newVal,
                        //         scope.limitDomain
                        //     );
                        //
                        //     scope.loadData();
                        //
                        // });
                        //
                        // scope.$watch('nodeType', function (newVal) {
                        //
                        //     console.log(
                        //         'tableView:recordDomain:',
                        //         newVal,
                        //         scope.limitDomain
                        //     );
                        //
                        //     scope.loadData();
                        //
                        // });

                        scope.$on('globalClick', function (event, target) {

                            console.log(
                                'globalClick:tableView:event:',
                                event
                            );

                            console.log(
                                'globalClick:tableView:target:',
                                target
                            );

                            if (target.getAttribute('id') === 'grid-overlay-scroll-container') {

                                if (typeof scope.modalManager.action !== 'undefined') {

                                    scope.modalManager = {
                                        action: undefined
                                    };

                                    return;

                                }

                                // return;

                            }

                            if (!element[0].contains(target)) {

                                $timeout(function() {

                                    scope.$apply(function () {

                                        console.log(
                                            'globalClick:tableView:event:$apply'
                                        );

                                        if (typeof scope.tipManager.created !== 'undefined' ||
                                            typeof scope.tipManager.modified !== 'undefined') {

                                            console.log(
                                                'globalClick:tableView:event:$apply:closeTip',
                                                scope.tipManager
                                            );

                                            scope.tipManager = {};

                                        }

                                        if (typeof scope.modalManager.action !== 'undefined') {

                                            console.log(
                                                'globalClick:tableView:event:$apply:closeModal',
                                                scope.modalManager
                                            );

                                            scope.modalManager = {
                                                action: undefined
                                            };

                                        }

                                    });

                                });

                            }

                        });

                        scope.$on('resize:column', function (event, key,
                                                             width, nodeType) {

                            console.log(
                                'resize:column:tableView:event:',
                                event
                            );

                            console.log(
                                'resize:column:tableView:key:',
                                key
                            );

                            console.log(
                                'resize:column:tableView:width:',
                                width
                            );

                            console.log(
                                'resize:column:tableView:nodeType:',
                                nodeType
                            );

                            //
                            // Subscribing to ``$rootScope.$broadcast('resize:column', ...)``
                            // means that a particular table view instance may receive
                            // events that don't apply to it. Perform an identity check
                            // on the instance's ``nodeType`` to ensure proper data flow.
                            //

                            if (scope.nodeType.normalized_name === nodeType) {

                                scope.colWidths = TableLayoutUtil.colWidths[nodeType];

                            }

                        });

                        scope.$on('set:sortField',
                            function (
                                event,
                                field,
                                order) {

                                if (!field) return;

                                console.log(
                                    'set:sortField:event:',
                                    event
                                );

                                console.log(
                                    'set:sortField:field:',
                                    field
                                );

                                console.log(
                                    'set:sortField:order:',
                                    order
                                );

                                TableSort.sort(
                                    field,
                                    order,
                                    scope.nodeType,
                                    scope.frameRecords,
                                    scope.frameData);

                                scope.chunks = FrameDataService.chunkRecords(
                                    scope.summary,
                                    scope.frameRecords
                                );

                                scope.records = scope.chunks[0].records;

                                // scope.records = FrameDataService.chunkRecords(
                                //     scope.summary,
                                //     scope.frameRecords
                                // );

                                console.log(
                                    'tableView:set:sortField:',
                                    scope.records
                                );

                            }

                        );

                        scope.$on('set:filterToken',
                            function (
                                event,
                                config) {

                                console.log(
                                    'set:filterToken:event:',
                                    event
                                );

                                console.log(
                                    'set:filterToken:config:',
                                    config
                                );

                                if (!Array.isArray(scope.frameRecords)) return;

                                scope.frameRecords = TableFilter.filter(
                                    scope.nodeType.normalized_name,
                                    event,
                                    config,
                                    scope.recordSrc,
                                    scope.frameData
                                );

                                console.log(
                                    'set:filterToken:matches:',
                                    scope.frameRecords.length
                                );

                                AppConfig.records[scope.nodeType.id] = scope.frameRecords;

                                scope.summary = FrameDataService.updateRecordCount(
                                    scope.summary,
                                    scope.frameRecords.length
                                );

                                // scope.updateFeatureCount(scope.frameRecords.length);

                                scope.chunks = FrameDataService.chunkRecords(
                                    scope.summary,
                                    scope.frameRecords
                                );

                                // scope.records = FrameDataService.chunkRecords(
                                //     scope.summary,
                                //     scope.frameRecords
                                // );

                                scope.records = scope.chunks[0].records;

                                console.log(
                                    'tableView:set:filterToken:',
                                    scope.records
                                );

                            }

                        );

                    }

                };

            }

        ]);

}());