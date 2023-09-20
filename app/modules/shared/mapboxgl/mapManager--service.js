'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('MapManager',
        function (
            $filter,
            Utility,
            $rootScope,
            $timeout,
            FacilityFilter
        ) {

            let popup;

            let tooltip;

            let clickedPoint;

            let facilityClick;

            return {
                esriLayers: function () {

                    var eipRoot = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services';

                    var esriRoot = 'https://gispub.epa.gov/arcgis/rest/services';

                    var idx = {
                        total_pop: eipRoot + '/ACS_Total_Population_Boundaries/FeatureServer/2/query',
                        poverty_by_age: eipRoot + '/ACS_Poverty_by_Age_Boundaries/FeatureServer/2/query',
                        race_pop: eipRoot + '/ACS_Population_by_Race_and_Hispanic_Origin_Boundaries/FeatureServer/2/query',
                        class1: esriRoot + '/OAR_OAQPS/Class1_Areas/MapServer/1/query',
                        ozone: esriRoot + '/OAR_OAQPS/NAA2008Ozone8hour/MapServer/0/query',
                    }

                },
                esriParams: function () {

                    return {
                        where: 'OBJECTID>0',
                        geometryType: 'esriGeometryEnvelope',
                        inSR: '4326',
                        spatialRel: 'esriSpatialRelIntersects',
                        outFields: '*',
                        returnGeometry: 'true',
                        outSR: '4326',
                        f: 'pgeojson'
                    }

                },
                addLayers: function (map, arr) {

                    arr.forEach(function (feature) {

                        console.log("Layer Spec", feature);

                        var spec = feature.layer_spec || {};

                        feature.spec = spec;

                        if (!feature.selected ||
                            typeof feature.selected === 'undefined') {

                            feature.selected = false;

                        } else {

                            feature.spec.layout.visibility = 'visible';

                        }

                        if (feature.spec.id) {

                            try {

                                console.log("'MapManager.addLayers", feature.spec);

                                map.addLayer(feature.spec);

                            } catch (error) {

                                console.log(
                                    'MapManager.addLayers --> error',
                                    error);

                            }

                        }

                    });

                    return arr;

                },
                clearLayers: function (map) {

                    console.log("CLEARING LAYERS");

                    var layers = map.getStyle().layers;

                    layers.forEach(function (layer) {

                        if (layer.id.indexOf('feature') >= 0) {

                            map.removeLayer(layer.id);

                        }

                    });

                },
                addFeature: function (map, feature, attribute, addToMap,
                                      fitBounds, featureType = null) {

                    if (fitBounds === null || typeof fitBounds === 'undefined') {

                        fitBounds = true;

                    }

                    /*Check feature type to set color*/

                    var geometryFillColor = '#06aadf';
                    var geometryCircleStrokeColor = 'rgba(6, 170, 223, 0.5)';
                    var geometryLineColor = 'rgba(6, 170, 223, 0.8)';

                    var geojson = attribute ? feature[attribute] : feature;

                    if (geojson !== null &&
                        typeof geojson !== 'undefined') {

                        var geometryType = geojson.geometry ? geojson.geometry.type : geojson.type;

                        var bounds = turf.bbox(geojson);

                        if (geometryType === 'Point') {

                            var buffer = turf.buffer(
                                geojson,
                                0.5, {
                                    units: 'kilometers'
                                });

                            bounds = turf.bbox(buffer);

                        }

                        if (fitBounds) {

                            map.fitBounds(bounds, {
                                padding: 40
                            });

                        }

                        let featureId;

                        if (feature.properties) {

                            featureId = feature.properties.id;

                        } else {

                            featureId = feature.id;

                        }

                        if (addToMap) {

                            if (geometryType === 'Point') {

                                map.addLayer({
                                    'id': 'feature-circle-' + Date.now(),
                                    'type': 'circle',
                                    'source': {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'Feature',
                                            'geometry': geojson
                                        }
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'circle-radius': 8,
                                        'circle-color': geometryFillColor,
                                        'circle-stroke-color': geometryCircleStrokeColor,
                                        'circle-stroke-opacity': 1,
                                        'circle-stroke-width': 4
                                    }
                                });

                            } else if (geometryType.indexOf('Line') >= 0) {

                                map.addLayer({
                                    'id': 'feature-line-' + Date.now(),
                                    'type': 'line',
                                    'source': {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'Feature',
                                            'geometry': geojson
                                        }
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'line-color': geometryLineColor,
                                        'line-width': 2
                                    }
                                });

                            } else {

                                map.addLayer({
                                    'id': 'feature-' + featureType + '-' + featureId,
                                    'type': 'fill',
                                    'source': {
                                        'type': 'geojson',
                                        'data': geojson
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'fill-color': geometryFillColor,
                                        'fill-opacity': 0.4
                                    }
                                });

                                map.addLayer({
                                    'id': 'feature-outline-' + featureType + '-' + featureId,
                                    'type': 'line',
                                    'source': {
                                        'type': 'geojson',
                                        'data': geojson
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'line-color': geometryLineColor,
                                        'line-width': 2
                                    }
                                });

                            }

                        }

                    }

                },
                populateMap: function (map, feature, attribute, addToMap, fitBounds) {

                    if (fitBounds === null ||
                        typeof fitBounds === 'undefined') {

                        fitBounds = true;

                    }

                    var geojson = attribute ? feature[attribute] : feature;

                    if (geojson !== null &&
                        typeof geojson !== 'undefined') {

                        var bounds = turf.bbox(geojson);

                        if (fitBounds) {

                            map.fitBounds(bounds, {
                                padding: 40
                            });

                        }

                        if (!addToMap) {

                            return;

                        } else {

                            var geometryType = geojson.geometry ? geojson.geometry.type : geojson.type;

                            console.log(
                                'MapManager.populateMap --> geometryType',
                                geometryType);

                            if (geometryType === 'Point') {

                                var buffer = turf.buffer(
                                    geojson,
                                    0.5, {
                                        units: 'kilometers'
                                    });

                                bounds = turf.bbox(buffer);

                                if (fitBounds) {

                                    map.fitBounds(bounds, {
                                        padding: 40
                                    });

                                }

                                map.addLayer({
                                    'id': 'feature-circle-' + Date.now(),
                                    'type': 'circle',
                                    'source': {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'Feature',
                                            'geometry': geojson
                                        }
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'circle-radius': 8,
                                        'circle-color': '#06aadf',
                                        'circle-stroke-color': 'rgba(6, 170, 223, 0.5)',
                                        'circle-stroke-opacity': 1,
                                        'circle-stroke-width': 4
                                    }
                                });

                            } else if (geometryType.indexOf('Line') >= 0) {

                                map.addLayer({
                                    'id': 'feature-line-' + Date.now(),
                                    'type': 'line',
                                    'source': {
                                        'type': 'geojson',
                                        'data': {
                                            'type': 'Feature',
                                            'geometry': geojson
                                        }
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'line-color': 'rgba(6, 170, 223, 0.8)',
                                        'line-width': 2
                                    }
                                });

                            } else {

                                map.addLayer({
                                    'id': 'feature-' + Date.now(),
                                    'type': 'fill',
                                    'source': {
                                        'type': 'geojson',
                                        'data': geojson
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'fill-color': '#06aadf',
                                        'fill-opacity': 0.4
                                    }
                                });

                                map.addLayer({
                                    'id': 'feature-outline-' + Date.now(),
                                    'type': 'line',
                                    'source': {
                                        'type': 'geojson',
                                        'data': geojson
                                    },
                                    'layout': {
                                        'visibility': 'visible'
                                    },
                                    'paint': {
                                        'line-color': 'rgba(6, 170, 223, 0.8)',
                                        'line-width': 2
                                    }
                                });

                            }

                        }

                    }

                },
                drawOtherGeometries: function (type, map, collection, feature, callback) {

                    map.on('style.load', function () {

                        if (type === 'secondary_practices') {
                            collection.forEach(function (item) {
                                if (item.properties.id === feature.id) {

                                } else {
                                    callback(
                                        map,
                                        item,
                                        'geometry',
                                        true,
                                        false,
                                        type);

                                }


                            });
                        } else if (type === 'secondary_sites') {
                            collection.forEach(function (item) {

                                if (item.properties.id === feature.id) {

                                } else {
                                    callback(
                                        map,
                                        item,
                                        'geometry',
                                        true,
                                        false,
                                        type
                                    );

                                }

                            });
                        }

                    });

                },
                rankFacilities: function (arr) {

                    arr.sort(function compare(a, b) {

                        if (a.properties.ghg < b.properties.ghg) {

                            return 1;

                        }

                        if (a.properties.ghg > b.properties.ghg) {

                            return -1;

                        }

                        return 0;

                    });

                    var featureCount = arr.length;

                    arr.forEach(function (feature, index) {

                        var rankLabel = [
                            Utility.ordinalIndicator(index),
                            'of',
                            featureCount
                        ].join(' ');

                        feature.properties.rank = index;

                        feature.properties.rankLabel = rankLabel;

                    });

                    return arr;

                },
                getMinGHG: function (arr) {

                    let min = arr[0].properties.ghg;

                    let arrLen = arr.length;

                    for (let i = 1; i < arrLen; ++i) {
                        if (arr[i].properties.ghg < min) {
                            min = arr[i].properties.ghg;
                        }
                    }

                    console.log(
                        'MapManager.getMinGHG:min:',
                        min
                    );

                    return min;

                },
                getMaxGHG: function (arr) {

                    let max = arr[0].properties.ghg;

                    let arrLen = arr.length;

                    for (let i = 1; i < arrLen; ++i) {
                        if (arr[i].properties.ghg > max) {
                            max = arr[i].properties.ghg;
                        }
                    }

                    console.log(
                        'MapManager.getMaxGHG:max:',
                        max
                    );

                    return max;

                },
                addFacilityLayer: function (
                    map,
                    data,
                    fit,
                    padding,
                    context
                ) {

                    fit = (typeof fit === 'boolean') ? fit : false;

                    padding = (Number.isInteger(padding)) ? padding : 40;

                    var source = map.getSource('ogw-facility');

                    if (source === undefined) {

                        map.addSource('ogw-facility', {
                            type: 'geojson',
                            data: data,
                            promoteId: 'id'
                            // cluster: true,
                            // clusterMaxZoom: 8, // Max zoom to cluster points on
                            // clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
                            // clusterProperties: {
                            //     "sum": ["+", ["get", "ghg"]]
                            // }
                        });

                    } else {

                        source.setData(data);

                    }

                    var layer = map.getLayer('ogw-facility');

                    if (layer === undefined) {

                        console.log(
                            'MapManager.addFacilityLayer:',
                            'Setting fresh layer.'
                        );

                        map.addLayer({
                            id: 'ogw-facility',
                            type: 'circle',
                            source: 'ogw-facility', // reference the data source
                            filter: ['!=', ['get', 'assoc'], true],
                            layout: {},
                            paint: {
                                'circle-color': '#FFB733',
                                'circle-radius': [
                                    'interpolate',
                                    ['exponential', 0.5],
                                    ['zoom'],
                                    2,
                                    0.5,
                                    20,
                                    6
                                ],
                                'circle-stroke-width': 4,
                                'circle-stroke-color': '#FFB733',
                                'circle-stroke-opacity': 0.6
                            }
                        });

                        map.addLayer({
                            id: 'ogw-facility-highlight',
                            type: 'circle',
                            source: 'ogw-facility', // reference the data source
                            filter: ['==', ['get', 'assoc'], true],
                            layout: {},
                            paint: {
                                'circle-color': '#FFB733',
                                'circle-radius': [
                                    'interpolate',
                                    ['exponential', 0.5],
                                    ['zoom'],
                                    2,
                                    0.5,
                                    20,
                                    6
                                ],
                                'circle-stroke-width': 4,
                                'circle-stroke-color': '#FF3333',
                                'circle-stroke-opacity': 1
                            }
                        });

                        FacilityFilter.applyFilters(map);

                        // Create a popup, but don't add it to the map yet.
                        // const popup = new mapboxgl.Popup({
                        //     closeButton: false,
                        //     closeOnClick: false
                        // });

                        map.on('mouseenter', 'ogw-facility', (e) => {
                            console.log(
                                'MapManager.addFacilityLayer():mouseenter:event:',
                                e
                            );
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                            // Change the cursor style as a UI indicator.
                            map.getCanvas().style.cursor = 'pointer';

                            // Copy coordinates array.
                            const coordinates = e.features[0].geometry.coordinates.slice();
                            const name = e.features[0].properties.name;

                            var tpl = [
                                '<div class=\"facility-label-popup\">',
                                '<div class=\"pad-b-25p pad-t-25p pad-l-50p pad-r-50p\">',
                                name,
                                '<\/div>',
                                '<\/div>'
                            ].join('');

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            tooltip = new mapboxgl.Popup({
                                closeButton: false,
                                closeOnClick: false
                            });

                            // Populate the popup and set its coordinates
                            // based on the feature found.
                            tooltip.setLngLat(coordinates).setHTML(tpl).addTo(map);

                        });

                        map.on('mouseleave', 'ogw-facility', () => {
                            map.getCanvas().style.cursor = '';
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                        });

                        map.on('mouseenter', 'ogw-facility-highlight', (e) => {
                            console.log(
                                'MapManager.addFacilityLayer():mouseenter:event:',
                                e
                            );
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                            // Change the cursor style as a UI indicator.
                            map.getCanvas().style.cursor = 'pointer';

                            // Copy coordinates array.
                            const coordinates = e.features[0].geometry.coordinates.slice();
                            const name = e.features[0].properties.name;

                            var tpl = [
                                '<div class=\"facility-label-popup\">',
                                '<div class=\"pad-b-25p pad-t-25p pad-l-50p pad-r-50p\">',
                                name,
                                '<\/div>',
                                '<\/div>'
                            ].join('');

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            tooltip = new mapboxgl.Popup({
                                closeButton: false,
                                closeOnClick: false
                            });

                            // Populate the popup and set its coordinates
                            // based on the feature found.
                            tooltip.setLngLat(coordinates).setHTML(tpl).addTo(map);

                        });

                        map.on('mouseleave', 'ogw-facility-highlight', () => {
                            map.getCanvas().style.cursor = '';
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                        });

                    }

                    if (fit) {

                        var bounds = turf.bbox(data);

                        console.log(
                            'MapManager.addFacilityLayer:bounds:',
                            bounds
                        );

                        try {

                            map.fitBounds(bounds, {
                                maxZoom: 16,
                                padding: padding
                            });

                        } catch (e) {

                            //

                        }

                    }

                    // FacilityFilter.applyFilters(map);

                    // $timeout(function () {
                    //
                    //     $rootScope.$broadcast('facilityLayer:ready');
                    //
                    // }, 50);

                },
                addPipelineLayer: function (
                    map,
                    fit,
                    padding,
                    targetIds,
                    targetGeometry
                ) {

                    console.log(
                        'MapManager.addPipelineLayer:',
                        'fit:',
                        fit,
                        '\n',
                        'padding:',
                        padding,
                        '\n',
                        'targetIds:',
                        targetIds,
                        '\n',
                        'targetGeometry:',
                        targetGeometry
                    );

                    fit = (typeof fit === 'boolean') ? fit : false;

                    padding = (Number.isInteger(padding)) ? padding : 40;

                    targetIds = (Array.isArray(targetIds)) ? targetIds : [-1];

                    let sourceURL = 'https://services5.arcgis.com/B2Qw3HaAUA1KBIow/ArcGIS/rest/services/Oil_and_Gas_Watch_Pipeline_Routes_/FeatureServer/0/query?where=objectid%3E0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=6&outSR=4326&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=';

                    var source = map.getSource('ogw-pipeline');

                    if (source === undefined) {

                        map.addSource('ogw-pipeline', {
                            type: 'geojson',
                            data: sourceURL,
                            // promoteId: 'id'
                            // cluster: true,
                            // clusterMaxZoom: 8, // Max zoom to cluster points on
                            // clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
                            // clusterProperties: {
                            //     "sum": ["+", ["get", "ghg"]]
                            // }
                        });

                    }

                    var layer = map.getLayer('ogw-pipeline');

                    if (layer === undefined) {

                        console.log(
                            'MapManager.addPipelineLayer:',
                            'Setting fresh layer.'
                        );

                        map.addLayer({
                            id: 'ogw-pipeline',
                            type: 'line',
                            source: 'ogw-pipeline', // reference the data source
                            // filter: ['!', ['has', 'point_count']],
                            minzoom: 2,
                            layout: {},
                            filter: ['match', ['get', 'id'], targetIds, false, true],
                            paint: {
                                'line-color': '#FFB733',
                                'line-width': [
                                    'interpolate',
                                    ['exponential', 0.5],
                                    ['zoom'],
                                    2,
                                    1,
                                    20,
                                    4
                                ]
                            }
                        });

                        map.addLayer({
                            id: 'ogw-pipeline-highlight',
                            type: 'line',
                            source: 'ogw-pipeline', // reference the data source
                            // filter: ['!', ['has', 'point_count']],
                            minzoom: 2,
                            layout: {},
                            filter: ['match', ['get', 'id'], targetIds, true, false],
                            paint: {
                                'line-color': '#FF3333',
                                'line-width': [
                                    'interpolate',
                                    ['exponential', 0.5],
                                    ['zoom'],
                                    2,
                                    1,
                                    20,
                                    4
                                ]
                            }
                        });

                        // Create a popup, but don't add it to the map yet.
                        // const popup = new mapboxgl.Popup({
                        //     closeButton: false,
                        //     closeOnClick: false
                        // });

                        map.on('mouseenter', 'ogw-pipeline', (e) => {
                            console.log(
                                'MapManager.addPipelineLayer():mouseenter:event:',
                                e
                            );
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                            // Change the cursor style as a UI indicator.
                            map.getCanvas().style.cursor = 'pointer';

                            // Copy coordinates array.
                            const coordinates = [e.lngLat.lng, e.lngLat.lat];
                            const name = e.features[0].properties.name;

                            var tpl = [
                                '<div class=\"facility-label-popup\">',
                                '<div class=\"pad-b-25p pad-t-25p pad-l-50p pad-r-50p\">',
                                name,
                                '<\/div>',
                                '<\/div>'
                            ].join('');

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            tooltip = new mapboxgl.Popup({
                                closeButton: false,
                                closeOnClick: false
                            });

                            // Populate the popup and set its coordinates
                            // based on the feature found.
                            tooltip.setLngLat(coordinates).setHTML(tpl).addTo(map);

                        });

                        map.on('mouseleave', 'ogw-pipeline', () => {
                            map.getCanvas().style.cursor = '';
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                        });

                        map.on('mouseenter', 'ogw-pipeline-highlight', (e) => {
                            console.log(
                                'MapManager.addPipelineLayer():mouseenter:event:',
                                e
                            );
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                            // Change the cursor style as a UI indicator.
                            map.getCanvas().style.cursor = 'pointer';

                            // Copy coordinates array.
                            const coordinates = [e.lngLat.lng, e.lngLat.lat];
                            const name = e.features[0].properties.name;

                            var tpl = [
                                '<div class=\"facility-label-popup\">',
                                '<div class=\"pad-b-25p pad-t-25p pad-l-50p pad-r-50p\">',
                                name,
                                '<\/div>',
                                '<\/div>'
                            ].join('');

                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }

                            tooltip = new mapboxgl.Popup({
                                closeButton: false,
                                closeOnClick: false
                            });

                            // Populate the popup and set its coordinates
                            // based on the feature found.
                            tooltip.setLngLat(coordinates).setHTML(tpl).addTo(map);

                        });

                        map.on('mouseleave', 'ogw-pipeline-highlight', () => {
                            map.getCanvas().style.cursor = '';
                            if (tooltip && tooltip.isOpen()) tooltip.remove();
                        });

                    }

                    if (fit && Utility.isObject(targetGeometry)) {

                        var bounds = turf.bbox(targetGeometry);

                        console.log(
                            'MapManager.addPipelineLayer:bounds:',
                            bounds
                        );

                        try {

                            map.fitBounds(bounds, {
                                maxZoom: 16,
                                padding: padding
                            });

                        } catch (e) {

                            //

                        }

                    }

                },
                createBackdropMap: function (options, geometry) {

                    if (!options) return;

                    var map = new mapboxgl.Map(options);

                    map.on('load', function () {
                        
                        try {

                            var bbox = turf.bbox(geometry);

                            map.fitBounds(bbox, {duration: 100, padding: 40});

                        } catch (e) {
                            
                        }

                    });

                },
                createStaticMap: function (options, feature, sourceId, bbox) {

                    if (!options) return;

                    var map = new mapboxgl.Map(options);

                    map.on('load', function () {

                        if (!bbox) {
                            bbox = turf.bbox(feature.geometry);
                        }

                        map.fitBounds(bbox, {duration: 0, padding: 40});

                        map.addSource(sourceId, {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    feature
                                ]
                            }
                        });

                        map.addLayer({
                            'id': sourceId,
                            'type': 'fill',
                            'source': sourceId, // reference the data source
                            'layout': {},
                            'paint': {
                                'fill-color': '#ffffff',
                                'fill-opacity': 0.3
                            }
                        });

                    });

                },
                buildEmissionLabel: function (feature, statusLabel) {

                    var rankLabel = '';

                    if (!feature.ghg) {

                        if (statusLabel.indexOf('Announced') >= 0) {

                            rankLabel = 'TBD';

                        } else {

                            rankLabel = 'Unknown';

                        }

                    } else {

                        rankLabel = [
                            $filter('number')(feature.ghg, 0),
                            'tons/year',
                            '(' + feature.rankLabel + ')'
                        ].join(' ');

                    }

                    return [
                        '<div class=\"attribute\"><strong>Potential CO2e: </strong>',
                        rankLabel,
                        '<\/div>',
                    ].join('');

                },
                createFacilityPopup: function (map) {

                    var mod = this;

                    // Create a popup, but don't add it to the map yet.
                    // var popup = new mapboxgl.Popup({
                    //     closeButton: false,
                    //     closeOnClick: false,
                    //     maxWidth: '400px'
                    // });

                    map.on('click', 'ogw-facility', function (e) {
                        console.log(
                            'MapManager.createFacilityPopup():click:event:',
                            e
                        );
                        facilityClick = true;
                        // clickedPoint = e.point;
                        // e.originalEvent.stopPropagation();
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';

                        if (popup &&
                            popup.isOpen()) popup.remove();

                        // clickedPoint = e.point;

                        const features = map.queryRenderedFeatures(
                            e.point,
                            {layers: ['ogw-facility']}
                        );

                        console.log(
                            'map.click.fac:features:',
                            features
                        );

                        var coordinates = features[0].geometry.coordinates.slice();
                        var feature = features[0].properties;

                        console.log(
                            'MapManager.createFacilityPopup():feature:',
                            feature
                        );

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        var sectors;

                        try {

                            sectors = JSON.parse(feature.sectors);

                            var uniqSectors = [];

                            sectors.forEach(function (sector) {

                                if (sector && uniqSectors.indexOf(sector) < 0) {

                                    uniqSectors.push(sector);

                                }

                            });

                            sectors = uniqSectors.join(', ');

                        } catch (e) {

                            sectors = 'n/a';

                        }

                        var statuses;

                        try {

                            statuses = JSON.parse(feature.statuses);

                            var uniqStatuses = [];

                            statuses.forEach(function (status) {

                                if (status && uniqStatuses.indexOf(status) < 0) {

                                    uniqStatuses.push(status);

                                }

                            });

                            statuses = uniqStatuses.join(', ');

                        } catch (e) {

                            statuses = 'n/a';

                        }

                        var _types;

                        try {

                            _types = new Set(JSON.parse(feature.types));

                            _types = Array.from(_types).join(', ');

                        } catch (e) {

                            _types = 'n/a';

                        }

                        var company;

                        try {

                            company = JSON.parse(feature.company)[0] || 'n/a';

                        } catch (e) {

                            company = 'n/a';

                        }

                        var rankLabelEl = mod.buildEmissionLabel(
                            feature,
                            statuses
                        );

                        var tpl = [
                            '<div class=\"label-popup\">',
                            '<div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Name: </strong>',
                            '<a href=\"/facility/' + feature.id + '\">',
                            feature.name + '<\/a>',
                            '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Company: </strong>',
                            company + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>State: </strong>',
                            '<a href=\"/state/' + feature.state + '\">' + feature.state + '<\/a>',
                            '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Sector: </strong>',
                            sectors + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Status: </strong>',
                            statuses + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Type: </strong>',
                            _types + '<\/div>',
                            rankLabelEl,
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                        popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            maxWidth: '400px'
                        });

                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(coordinates).setHTML(tpl).addTo(map);
                    });

                    map.on('click', 'ogw-facility-highlight', function (e) {
                        console.log(
                            'MapManager.createFacilityPopup():click:event:',
                            e
                        );
                        facilityClick = true;
                        // clickedPoint = e.point;
                        // e.originalEvent.stopPropagation();
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';

                        if (popup &&
                            popup.isOpen()) popup.remove();

                        // clickedPoint = e.point;

                        const features = map.queryRenderedFeatures(
                            e.point,
                            {layers: ['ogw-facility-highlight']}
                        );

                        console.log(
                            'map.click.fac:features:',
                            features
                        );

                        var coordinates = features[0].geometry.coordinates.slice();
                        var feature = features[0].properties;

                        console.log(
                            'MapManager.createFacilityPopup():feature:',
                            feature
                        );

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        var sectors;

                        try {

                            sectors = JSON.parse(feature.sectors);

                            var uniqSectors = [];

                            sectors.forEach(function (sector) {

                                if (sector && uniqSectors.indexOf(sector) < 0) {

                                    uniqSectors.push(sector);

                                }

                            });

                            sectors = uniqSectors.join(', ');

                        } catch (e) {

                            sectors = 'n/a';

                        }

                        var statuses;

                        try {

                            statuses = JSON.parse(feature.statuses);

                            var uniqStatuses = [];

                            statuses.forEach(function (status) {

                                if (status && uniqStatuses.indexOf(status) < 0) {

                                    uniqStatuses.push(status);

                                }

                            });

                            statuses = uniqStatuses.join(', ');

                        } catch (e) {

                            statuses = 'n/a';

                        }

                        var _types;

                        try {

                            _types = new Set(JSON.parse(feature.types));

                            _types = Array.from(_types).join(', ');

                        } catch (e) {

                            _types = 'n/a';

                        }

                        var company;

                        try {

                            company = JSON.parse(feature.company)[0] || 'n/a';

                        } catch (e) {

                            company = 'n/a';

                        }

                        var rankLabelEl = mod.buildEmissionLabel(
                            feature,
                            statuses
                        );

                        var tpl = [
                            '<div class=\"label-popup\">',
                            '<div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Name: </strong>',
                            '<a href=\"/facility/' + feature.id + '\">',
                            feature.name + '<\/a>',
                            '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Company: </strong>',
                            company + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>State: </strong>',
                            '<a href=\"/state/' + feature.state + '\">' + feature.state + '<\/a>',
                            '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Sector: </strong>',
                            sectors + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Status: </strong>',
                            statuses + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Type: </strong>',
                            _types + '<\/div>',
                            rankLabelEl,
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                        popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            maxWidth: '400px'
                        });

                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(coordinates).setHTML(tpl).addTo(map);
                    });

                },
                createPipelinePopup: function (map) {

                    var mod = this;

                    // Create a popup, but don't add it to the map yet.
                    // var popup = new mapboxgl.Popup({
                    //     closeButton: false,
                    //     closeOnClick: false,
                    //     maxWidth: '400px'
                    // });

                    map.on('click', 'ogw-pipeline', function (e) {
                        if (facilityClick) return;
                        // e.originalEvent.stopPropagation();
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';

                        if (popup &&
                            popup.isOpen()) popup.remove();

                        const features = map.queryRenderedFeatures(
                            e.point,
                            {layers: ['ogw-pipeline']}
                        );

                        console.log(
                            'map.click.ogw-pipeline:features:',
                            features
                        );

                        var coordinates = [e.lngLat.lng, e.lngLat.lat];
                        var feature = features[0].properties;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        let length = Utility.getProperty(
                            feature,
                            'Length'
                        );

                        try {

                            length = $filter('numStr')(Number(length)) + ' miles';

                        } catch (e) {

                            length = 'Unknown';

                        }

                        let capacity = Utility.getProperty(
                            feature,
                            'Capacity'
                        );

                        try {

                            let units = Utility.getProperty(
                                feature,
                                'Units'
                            );

                            capacity = ($filter('numStr')(Number(capacity)) + ' (' + units + ')').trim();

                        } catch (e) {

                            capacity = 'Unknown';

                        }

                        var tpl = [
                            '<div class=\"label-popup\">',
                            '<div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Name: </strong>',
                            '<a href=\"/pipeline/' + feature.id + '\">',
                            feature.name + '<\/a>',
                            '<\/div>', ,
                            '<div class=\"attribute pad-b-50p\"><strong>State(s): </strong>',
                            feature['State'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Product: </strong>',
                            feature['Product'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Project type: </strong>',
                            feature['PrjType'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Length: </strong>',
                            length + '<\/div>',
                            '<div class=\"attribute\"><strong>Capacity: </strong>',
                            capacity + '<\/div>',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                        popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            maxWidth: '400px'
                        });

                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(coordinates).setHTML(tpl).addTo(map);
                    });

                    map.on('click', 'ogw-pipeline-highlight', function (e) {
                        if (facilityClick) return;
                        // e.originalEvent.stopPropagation();
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';

                        if (popup &&
                            popup.isOpen()) popup.remove();

                        const features = map.queryRenderedFeatures(
                            e.point,
                            {layers: ['ogw-pipeline-highlight']}
                        );

                        console.log(
                            'map.click.ogw-pipeline-highlight:features:',
                            features
                        );

                        var coordinates = [e.lngLat.lng, e.lngLat.lat];
                        var feature = features[0].properties;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        let length = Utility.getProperty(
                            feature,
                            'Length'
                        );

                        try {

                            length = $filter('numStr')(Number(length)) + ' miles';

                        } catch (e) {

                            length = 'Unknown';

                        }

                        let capacity = Utility.getProperty(
                            feature,
                            'Capacity'
                        );

                        try {

                            let units = Utility.getProperty(
                                feature,
                                'Units'
                            );

                            capacity = ($filter('numStr')(Number(capacity)) + ' (' + units + ')').trim();

                        } catch (e) {

                            capacity = 'Unknown';

                        }

                        var tpl = [
                            '<div class=\"label-popup\">',
                            '<div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Name: </strong>',
                            '<a href=\"/pipeline/' + feature.id + '\">',
                            feature.name + '<\/a>',
                            '<\/div>', ,
                            '<div class=\"attribute pad-b-50p\"><strong>State(s): </strong>',
                            feature['State'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Product: </strong>',
                            feature['Product'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Project type: </strong>',
                            feature['PrjType'] + '<\/div>',
                            '<div class=\"attribute pad-b-50p\"><strong>Length: </strong>',
                            length + '<\/div>',
                            '<div class=\"attribute\"><strong>Capacity: </strong>',
                            capacity + '<\/div>',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                        popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            maxWidth: '400px'
                        });

                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(coordinates).setHTML(tpl).addTo(map);
                    });

                    map.on('click', function (e) {

                        console.log(
                            'map.click.ogw-pipeline:e:',
                            e
                        );

                        var features = map.queryRenderedFeatures(e.point);

                        console.log(
                            'map.click.fac:features:',
                            features
                        );

                        if (popup && popup.isOpen()) {

                            console.log(
                                'map.click.fac:',
                                'Popup open, please close.'
                            );

                            if (!features.length) {

                                popup.remove();

                            } else {

                                var layerMatch = false;

                                features.forEach(function (f) {

                                    var layerId = f.layer.id;

                                    let reserved = [
                                        'ogw-facility',
                                        'ogw-facility-highlight',
                                        'ogw-pipeline',
                                        'ogw-pipeline-highlight',
                                    ];

                                    if (layerId.indexOf('ogw-facility') < 0) {
                                        facilityClick = false;
                                    }

                                    if (reserved.indexOf(layerId) >= 0) {

                                        layerMatch = true;

                                    }

                                });

                                if (!layerMatch) {
                                    facilityClick = false;
                                    popup.remove();
                                }

                            }

                        }

                    });

                },
                setPopup: function (obj) {

                    popup = obj;

                }
            };

        });