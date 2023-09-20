(function() {

    'use strict';

    angular.module('OilGasWatch')
        .service('TableBuilder', [
            'environment',
            '$rootScope',
            '$timeout',
            'TableSettingManager',
            'Utility',
            function(environment, $rootScope, $timeout,
                     TableSettingManager, Utility) {

                var self = this;

                return {
                    assemble: function (columns, records) {

                        var selector = '#grid .table-view';

                        var container = document.querySelector(selector);

                        var table = document.createElement('table');

                        var tHead = table.createTHead();

                    },
                    addColumns: function (head, columns, colWidths) {

                        var row = head.insertRow();



                    },
                    addStandardColumn: function (row, options) {

                        var cell = document.createElement('th');



                    },
                //         <th scope="col"
                //     id="name-header"
                //     style="width: {{ ::colWidths['name'] }}; height: 36px;"
                //     class="pad-50p"
                //     title="Name"
                //     data-filter-key="name"
                //     data-sort-type="text">
                //         <div style="width: {{ ::colWidths['name'] }}; overflow: hidden; white-space: nowrap; text-overflow:
                //     ellipsis; padding-left: 88px;">
                // <div style="max-width: 20rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                //     <strong>Name</strong>
                //     </div>
                //     </div>
                //     <div class="col-resizer" data-col-target="name" style="position: absolute; top: 0; right: 0;
                // width: 4px; height: 36px; background: #BDBDBD; z-index:2147483647;
                // cursor: col-resize;"></div>
                // </th>
                };

            }

        ]);

}());