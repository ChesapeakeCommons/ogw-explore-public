(function () {

    'use strict';

    angular.module('OilGasWatch')
        .directive('exportTableDialog', [
            'environment',
            '$routeParams',
            '$filter',
            '$parse',
            '$location',
            'Export',
            '$timeout',
            'Utility',
            'ExportConfig',
            function (environment, $routeParams, $filter,
                      $parse, $location, Export, $timeout,
                      Utility, ExportConfig) {
                return {
                    restrict: 'EA',
                    scope: {
                        'activeRows': '=?',
                        'alerts': '=?',
                        'columns': '=?',
                        'filteredRows': '=?',
                        'frame': '=?',
                        'mapping': '@',
                        'recordSrc': '=?',
                        'table': '=?',
                        'visible': '=?'
                    },
                    templateUrl: function (elem, attrs) {

                        return [
                            // Base path
                            'modules/shared/directives/',
                            // Directive path
                            'dialog/export/exportDialog--view.html',
                            // Query string
                            '?t=' + environment.version
                        ].join('');

                    },
                    link: function (scope, element, attrs) {

                        if (!angular.isDefined(scope.modalDisplay)) {

                            scope.modalDisplay = {};

                        }

                        scope.domainSelector = 'all';

                        scope.fileFormat = 'csv';

                        scope.activeRadio = {
                            csv: true
                        };

                        scope.toggleModal = function (key) {

                            var visible = scope.modalDisplay[key];

                            scope.modalDisplay[key] = !visible;

                        };

                        scope.forceClose = function (event) {

                            var target = event.target;

                            var className = target.className;

                            if (className.indexOf('creation-dialog-container') >= 0) {

                                scope.toggleModal('dialog');

                            }

                        };

                        scope.extractValue = function (column, record, frame, toString) {

                            // console.log(
                            //     'exportTableDialog:update:key:',
                            //     column.key
                            // );

                            toString = (typeof toString === 'boolean') ? toString : true;

                            try {

                                var arr = frame[record.id][column.key];

                                if (!Array.isArray(arr) ||
                                    !arr.length) {

                                    return null;

                                }

                            } catch (e) {

                                return null;

                            }

                            if (column.key.startsWith('location')) {

                                try {

                                    arr = arr[0].value.coordinates;

                                } catch (e) {

                                }

                            }

                            if (toString) {

                                try {

                                    return arr.join(', ');

                                } catch (e) {

                                    return '';

                                }

                            }

                            return arr;

                        };

                        scope.composeRow = function (columns, record, frame) {

                            if (!frame) return;

                            var row = {};

                            // var primaryLabel = scope.table.name + ' Name';
                            //
                            // row[primaryLabel] = record.name;

                            columns.forEach(function (column) {

                                var rawLabel = column.label || column.name;

                                if (column.key.startsWith('relation')) {

                                    var linkages = scope.extractValue(
                                        column,
                                        record,
                                        frame,
                                        false
                                    );

                                    // if (Array.isArray(linkages)) {
                                    //
                                    //     let transforms = [];
                                    //
                                    //     linkages.forEach(function (edge) {
                                    //
                                    //         transforms.push(
                                    //             $filter('splitLast')(edge, '[')
                                    //         );
                                    //
                                    //     });
                                    //
                                    //     linkages = transforms;
                                    //
                                    // }

                                    console.log(
                                        'exportTableDialog.composeRow:linkages:',
                                        linkages
                                    );

                                    var mappings = Utility.linkedKeys(linkages, true);

                                    var keys = Utility.valuesFromArray(mappings, 'key');

                                    if (Array.isArray(keys)) {

                                        let transforms = [];

                                        keys.forEach(function (item) {

                                            transforms.push(
                                                +item
                                            );

                                        });

                                        keys = Utility.sortCollection(transforms);

                                    }

                                    console.log(
                                        'exportTableDialog.composeRow:keys:',
                                        keys.join(', ')
                                    );

                                    if (keys.length &&
                                        rawLabel === 'Facility' &&
                                        (scope.table.normalized_name === 'project' ||
                                            scope.table.normalized_name.indexOf('permit') > -1)) {

                                        let urlLabel = 'Oil and Gas Watch Facility URL';

                                        let urls = [];

                                        keys.forEach(function (item) {

                                            urls.push([
                                                'https://oilandgaswatch.org/facility/',
                                                item
                                            ].join(''));

                                        })

                                        row[urlLabel] = urls.join(', ');

                                    }

                                    var names = Utility.valuesFromArray(mappings, 'name');

                                    if (Array.isArray(names)) {

                                        let transforms = [];

                                        names.forEach(function (item) {

                                            transforms.push(
                                                $filter('splitLast')(item, '[')
                                            );

                                        });

                                        names = Utility.sortCollection(transforms);

                                    }

                                    console.log(
                                        'exportTableDialog.composeRow:names:',
                                        names.join(', ')
                                    );

                                    var extendedLabel = column.label + ' ID';

                                    row[rawLabel] = (
                                        Array.isArray(names) ? names.join(', ') : names
                                    );

                                    row[extendedLabel] = keys.join(', ');

                                } else if (column.key === 'name') {

                                    row[rawLabel] = record.name;

                                    if (scope.table.normalized_name === 'pipelines') {

                                        var urlLabel = 'Oil and Gas Watch URL';

                                        row[urlLabel] = [
                                            'https://oilandgaswatch.org/pipeline/',
                                            record.id
                                        ].join('');

                                    }

                                } else {

                                    row[rawLabel] = scope.extractValue(
                                        column,
                                        record,
                                        frame
                                    );

                                }

                            });

                            return row;

                        };

                        scope.assemble = function () {

                            var arr = [];

                            let columns = ExportConfig.getMappings(
                                scope.mapping
                            );

                            if (Array.isArray(columns)) {

                                scope.domain.forEach(function (record) {

                                    arr.push(scope.composeRow(
                                        columns,
                                        record,
                                        scope.frame
                                    ));

                                });

                            }

                            return arr;

                        };

                        scope.createExport = function (format) {

                            var date = new Date();

                            var dateSegment = $filter('date')(date, 'yyyy-MM-dd');

                            var fileName = [
                                scope.table.normalized_name,
                                dateSegment,
                                format
                            ].join('.');

                            var data = scope.assemble();

                            var csv = Papa.unparse(data);

                            var blob = new Blob(
                                [csv],
                                {
                                    type: 'text/csv;charset=utf-8;'
                                }
                            );

                            if (window.navigator.msSaveBlob) {

                                window.navigator.msSaveBlob(blob, fileName);

                            } else {

                                var url = window.URL.createObjectURL(blob);
                                var tmpLink = document.createElement('a');
                                tmpLink.setAttribute('href', url);
                                tmpLink.setAttribute('download', fileName);
                                tmpLink.style.visibility = 'hidden';
                                document.body.appendChild(tmpLink);
                                tmpLink.click();
                                document.body.removeChild(tmpLink);

                            }

                        };

                        scope.setFormat = function (format) {

                            console.log(
                                'exportDialog:fileFormat:',
                                scope.fileFormat
                            );

                            scope.fileFormat = format;

                            scope.activeRadio = {};

                            scope.activeRadio[format] = true;

                            console.log(
                                'exportDialog:fileFormat[2]:',
                                scope.fileFormat
                            );

                        };

                        scope.setDomain = function (domain) {

                            scope.domainSelector = domain;

                            console.log(
                                'exportDialog.setDomain:domainSelector:',
                                scope.domainSelector
                            );

                            switch (domain) {

                                case 'all':

                                    scope.domain = scope.recordSrc;

                                    break;

                                case 'filtered':

                                    scope.domain = scope.filteredRows;

                                    break;

                                case 'page':

                                    scope.domain = scope.activeRows;

                                    break;

                                default:

                                    scope.domain = scope.recordSrc;

                                    break;

                            }

                            console.log(
                                'exportDialog.setDomain:domain:',
                                scope.domain
                            );

                        };

                        scope.$watch('activeRows', function (newVal) {

                            if (Array.isArray(newVal)) {

                                scope.setDomain(scope.domainSelector);

                            }

                        });

                        scope.$watch('filteredRows', function (newVal) {

                            if (Array.isArray(newVal)) {

                                scope.setDomain(scope.domainSelector);

                            }

                        });

                        scope.$watch('recordSrc', function (newVal) {

                            if (Array.isArray(newVal)) {

                                scope.setDomain(scope.domainSelector);

                            }

                        });

                    }

                };

            }

        ]);

}());