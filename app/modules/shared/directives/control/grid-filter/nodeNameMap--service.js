'use strict';

/**
 * @ngdoc service
 * @name CommonsCloud.template
 * @description
 * # template
 * Provider in the Commons Cloud.
 */
angular.module('OilGasWatch')
    .service('NodeNameMap', [
        '$rootScope',
        '$location',
        '$timeout',
        'QueryParamManager',
        function($rootScope, $location, $timeout, QueryParamManager) {

            var self = this;

            self._index = undefined;

            return {
                getIndex: function () {

                    return self._index;

                },
                setIndex: function (data) {

                    self._index = data;

                },
                appendRecord: function (key, name) {

                    self._index[key].push(name);

                },
                removeRecord: function (key, name) {

                    var arr = self._index[key];

                    if (Array.isArray(arr)) {

                        var matchIdx;

                        for (var i = 0; i < arr.length; i++) {

                            if (arr[i] === name) {

                                matchIdx = i;

                                break;

                            }

                        }

                        if (Number.isInteger(matchIdx)) {

                            arr.splice(matchIdx, 1);

                        }

                    }

                    self._index[key] = arr;

                }
            };

        }]);