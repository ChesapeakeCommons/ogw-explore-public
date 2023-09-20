(function() {

    'use strict';

    angular.module('OilGasWatch')
        .service('FrameManager', [
            'environment',
            '$rootScope',
            '$timeout',
            function(environment, $rootScope, $timeout) {

                var self = this;

                self.frame = undefined;

                return {
                    delete: function (datum, variable, node) {

                        var key = [
                            variable.type.split('_')[0],
                            ':',
                            variable.id
                        ].join('');

                        console.log(
                            'FrameManager.delete:key:',
                            key
                        );

                        var arr = self.frame[node.id][key];

                        console.log(
                            'FrameManager.delete:arr:',
                            arr
                        );

                        for (var i = 0; i < arr.length; i++) {

                            try {

                                if (arr[i] === datum.linked_node.name) {

                                    arr.splice(i, 1);

                                }

                                // if (arr[i].id === datum.id) {
                                //
                                //     arr.splice(i, 1);
                                //
                                // }

                            } catch (e) {

                                console.warn(
                                    'FrameManager.delete:error:',
                                    e
                                );

                            }

                        }

                        console.log(
                            'FrameManager:delete:frame:',
                            self.frame
                        );

                    },
                    getFrame: function () {

                        return self.frame;

                    },
                    setFrame: function (frame) {

                        self.frame = frame;

                    },
                    update: function (data, variable, node) {

                        if (!self.frame) return;

                        var key = [
                            data.type.split('_')[0],
                            ':',
                            data.variable_id
                        ].join('');

                        console.log(
                            'FrameManager:update:key:',
                            key
                        );

                        var branch = self.frame[node.id];

                        if (!branch) {

                            self.frame[node.id] = {};

                        }

                        var arr = self.frame[node.id][key];

                        if (!Array.isArray(arr)) {

                            self.frame[node.id][key] = [];

                        }

                        if (variable.type.startsWith('document')) {

                            data.name = data.document.name || data.document.file_name;
                            data.file_name = data.document.file_name;
                            data.url = data.document.url;

                        }

                        if (variable.type.startsWith('document') ||
                            variable.type.startsWith('relation')) {

                            // self.frame[node.id][key].unshift({
                            //     id: data.id,
                            //     name: data.name
                            // });

                            self.frame[node.id][key].unshift(data.name);

                        } else {

                            self.frame[node.id][key] = [
                                data.value
                            ];

                        }

                        console.log(
                            'FrameManager:update:frame:',
                            self.frame
                        );

                    },

                };

            }

        ]);

}());