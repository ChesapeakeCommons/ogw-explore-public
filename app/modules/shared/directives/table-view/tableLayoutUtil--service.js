(function() {

    'use strict';

    angular.module('OilGasWatch')
        .service('TableLayoutUtil', [
            'environment',
            '$rootScope',
            '$timeout',
            'TableSettingManager',
            'Utility',
            function(environment, $rootScope, $timeout,
                     TableSettingManager, Utility) {

                var self = this;

                var BOTTOM_OFFSET = 48;

                return {
                    colWidths: {},
                    addColResizeListeners: function (nodeType) {

                        console.log(
                            'TableLayoutUtil.addColResizeListeners:nodeType:',
                            nodeType
                        );

                        var mod = this;

                        console.log(
                            'TableLayoutUtil.addColResizeListeners:colWidths:',
                            mod.colWidths
                        );

                        var selector = [
                            '[data-record-type-key=\"' + nodeType.id + '\"]',
                            '.col-resizer'
                        ].join(' ');

                        console.log(
                            'TableLayoutUtil.addColResizeListeners:selector:',
                            selector
                        );

                        var colResizers = document.querySelectorAll(selector);

                        console.log(
                            'TableLayoutUtil.addColResizeListeners:colResizers:',
                            colResizers
                        );

                        for (var i = 0; i < colResizers.length; i++) {

                            var el = colResizers[i];

                            this.createResizableColumn(el, nodeType);

                        }

                    },
                    createResizableColumn: function (el, nodeType) {

                        var mod = this;

                        var pageX,
                            key,
                            baseWidth,
                            width,
                            target;

                        var mouseMoveHandler = function(e) {

                            if (!pageX || !target) return;

                            $timeout(function () {

                                //
                                // Calculate change in mouse position.
                                //

                                var deltaX = e.pageX - pageX;

                                console.log(
                                    'TableLayoutUtil.createResizableColumn:deltaX:',
                                    nodeType.normalized_name,
                                    deltaX
                                );

                                if (Utility.isNumber(width)) {

                                    width = baseWidth + deltaX;

                                    if (width < 50) width = 50;

                                    mod.colWidths[nodeType.normalized_name][key] = width + 'px';

                                    $rootScope.$broadcast(
                                        'resize:column',
                                        key,
                                        width,
                                        nodeType.normalized_name
                                    );

                                    // $timeout(function () {
                                    //
                                    //     TableSettingManager.updateColumnWidth(
                                    //         nodeType,
                                    //         mod.colWidths[nodeType.normalized_name]
                                    //     );
                                    //
                                    // }, 250);

                                }

                            }, 0);

                        };

                        var mouseUpHandler = function() {

                            console.log(
                                'TableLayoutUtil.createResizableColumn:colWidths:',
                                mod.colWidths
                            );

                            pageX = undefined;
                            target = undefined;
                            key = undefined;
                            baseWidth = undefined;
                            width = undefined;

                            document.removeEventListener('mousemove', mouseMoveHandler);
                            document.removeEventListener('mouseup', mouseUpHandler);

                        };

                        var mouseDownHandler = function(e) {

                            //
                            // Capture current mouse position.
                            //

                            pageX = e.pageX;

                            target = e.target;

                            key = target.getAttribute('data-col-target');

                            width = baseWidth = +mod.colWidths[nodeType.normalized_name][key].replace('px', '');

                            document.addEventListener('mousemove', mouseMoveHandler);
                            document.addEventListener('mouseup', mouseUpHandler);

                        };

                        el.addEventListener('mousedown', mouseDownHandler);

                    },
                    bottomOffset: function () {

                        return BOTTOM_OFFSET;

                    },
                    clearBannerImage: function () {

                        var controlEl = document.querySelector(
                            '.outer-controls-container'
                        );

                        controlEl.style.backgroundImage = 'none';

                    },
                    getColWidths: function (nodeType) {

                        var storedSettings = TableSettingManager.getSettings(nodeType);

                        try {

                            return storedSettings.colWidths;

                        } catch (e) {

                            return this.colWidths;

                        }

                    },
                    setColWidths: function (nodeType, idx) {

                        this.colWidths[nodeType] = idx;

                    },
                    getTableHeight: function () {

                        var gridEl = document.getElementById('grid-right-content');

                        return gridEl.offsetHeight;

                    },
                    getLeftMapOffset: function () {

                        var panelEl = document.querySelector('.grid-tabs');

                        var offset = panelEl.offsetWidth + 100;

                        if (self.collapsed) {

                            offset = 100;

                        }

                        return offset;

                    },
                    resizeMainContent: function (recordCount) {

                        var gridEl = document.getElementById('grid');

                        var gridToolsEl = document.getElementById('grid-tools-top');

                        var bgMapEl = document.getElementById('backdrop-map');

                        var usageEl = document.getElementById('usage-instructions');

                        var tableContainer = document.getElementById('table-container');

                        console.log(
                            'Table autosize refs:',
                            gridEl,
                            gridToolsEl,
                            bgMapEl,
                            usageEl,
                            tableContainer
                        );

                        if (!gridEl || !tableContainer) return;

                        var heights = [
                            gridToolsEl.offsetHeight,
                            bgMapEl.offsetHeight,
                            usageEl.offsetHeight,
                            //78, // headerEl.offsetHeight,
                            //40, // tabsEl.offsetHeight,
                            //64, // toolsEl.offsetHeight,
                            //56, // testing banner
                            40  // bottomToolbarEl.offsetHeight,
                        ];

                        console.log(
                            'Table autosize heights:',
                            gridToolsEl.offsetHeight,
                            bgMapEl.offsetHeight,
                            usageEl.offsetHeight,
                            40  // bottomToolbarEl.offsetHeight,
                        );

                        var filledHeight = 0;

                        for (var i = 0; i < heights.length; i++) {

                            filledHeight += heights[i];

                        }

                        console.log(
                            'Table autosize heights:',
                            filledHeight
                        );

                        let intViewportWidth = window.innerWidth;

                        let viewPortWidth = document.documentElement.clientWidth;

                        let viewPortHeight = document.documentElement.clientHeight;

                        console.log(
                            'Table autosize view port height:',
                            viewPortHeight
                        );

                        tableContainer.style.marginRight = (intViewportWidth - viewPortWidth) + 'px';

                        tableContainer.style.height = (viewPortHeight - filledHeight) + 'px';

                    },
                    sizeSidebar: function () {

                        var body = document.querySelector('body');

                        var elem = document.querySelector('.grid-tabs');

                        elem.style.height = (body.offsetHeight - BOTTOM_OFFSET) + 'px';

                    }
                };

            }

        ]);

}());