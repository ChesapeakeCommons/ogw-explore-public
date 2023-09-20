'use strict';

/**
 * @ngdoc function
 * @name
 * @description
 */
angular.module('OilGasWatch')
    .service('ExportConfig',
        function () {

            var self = this;

            let mappings = {
                'pipeline': [
                    {
                        'key': 'relation:32',
                        'label': 'Company'
                    },
                    {
                        'key': 'name',
                        'label': 'Pipeline Project Name'
                    },
                    {
                        'key': 'relation:7',
                        'label': 'Associated Facilities'
                    },
                    {
                        'key': 'enum:15',
                        'label': 'Project Type'
                    },
                    {
                        'key': 'float:38',
                        'label': 'Additional Capacity'
                    },
                    {
                        'key': 'enum:48',
                        'label': 'Product Units'
                    },
                    {
                        'key': 'enum:36',
                        'label': 'Product Type'
                    },
                    {
                        'key': 'enum:35',
                        'label': 'Operating Status'
                    },
                    {
                        'key': 'float:37',
                        'label': 'Miles'
                    },
                    {
                        'key': 'enum:52',
                        'label': 'Affected States'
                    }
                ],
                'project': [
                    {
                        'key': 'location:7',
                        'label': 'Coordinates'
                    },
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'text:39',
                        'label': 'County or Parish'
                    },
                    {
                        'key': 'relation:1',
                        'label': 'Company'
                    },
                    {
                        'key': 'relation:5',
                        'label': 'Facility'
                    },
                    {
                        'key': 'name',
                        'label': 'Project'
                    },
                    {
                        'key': 'enum:10',
                        'label': 'Type'
                    },
                    {
                        'key': 'enum:9',
                        'label': 'Status'
                    },
                    {
                        'key': 'enum:11',
                        'label': 'Sector'
                    },
                    {
                        'key': 'float:15',
                        'label': 'Potential CO2e (tons/year)'
                    },
                    {
                        'key': 'integer:2',
                        'label': 'Estimated population - 3 miles'
                    },
                    {
                        'key': 'float:27',
                        'label': 'Percent people of color - 3 miles'
                    },
                    {
                        'key': 'float:26',
                        'label': 'Percent low income - 3 miles'
                    },
                ],
                // permits
                'permit4': [
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'relation:5',
                        'label': 'Facility'
                    },
                    {
                        'key': 'relation:6',
                        'label': 'Project name'
                    },
                    {
                        'key': 'enum:10',
                        'label': 'Project type'
                    },
                    {
                        'key': 'enum:9',
                        'label': 'Operating status'
                    },
                    {
                        'key': 'name',
                        'label': 'Permit number'
                    },
                    {
                        'key': 'enum:7',
                        'label': 'Permit status'
                    },
                    {
                        'key': 'date:31',
                        'label': 'Application date'
                    },
                    {
                        'key': 'date:34',
                        'label': 'Draft issuance date'
                    },
                    {
                        'key': 'date:4',
                        'label': 'Final issuance date'
                    },
                    {
                        'key': 'date:5',
                        'label': 'Deadline to begin construction'
                    }
                ],
                'permit12': [
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'relation:5',
                        'label': 'Facility'
                    },
                    {
                        'key': 'relation:29',
                        'label': 'Pipeline'
                    },
                    {
                        'key': 'relation:30',
                        'label': 'Project name'
                    },
                    {
                        'key': 'name',
                        'label': 'Permit number'
                    },
                    {
                        'key': 'enum:29',
                        'label': 'Permit status'
                    },
                    {
                        'key': 'date:13',
                        'label': 'Authorization date'
                    }

                ],
                'permit16': [
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'relation:34',
                        'label': 'Facility'
                    },
                    {
                        'key': 'name',
                        'label': 'Permit number'
                    },
                    {
                        'key': 'enum:39',
                        'label': 'Permit status'
                    },
                    {
                        'key': 'date:26',
                        'label': 'Application date'
                    },
                    {
                        'key': 'date:20',
                        'label': 'Effective date'
                    },
                    {
                        'key': 'date:42',
                        'label': 'Draft issuance date'
                    },
                    {
                        'key': 'date:21',
                        'label': 'Expiration date'
                    }
                ],
                'permit17': [
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'relation:41',
                        'label': 'Facility'
                    },
                    {
                        'key': 'name',
                        'label': 'Permit number'
                    },
                    {
                        'key': 'enum:40',
                        'label': 'Permit type'
                    },
                    {
                        'key': 'enum:49',
                        'label': 'Permit status'
                    },
                    {
                        'key': 'date:23',
                        'label': 'Application date'
                    },
                    {
                        'key': 'date:27',
                        'label': 'Effective date'
                    }
                ],
                'permit18': [
                    {
                        'key': 'text:1',
                        'label': 'State'
                    },
                    {
                        'key': 'relation:37',
                        'label': 'Facility'
                    },
                    {
                        'key': 'name',
                        'label': 'Permit number'
                    },
                    {
                        'key': 'enum:42',
                        'label': 'Permit status'
                    },
                    {
                        'key': 'enum:44',
                        'label': 'Permit action'
                    },
                    {
                        'key': 'date:33',
                        'label': 'Application date'
                    },
                    {
                        'key': 'date:24',
                        'label': 'Issue date'
                    },
                    {
                        'key': 'date:36',
                        'label': 'Draft issuance date'
                    },
                    {
                        'key': 'date:25',
                        'label': 'Expiration date'
                    }
                ]
            };

            return {

                getMappings: function (key) {

                    return mappings[key];

                }

            }

        });