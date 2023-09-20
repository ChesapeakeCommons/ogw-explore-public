(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name
     * @description
     */
    angular.module('OilGasWatch')
        .controller('GlossaryController', [
            'Account',
            'Notifications',
            '$rootScope',
            'Frame',
            'FrameDataService',
            'Utility',
            function(Account, Notifications, $rootScope,
                     Frame, FrameDataService, Utility) {

                var self = this;

                $rootScope.viewState = {
                    'glossary': true
                };

                $rootScope.page = {
                    title: 'Glossary'
                };

                self.recordTypeIdx = FrameDataService.indexNodeTypes();

                self.nodeType = self.recordTypeIdx[19];

                self.groupIdx = {
                    'misc': []
                };

                self.loading = true;

                self.extractGroups = function() {

                    let groups = [];

                    for (var key in self.frameData) {

                        if (self.frameData.hasOwnProperty(key)) {

                            let value = self.frameData[key];

                            let group = value['enum:59'];

                            if (Array.isArray(group) &&
                                groups.indexOf(group[0]) < 0) {

                                groups.push(value['enum:59'][0]);
                                
                            }

                        }

                    }

                    console.log(
                        'GlossaryController.extractGroups:groups:',
                        groups.sort()
                    );

                    self.groups = groups.sort();

                    self.groups.forEach(function (group) {
                        self.groupIdx[group] = [];
                    });

                };

                self.groupRecords = function() {

                    Utility.sortCollection(
                        self.frameRecords,
                        'name'
                    );

                    self.frameRecords.forEach(function (record) {
                        let datum = {
                            label: record.name
                        };
                        let values = self.frameData[record.id];
                        if (Utility.isObject(values)) {

                            let group = values['enum:59'];
                            if (Array.isArray(group)) {

                                datum['group'] = group[0];

                            }

                            let def = values['text:137'];
                            if (Array.isArray(def)) {

                                datum['def'] = def[0];

                            }

                            if (datum.group) {

                                self.groupIdx[datum.group].push(datum);

                            } else {

                                self.groupIdx['misc'].push(datum);

                            }

                        }
                    });

                    console.log(
                        'GlossaryController.groupRecords:groupIdx:',
                        self.groupIdx
                    );

                };

                self.loadFrame = function() {

                    FrameDataService.loadFrame(
                        Frame,
                        self.nodeType,
                        undefined,
                        function (data) {
                            console.log(
                                'GlossaryController.loadFrame:data:',
                                data
                            );
                            self.frameData = data;
                            self.extractGroups();
                            self.groupRecords();
                            self.loading = false;
                        }
                    );

                };

                FrameDataService.loadRecords(
                    Frame,
                    self.nodeType,
                    undefined,
                    function (data) {
                        console.log(
                            'GlossaryController.loadRecords:data:',
                            data
                        );
                        self.frameRecords = data;
                        self.loadFrame();
                    }
                );

            }

        ]);

}());