'use strict';

/**
 * @ngdoc function
 * @name
 * @description
 */
angular.module('OilGasWatch')
    .service('PermitSort',
        function (Utility) {

            var self = this;

            let mappings = {
                'permit4': {
                    'project': 'relation:6',
                    'date': 'date:4'
                },
                'permit12': {
                    'project': 'relation:30',
                    'date': 'date:13',
                },
                'permit16': {
                    'key': 'date:20',
                    'date': 'date:27',
                },
                'permit18': {
                    'project': 'relation:36',
                    'date': 'date:24'
                },
                'permit45': {},
                'permit48': {}
            };

            // let mappings = {
            //     'permit4': [
            //         {
            //             'key': 'relation:6',
            //             'label': 'Project name'
            //         },
            //         {
            //             'key': 'date:4',
            //             'label': 'Final issuance date'
            //         }
            //     ],
            //     'permit12': [
            //         {
            //             'key': 'relation:30',
            //             'label': 'Project name'
            //         },
            //         {
            //             'key': 'date:13',
            //             'label': 'Authorization date'
            //         }
            //     ],
            //     'permit16': [
            //         {
            //             'key': 'date:20',
            //             'label': 'Effective date'
            //         }
            //     ],
            //     'permit17': [
            //         {
            //             'key': 'date:27',
            //             'label': 'Effective date'
            //         }
            //     ],
            //     'permit18': [
            //         {
            //             'key': 'relation:36',
            //             'label': 'Project name'
            //         },
            //         {
            //             'key': 'date:24',
            //             'label': 'Issue date'
            //         }
            //     ],
            //     'permit45': [],
            //     'permit48': []
            // };

            return {

                getMappings: function (key) {

                    return mappings[key];

                },
                setKey: function (record, frameData, tableName) {

                    tableName = tableName.split('TwoCol')[0];

                    console.log(
                        'PermitSort.setKey:run:',
                        // record,
                        frameData,
                        tableName
                    );

                    let mappings = this.getMappings(tableName);

                    if (Utility.isObject(mappings) &&
                        frameData.hasOwnProperty(record.id)) {

                        let valueMap = frameData[record.id];

                        let tokens = [];

                        let properties = [
                            'project',
                            'date'
                        ];

                        properties.forEach(function (column) {

                            let value = valueMap[mappings[column]];

                            console.log(
                                'PermitSort.setKey:value:',
                                value
                            );

                            if (angular.isDefined(value)) {

                                if (column.startsWith('date')) {

                                    record.date = Date.parse(value[0]);

                                } else {

                                    record.project = value[0];

                                }

                            } else {

                                record.date = '';

                                record.project = '';

                            }

                        });

                        record.sortKey = tokens.join('.');

                        console.log(
                            'PermitSort.setKey:record:',
                            record
                        );

                    }

                },

            }

        });