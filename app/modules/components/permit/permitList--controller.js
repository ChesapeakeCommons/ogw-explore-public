'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:PipelineviewController
 * @description
 * # PipelineviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('PermitListController',
        function(Account, Notifications, $rootScope, $route, $routeParams,
                 $scope, $location, $window, $timeout, Utility,
                 $interval, LayerService, MapManager, Node,
                 QueryParamManager, PipelineIndex, FrameDataService) {

            var self = this;

            $rootScope.viewState = {
                'permit': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            $rootScope.page = {
                title: 'Pipelines'
            };

//             Administrative Amendment - enum:43
//             Permit Status
// •    Application Pending (green)
// •    Draft Issued (orange)
// •    Expired (red)
// •    DO NOT INCLUDE: Withdrawn, Final issued - enum:7

            // enum:7|not_in|Withdrawn::Final issued+enum:43|not_in|Administrative Amendment
            // enum:43|not_in|Administrative Amendment

            var params = $location.search();

            params.sort = 'text:1:asc';

            // if (!params.filters) {
            //
            //     params.filters = [
            //         'ZW51bTo3fGFueXxBcHBsaWNhdGlvbiUyMFBlbmRpbmclM0ElM0',
            //         'FEcmFmdCUyMElzc3VlZCUzQSUzQUV4cGlyZWR8QU5EK2VudW06',
            //         'NDN8bm90X2lufEFkbWluaXN0cmF0aXZlJTIwQW1lbmRtZW50'
            //     ].join('')
            //
            // }

            $location.search(params);

            self.recordTypeIdx = FrameDataService.indexNodeTypes();

            self.categories = [
                self.recordTypeIdx.composite[3],
                self.recordTypeIdx.composite[4],
                self.recordTypeIdx.composite[5],
                self.recordTypeIdx.composite[6],
                self.recordTypeIdx.composite[7],
                self.recordTypeIdx.composite[9],
            ];

            console.log(
                'PermitListController:categories:',
                self.categories
            );

            self.category = self.categories[0];

            self.activeCategory = JSON.parse(JSON.stringify(self.category));

            console.log(
                'PermitListController:category:',
                self.category
            );

            self.setCategory = function (selection) {

                console.log(
                    'PermitListController.setCategory:selection:',
                    selection
                );

                self.category = selection;

                self.activeCategory = JSON.parse(JSON.stringify(self.category));

            };

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.showElements = function(createMap) {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

                    // $timeout(function() {
                    //
                    //     var container = document.querySelector('.main--ui');
                    //
                    //     container.style.height = window.innerHeight + 'px';
                    //
                    // }, 100);

                }, 50);

            };

            self.loadPipelineIndex = function() {

                PipelineIndex.get().$promise.then(function(successResponse) {

                    console.log(
                        'loadPipelineIndex:successResponse:',
                        successResponse
                    );

                    self.projectCollection = successResponse.features;

                    //
                    // Set default query string params.
                    //

                    self.extractQueryParams();

                    self.showElements(true);

                }, function(errorResponse) {

                    console.warn(
                        'loadPipelineIndex:errorResponse:',
                        errorResponse
                    );

                    self.showElements(true);

                });

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

            self.loadPipelineIndex();

        });