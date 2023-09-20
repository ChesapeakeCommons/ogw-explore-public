'use strict';

/**
 * @ngdoc service
 * @name CommonsCloud.template
 * @description
 * # template
 * Provider in the Commons Cloud.
 */
angular.module('OilGasWatch')
    .service('TableSettingManager', [
        '$rootScope',
        '$location',
        '$timeout',
        'TableSettingInterface',
        'StorageService',
        'AppConfig',
        function($rootScope, $location, $timeout, TableSettingInterface,
                 StorageService, AppConfig) {

            var self = this;

            return {
                getSettings: function (key, nodeType) {

                    var compositeKey = [
                        key,
                        nodeType
                    ].join('.');

                    return JSON.parse(
                        StorageService.find(
                            compositeKey
                        )
                    );

                },
                storeSettings: function (key, nodeType, data, attr) {

                    var compositeKey = [
                        key,
                        nodeType
                    ].join('.');

                    var value = (typeof attr === 'string') ? data[attr] : data;

                    if (typeof value === 'undefined') value = null;

                    StorageService.create(
                        compositeKey,
                        JSON.stringify(value)
                    );

                },
                saveSettings: function (nodeType, key, storageKey, data) {

                    // console.log(
                    //     'TableSettingManager:saveSettings:nodeType:',
                    //     nodeType
                    // );
                    //
                    // console.log(
                    //     'TableSettingManager:saveSettings:key:',
                    //     key
                    // );
                    //
                    // console.log(
                    //     'TableSettingManager:saveSettings:storageKey:',
                    //     storageKey
                    // );
                    //
                    // console.log(
                    //     'TableSettingManager:saveSettings:data:',
                    //     data
                    // );
                    //
                    // if (!nodeType) return;
                    //
                    // var mod = this;
                    //
                    // if (Array.isArray($rootScope.user.table_settings)) {
                    //
                    //     $rootScope.user.table_settings.forEach(function (feature) {
                    //
                    //         if (feature.node_type_id === nodeType.id) {
                    //
                    //             var match = feature;
                    //
                    //             match[key] = data;
                    //
                    //             data = match;
                    //
                    //         }
                    //
                    //     });
                    //
                    // }
                    //
                    // var requestData;
                    //
                    // if (data && data.hasOwnProperty('node_type_id')) {
                    //
                    //     requestData = JSON.parse(JSON.stringify(data));
                    //
                    //     delete requestData.node_type;
                    //
                    //     TableSettingInterface.update({
                    //         id: data.id
                    //     }, requestData).$promise.then(function (successResponse) {
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:successResponse:',
                    //             successResponse
                    //         );
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:value:',
                    //             successResponse[key]
                    //         );
                    //
                    //         mod.storeSettings(
                    //             storageKey,
                    //             nodeType.normalized_name,
                    //             successResponse,
                    //             key
                    //         );
                    //
                    //     }, function (errorResponse) {
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:errorResponse:',
                    //             errorResponse
                    //         );
                    //
                    //     });
                    //
                    // } else {
                    //
                    //     requestData = {
                    //         node_type_id: nodeType.id
                    //     };
                    //
                    //     requestData[key] = data;
                    //
                    //     var newFeature = new TableSettingInterface(requestData);
                    //
                    //     newFeature.$save(function(successResponse) {
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:successResponse:',
                    //             successResponse
                    //         );
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:value:',
                    //             successResponse[key]
                    //         );
                    //
                    //         $rootScope.user.table_settings.push(successResponse);
                    //
                    //         mod.storeSettings(
                    //             storageKey,
                    //             nodeType.normalized_name,
                    //             successResponse,
                    //             key
                    //         );
                    //
                    //     }, function(errorResponse) {
                    //
                    //         console.log(
                    //             'TableSettingManager:saveSettings:errorResponse:',
                    //             errorResponse
                    //         );
                    //
                    //     });
                    //
                    // }

                },
                updateSettings: function (settings, key, data) {



                },
                updateColumnWidth: function (nodeType, config) {

                    console.log(
                        'TableSettingManager:updateColumnWidth:nodeType:',
                        nodeType
                    );

                    console.log(
                        'TableSettingManager:updateColumnWidth:config:',
                        config
                    );

                    this.saveSettings(
                        nodeType,
                        'column_widths',
                        'colWidths',
                        config);

                },
                updateFilterToken: function (nodeType, token) {

                    console.log(
                        'TableSettingManager:updateFilterToken:nodeType:',
                        nodeType
                    );

                    console.log(
                        'TableSettingManager:updateFilterToken:token:',
                        token
                    );

                    if (typeof token === 'undefined') token = null;

                    this.saveSettings(
                        nodeType,
                        'current_filter_token',
                        'filterToken',
                        token);

                },
                updateSortToken: function (nodeType, token) {

                    console.log(
                        'TableSettingManager:updateSortToken:nodeType:',
                        nodeType
                    );

                    console.log(
                        'TableSettingManager:updateSortToken:token:',
                        token
                    );

                    this.saveSettings(
                        nodeType,
                        'current_sort_token',
                        'sortToken',
                        token);

                }
            };

        }]);