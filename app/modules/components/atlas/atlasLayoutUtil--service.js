'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('AtlasLayoutUtil', function(environment, mapbox) {

        var self = this;

        var BOTTOM_OFFSET = 48;

        return {
            bottomOffset: function () {

                return BOTTOM_OFFSET;

            },
            clearBannerImage: function () {

                var controlEl = document.querySelector(
                    '.outer-controls-container'
                );

                controlEl.style.backgroundImage = 'none';

            },
            getLeftMapOffset: function () {

                var panelEl = document.querySelector('.sidebar');

                var offset = panelEl.offsetWidth + 100;

                if (self.collapsed) {

                    offset = 100;

                }

                return offset;

            },
            resizeMainContent: function () {

                var bodyEl = document.querySelector('body');

                console.log(
                    'AtlasLayoutUtil.resizeMainContent:body:',
                    bodyEl
                );

                var controlsEl = document.querySelector('.outer-controls-container');

                console.log(
                    'AtlasLayoutUtil.resizeMainContent:controlsEl:',
                    controlsEl
                );

                var contentEl = document.querySelector('.main-content-container');

                console.log(
                    'AtlasLayoutUtil.resizeMainContent:contentEl:',
                    contentEl
                );

                contentEl.style.height = (bodyEl.offsetHeight - controlsEl.offsetHeight - BOTTOM_OFFSET) + 'px';

                contentEl.style.opacity = 1;

                console.log(
                    'AtlasLayoutUtil.resizeMainContent:contentEl:height:',
                    contentEl.style.height
                );

            },
            setBannerImage: function (primaryNode) {

                var controlEl = document.querySelector(
                    '.outer-controls-container'
                );

                controlEl.style.backgroundImage = 'url(' + primaryNode.properties.picture + ')';

            },
            sizeSidebar: function () {

                var body = document.querySelector('body');

                var elem = document.querySelector('.sidebar');

                if (elem && angular.isDefined(elem)) {

                    elem.style.height = (body.offsetHeight - BOTTOM_OFFSET) + 'px';

                }

            }
        };

    });