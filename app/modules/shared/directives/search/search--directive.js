(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('globalSearch', [
            '$window',
            '$location',
            '$filter',
            '$http',
            'SearchService',
            'LocationStore',
            'FilterStore',
            'AppConfig',
            'Node',
            'Variable',
            'StateIndex',
            function($window, $location, $filter, $http, SearchService,
                     LocationStore, FilterStore, AppConfig, Node,
                     Variable, StateIndex) {
                return {
                    restrict: 'EA',
                    // scope: {
                    //     filterLocations: '&'
                    // },
                    link: function(scope, element, attrs) {

                        scope.query = undefined;

                        // The user triggered a selection action

                        scope.routeTo = function(item, model, label) {

                            console.log(
                                'globalSearch:',
                                item,
                                model,
                                label
                            );

                            var typeId = item.type.id,
                                path;

                            switch (typeId) {

                                case 1:

                                    path = 'facility/' + item.id;

                                    break;

                                case 9:

                                    path = 'pipeline/' + item.id;

                                    break;

                                case 'state':

                                    path = 'state/' + item.id;

                                    break;

                                default:

                                    path = '/';

                                    break;

                            }

                            scope.query = undefined;

                            $location.path(path).search({});

                        };

                        // scope.routeTo = function(item, model, label) {
                        //
                        //     var featureType = item.category,
                        //         varType,
                        //         path;
                        //
                        //     console.log(
                        //         'SearchResult:featureType:',
                        //         featureType
                        //     );
                        //
                        //     if (featureType.indexOf('variable') >= 0) {
                        //
                        //         var tokens = featureType.split(' ');
                        //
                        //         varType = tokens[0];
                        //
                        //         featureType = tokens[1];
                        //
                        //     }
                        //
                        //     switch (featureType) {
                        //
                        //         case 'geography':
                        //
                        //             path = 'geographies/' + item.id;
                        //
                        //             break;
                        //
                        //         case 'metric type':
                        //
                        //             path = 'metric-types/' + item.id + '/edit';
                        //
                        //             break;
                        //
                        //         case 'practice type':
                        //
                        //             path = 'practice-types/' + item.id + '/edit';
                        //
                        //             break;
                        //
                        //         case 'tag':
                        //
                        //             path = 'tags/' + item.id + '/edit';
                        //
                        //             break;
                        //
                        //         case 'variable':
                        //
                        //             path = 'variables';
                        //
                        //             break;
                        //
                        //         default:
                        //
                        //             path = 'collections/' + featureType;
                        //
                        //             break;
                        //
                        //     }
                        //
                        //     var params = {
                        //         rec: item.id
                        //     };
                        //
                        //     if (typeof varType === 'string') {
                        //
                        //         params.collection = item.subcategory;
                        //
                        //         params.type = varType;
                        //
                        //     }
                        //
                        //     scope.query = undefined;
                        //
                        //     $location.path(path).search(params);
                        //
                        //     var url = $location.url();
                        //
                        //     if (url.indexOf(featureType.toLowerCase()) >= 0) {
                        //
                        //         AppConfig.targetRecord = item;
                        //
                        //     }
                        //
                        // };

                        // Populate a list of possible matches based on the search string

                        // scope.fetchSuggestions = function(a, scope_) {
                        //
                        //     var params = {
                        //         q: a
                        //     };
                        //
                        //     if (typeof scope_ === 'string' &&
                        //         scope_.length > 0) {
                        //
                        //         params.scope = scope_;
                        //
                        //     }
                        //
                        //     return SearchService.get(params).$promise.then(function(response) {
                        //
                        //         console.log(response);
                        //
                        //         return response.results.slice(0,5);
                        //
                        //     });
                        //
                        // };

                        scope.setFilter = function($item, $model, $label) {

                            scope.query = undefined;

                            FilterStore.addItem($item);

                            console.log('FilterStore.index', FilterStore.index);

                        };

                        scope.loadStates = function() {

                            var arr = [];

                            for (var key in StateIndex.codes) {

                                if (StateIndex.codes.hasOwnProperty(key)) {

                                    arr.push({
                                        id: key,
                                        name: StateIndex.codes[key],
                                        type: {
                                            id: 'state',
                                            name: 'State'
                                        }
                                    });

                                }

                            }

                            scope.records = arr;

                        };

                        scope.loadRecords = function() {

                            Node.shallowList({
                                record_type: '1,9'
                            }).$promise.then(function (successResponse) {

                                console.log(
                                    'globalSearch:loadRecords:successResponse',
                                    successResponse);

                                scope.records = scope.records.concat(successResponse.records);

                            }, function (errorResponse) {

                                console.log(
                                    'globalSearch:loadRecords:errorResponse',
                                    errorResponse);

                            });

                        };

                        scope.loadStates();

                        scope.loadRecords();

                    }

                };
            }
        ]);

}());