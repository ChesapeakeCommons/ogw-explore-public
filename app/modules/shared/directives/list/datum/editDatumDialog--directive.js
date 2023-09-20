(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('editDatumDialog', [
            'environment',
            '$routeParams',
            '$filter',
            '$parse',
            '$location',
            'Variable',
            'Datum',
            'Node',
            'SearchService',
            '$timeout',
            function(environment, $routeParams, $filter, $parse,
                     $location, Variable, Datum, Node,
                     SearchService, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        'alerts': '=?',
                        'node': '=?',
                        'postSave': '&',
                        'variables': '=?',
                        'visible': '=?'
                    },
                    templateUrl: function(elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'list/datum/list--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function(scope, element, attrs) {

                        scope.target = undefined;

                        if (typeof scope.resetType === 'undefined') {

                            scope.resetType = true;

                        }

                        function closeAlerts() {

                            scope.alerts = [];

                        }

                        scope.closeChildModal = function() {

                            scope.target = undefined;

                            // scope.visible = false;

                            // if (scope.resetType && scope.type !== 'project') scope.type = undefined;

                        };

                        scope.saveValue = function() {

                            if (scope.target.type === 'date') {

                                if (Array.isArray(scope.target.value)) {

                                    scope.target.value = scope.target.value.join('-');

                                }

                            }

                            var data = {
                                'value': scope.target.value,
                                'type': scope.target.type,
                                'node_id': scope.node.id,
                                'variable_id': scope.target.id
                            };

                            if (scope.target.type === 'relation') {

                                data.origin_node_id = scope.node.id;

                                data.target_node_id = scope.target.target_node_id;

                            }

                            var newFeature = new Datum(data);

                            newFeature.$save(function(successResponse) {

                                scope.alerts = [{
                                    'type': 'success',
                                    'flag': 'Success!',
                                    'msg': 'Value saved.',
                                    'prompt': 'OK'
                                }];

                                $timeout(closeAlerts, 2000);

                                scope.closeChildModal();

                                if (scope.postSave) {

                                    scope.postSave({});

                                }

                                // var nextPath = [
                                //     '/variables/',
                                //     successResponse.id,
                                //     '/edit'
                                // ].join('');
                                //
                                // $location.path(nextPath);

                            }, function(errorResponse) {

                                scope.alerts = [{
                                    'type': 'error',
                                    'flag': 'Error!',
                                    'msg': 'Something went wrong while saving this value.',
                                    'prompt': 'OK'
                                }];

                                $timeout(closeAlerts, 2000);

                            });

                        };

                        scope.searchRelatedNodes = function(value) {

                            var params = {
                                q: value,
                                type: scope.target.target_type
                            }

                            return Node.collection(
                                params
                            ).$promise.then(function(response) {

                                console.log('SearchService.program response', response);

                                // response.results.forEach(function(result) {
                                //
                                //     result.category = null;
                                //
                                // });

                                return response.features.slice(0, 3);

                            });

                        };

                        scope.setRelationId = function(item, model, label) {

                            scope.target.target_node_id = item.id;

                        };

                        scope.setTarget = function(target) {

                            console.log(
                                'editDatumDialog:setTarget:',
                                target);

                            scope.target = JSON.parse(JSON.stringify(target));

                        };

                        scope.setType = function(type) {

                            scope.varType = type;

                        };

                        scope.$watch('type', function (newVal) {

                            if (typeof newVal === 'string') {

                                scope.label = newVal.replace(/_/g, ' ');

                            }

                        });

                    }

                };

            }

        ]);

}());