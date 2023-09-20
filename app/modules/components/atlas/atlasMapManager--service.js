'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('AtlasMapManager', function(environment, Dashboard, Site, Practice, mapbox) {

        //
        // Query string params key.
        //
        // gr: granular
        // pr: practice
        // si: site
        // pi/pj: project
        // style: style
        //

        // Let's set an internal reference to this service
        var self = this;

        // this holds our mapboxgl map.
        self.map = undefined;

        self.geocoder = undefined;

        self.nav = undefined;

        self.fullscreen = undefined;

        self.activePiSources = [];

        var config = {
            'delineation': {
                'prefix': 'si',
                'paintSpec': {
                    'circle': {
                        'circle-color': '#00C8FF',
                        'circle-radius': 8,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#00C8FF'
                    },
                    'fill': {
                        'fill-color': '#00C8FF',
                        'fill-opacity': 0.4,
                        'fill-outline-color': '#424242'
                    },
                    'line': {
                        'line-color': '#00C8FF',
                        'line-width': 2
                    }
                }
            },
            'geography': {
                'prefix': 'si',
                'paintSpec': {
                    'circle': {
                        'circle-color': '#fbb03b',
                        'circle-radius': 8,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#FF0033'
                    },
                    'fill': {
                        'fill-color': '#fbb03b',
                        'fill-opacity': 0.4,
                        'fill-outline-color': '#FF0033'
                    },
                    'line': {
                        'line-color': '#fbb03b',
                        'line-width': 2
                    }
                }
            },
            'practice': {
                'prefix': 'si',
                'paintSpec': {
                    'circle': {
                        'circle-color': '#df063e',
                        'circle-radius': 8,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#005e7d'
                    },
                    'fill': {
                        'fill-color': '#df063e',
                        'fill-opacity': 0.4,
                        'fill-outline-color': '#005e7d'
                    },
                    'line': {
                        'line-color': '#df063e',
                        'line-width': 2
                    }
                }
            },
            'site': {
                'prefix': 'si',
                'paintSpec': {
                    'circle': {
                        'circle-color': '#a94efe',
                        'circle-radius': 8,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#005e7d'
                    },
                    'fill': {
                        'fill-color': '#a94efe',
                        'fill-opacity': 0.4,
                        'fill-outline-color': '#005e7d'
                    },
                    'line': {
                        'line-color': '#a94efe',
                        'line-width': 2
                    }
                }
            }
        };

        return {
            createMarker: function(iconSize, feature, centroid, feature_type) {

                var element = document.createElement('div');

                if (feature_type === 'project') {

                    console.log("MARKER: PROJECT");

                    element.style.backgroundImage = 'url(./images/mapMarker_01_x28.png)';
                    // element.setAttribute("onclick","angular.element(document.getElementById('main')).scope().markerClickRouter("+feature.id+",["+centroid+"],'"+feature_type+"');");

                } else if (feature_type === 'site') {

                    console.log("MARKER: SITE");

                    element.style.backgroundImage = 'url(./images/mapMarker_02_x28.png)';
                    // element.setAttribute("onclick","angular.element(document.getElementById('main')).scope().markerClickRouter("+feature.id+",["+centroid+"],'"+feature_type+"');");

                } else if (feature_type === 'practice') {

                    console.log("MARKER: PRACTICE");

                    element.style.backgroundImage = 'url(./images/mapMarker_03_x28.png)';
                    // element.setAttribute("onclick","angular.element(document.getElementById('main')).scope().markerClickRouter("+feature.id+",["+centroid+"],'"+feature_type+"');");

                }

                element.style.width = iconSize.width + 'px';
                element.style.height = iconSize.height + 'px';
                element.style.borderRadius = '50%';

                return element;

            },
            createPopup: function(dashboardId, feature, featureType, style) {

                feature = feature.properties ? feature.properties : feature;

                var id = feature.id;

                var tpl;

                var summaryUrl;

                var siteUrl;

                var practiceUrl;

                switch (featureType) {

                    case 'practice':

                        summaryUrl = environment.siteUrl + '/practices/' + feature.id;

                        practiceUrl = encodeURI(dashboardId + '?pr=' + feature.id + '&style=' + style);

                        tpl = '<div class=\"project--popup\">' +
                            '<div class=\"title--group\">' +
                            '<div class=\"marker--title border--right\">' + feature.name + '</div>' +
                            '<a href=\"' + summaryUrl + '\" target=\"_blank\">' +
                            '<i class=\"material-icons\">keyboard_arrow_right</i>' +
                            '</a>' +
                            '</div>' +
                            '<a class=\"marker--title view-features\" href=\"' + practiceUrl + '\">View practice</a>' +
                            '</div>';

                        break;

                    case 'site':

                        summaryUrl = environment.siteUrl + '/sites/' + feature.id;

                        siteUrl = encodeURI(dashboardId + '?si=' + feature.id + '&style=' + style);

                        tpl = '<div class=\"project--popup\">' +
                            '<div class=\"title--group\">' +
                            '<div class=\"marker--title border--right\">' + feature.name + '</div>' +
                            '<a href=\"' + summaryUrl + '\" target=\"_blank\">' +
                            '<i class=\"material-icons\">keyboard_arrow_right</i>' +
                            '</a>' +
                            '</div>' +
                            '<a class=\"marker--title view-features\" href=\"' + siteUrl + '\">View site</a>' +
                            '</div>';

                        break;

                    case 'project':

                        summaryUrl = environment.siteUrl + '/projects/' + feature.id;

                        siteUrl = encodeURI(dashboardId + '?pj=' + feature.id + '&gr=false&style=' + style);

                        practiceUrl = encodeURI(dashboardId + '?pj=' + feature.id + '&gr=true&style=' + style);

                        //
                        // Create DOM node.
                        //

                        tpl = document.createElement('div')

                        tpl.className = 'project--popup';

                        if (angular.isDefined(feature.picture)) {

                            var imgEl = document.createElement('div');

                            imgEl.className = 'image';

                            imgEl.style.backgroundImage = 'url(\"' + feature.picture + '\")';

                            tpl.appendChild(imgEl);

                        }

                        var metaGrp = document.createElement('div');

                        metaGrp.className = 'meta-group';

                        var titleGrp = document.createElement('div');

                        titleGrp.className = 'title--group';

                        var markerTitle = document.createElement('div');

                        markerTitle.className = 'marker--title border--right';

                        markerTitle.textContent = feature.name;

                        titleGrp.appendChild(markerTitle);

                        var anchor = document.createElement('a');

                        anchor.href = summaryUrl;

                        anchor.target = '_blank';

                        var icon = document.createElement('span');

                        icon.className = 'material-icons';

                        icon.textContent = 'launch';

                        anchor.appendChild(icon);

                        titleGrp.appendChild(anchor);

                        metaGrp.appendChild(titleGrp);

                        tpl.appendChild(metaGrp);

                        var focusBtn = document.createElement('button');

                        focusBtn.className = 'focus-btn pad-0 pad-t-50p pad-b-50p pad-r-1 pad-l-1';

                        var focusIcon = document.createElement('span');

                        focusIcon.className = 'material-icons';

                        focusIcon.textContent = 'zoom_in';

                        focusBtn.appendChild(focusIcon);

                        tpl.appendChild(focusBtn);

                        break;

                }

                return tpl;

            },
            fitMap: function(map, feature, linear) {

                var bounds;

                try {

                    try {

                        bounds = turf.bbox(
                            feature.properties.extent
                        );

                    } catch (e) {

                        console.warn(e);

                        bounds = turf.bbox(
                            feature.geometry
                        );

                    }

                } catch (e) {

                    console.warn(e);

                }

                if (bounds && typeof bounds !== 'undefined') {

                    map.fitBounds(bounds, {
                        linear: linear ? linear : false,
                        padding: self.padding
                    });

                }

            }

        };

    });