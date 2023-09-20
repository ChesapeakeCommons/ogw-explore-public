'use strict';

angular.module('StorageService', [])
    .factory('StorageService', ['$window',
        function($window) {

            var StorageService = {};

            StorageService.find = function(a) {

                if ($window.localStorage) {

                    return $window.localStorage.getItem(a);

                }

            };

            StorageService.create = function(a, b) {

                if ($window.localStorage) {

                    return $window.localStorage.setItem(a, b);

                }

            };

            StorageService.destroy = function(a) {

                if ($window.localStorage) {

                    return $window.localStorage.removeItem(a);

                }

            };

            StorageService.keys = function() {

                if ($window.localStorage) {

                    var keys = [];

                    for (var key in $window.localStorage) {

                        keys.push(key);

                    }

                    return keys;

                }

            };

            return StorageService;
        }

    ]);