'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('EsriLayerService', function(ZoomUtil, AtlasDataManager, $http, $timeout) {

        const REQUEST_CONFIG = {
            school: {
                outFields: 'name',
                pk: 'objectid',
                where: 'objectid>0',
                serviceUrl: 'https://services6.arcgis.com/Do88DoK2xjTUCXd1/ArcGIS/rest/services',
                queryPath: 'OSM_Schools_Poly_NA/FeatureServer/0',
            },
            worship: {
                outFields: 'name',
                pk: 'objectid',
                where: 'objectid>0',
                serviceUrl: 'https://services6.arcgis.com/Do88DoK2xjTUCXd1/arcgis/rest/services',
                queryPath: 'OSM_Places_of_Worship_NA/FeatureServer/0',
            },
            medical: {
                outFields: 'name',
                pk: 'objectid',
                where: 'amenity IN (\'clinic\', \'hospital\')',
                serviceUrl: 'https://services6.arcgis.com/Do88DoK2xjTUCXd1/arcgis/rest/services',
                queryPath: 'OSM_Medical_NA/FeatureServer/0',
            },
            nursing: {
                outFields: 'name',
                pk: 'OBJECTID',
                where: 'objectid>0',
                serviceUrl: 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services',
                queryPath: 'NursingHomes/FeatureServer/0',
            },
            prison: {
                outFields: 'name',
                pk: 'FID',
                where: 'objectid>0',
                serviceUrl: 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services',
                queryPath: 'Prison_Boundaries/FeatureServer/0',
            }
        };

        return {
            buildPopup: function (feature, layerKey) {

                console.log(
                    'buildPopup:feature:',
                    feature
                );

                console.log(
                    'buildPopup:layerKey:',
                    layerKey
                );

                layerKey = layerKey.split('.')[1];

                console.log(
                    'buildPopup:layerKey[2]:',
                    layerKey
                );

                var tplIdx = {
                    worship: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>' + feature.NAME + '<\/strong>',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    },
                    schools: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>' + feature.NAME + '<\/strong>',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    },
                    total_pop: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>' + feature.NAME + '<\/strong><br \/><br \/>',
                            'According to the American Community Survey, ',
                            feature.B01001_001E,
                            ' people live in this area. <br \/><br \/>',
                            'Of those, <strong>',
                            feature.B01001_calc_numDependE,
                            ' are under the age of 18 or 65+<\/strong> (',
                            feature.B01001_calc_pctDependE,
                            '%). This is known as the dependent population. ',
                            '<br \/><br \/><strong>',
                            feature.B01001_calc_numLT18E,
                            '<\/strong> are under 18 (',
                            feature.B01001_calc_pctLT18E,
                            '%)<br \/><strong>',
                            feature.B01001_calc_numGE65E,
                            '<\/strong> are 65 or older (',
                            feature.B01001_calc_pctGE65E,
                            '%)',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    },
                    poverty_by_age: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>' + feature.NAME + '<\/strong><br \/><br \/>',
                            'In this area, there are <strong>',
                            feature.B17020_001E,
                            '<\/strong> people for whom poverty is determined. ',
                            '<br \/><br \/>Of those, <strong>',
                            feature.B17020_002E,
                            '<\/strong> are below the Federal poverty line ',
                            '(<strong>',
                            feature.B17020_calc_pctPovE,
                            '%<\/strong>).<br \/><br \/><strong>',
                            feature.B17020_calc_numChildPovE,
                            ' <\/strong>are children under 18 in poverty.',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    },
                    race_pop: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>' + feature.NAME + '<\/strong><br \/><br \/>',
                            'The predominant race in this area is <br \/>',
                            '<strong>',
                            feature[feature.predominant],
                            '<br \/><br \/><\/strong><strong>',
                            'White Alone, not Hispanic: <\/strong>',
                            feature.B03002_003E,
                            '<strong><br \/>Hispanic or Latino: <\/strong>',
                            feature.B03002_012E,
                            '<strong><br \/>Black or African American Alone, not Hispanic: <\/strong>',
                            feature.B03002_004E,
                            '<strong><br \/>Asian Alone, not Hispanic: <\/strong>',
                            feature.B03002_006E,
                            '<strong><br \/>American Indian and Alaska Native Alone, not Hispanic: <\/strong>',
                            feature.B03002_005E,
                            '<strong><br \/>Two or more races, not Hispanic: <\/strong>',
                            feature.B03002_009E,
                            '<strong><br \/>Native Hawaiian and Other Pacific Islander, not Hispanic: <\/strong>',
                            feature.B03002_007E,
                            '<strong><br \/>Some other race, not Hispanic: <\/strong>',
                            feature.B03002_008E,
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    },
                    ozone: function (feature) {

                        return [
                            '<div class=\"layer-popup\">',
                            '<div>',
                            '<strong>',
                            feature.area_name,
                            ' ',
                            feature.STATE_ABBR,
                            '<\/strong> was designated as an 8-hour ozone ',
                            'nonattainment area effective on <strong>',
                            feature.designation_effective_date,
                            '<\/strong> (<a href=\"',
                            feature.designation_url,
                            '\" target=\"_blank\">',
                            feature.designation_citation,
                            '<\/a>) and classified as \"<strong>',
                            feature.classification,
                            '<\/strong>\" (<a href=\"',
                            feature.classification_url,
                            '\" target=\"_blank\">',
                            feature.classification_citation,
                            '<\/a>). Currently, this area is in <strong>',
                            feature.current_status,
                            '<\/strong> status.<br \/><br \/>',
                            'Original Design Value (',
                            feature.original_dv_years,
                            '): <strong>',
                            feature.original_design_value,
                            '<\/strong> ',
                            feature.dv_units,
                            '<br \/><br \/>Current Design Value (',
                            feature.dv_years,
                            '): <strong>',
                            feature.design_value,
                            '<\/strong> ',
                            feature.dv_units,
                            '<br \/><br \/>Does the current value meet NAAQS?: <strong>',
                            feature.meets_naaqs,
                            '<\/strong><br \/><br \/>Read other <a href=\"',
                            'https://www3.epa.gov/airquality/greenbook/hfarea2.html\" ',
                            'target=\"_blank\">Federal Register Notices<\/a> related to ',
                            '8-hour Ozone (2008 NAAQS) designations and classifications.',
                            '<br \/><br \/>For more info: <a href=\"',
                            'https://www.epa.gov/green-book\" ',
                            'target=\"_blank\">Green Book<\/a>.',
                            '<\/div>',
                            '<\/div>'
                        ].join('');

                    }
                };

                try {

                    return tplIdx[layerKey](feature);

                } catch (e) {

                    console.warn(
                        'buildPopup:error:',
                        e
                    );

                    return null;

                }

            },
            esriParams: function (layerId) {

                var outFields = '*';

                return {
                    where: REQUEST_CONFIG[layerId].where,
                    geometryType: 'esriGeometryEnvelope',
                    inSR: '4326',
                    spatialRel: 'esriSpatialRelIntersects',
                    outFields: REQUEST_CONFIG[layerId].outFields,
                    returnGeometry: 'true',
                    outSR: '4326',
                    f: 'geojson'
                };

            },
            refreshFeatureLayers: function (map) {

                var mod = this;

                // var layerIdx = this.esriLayerUrls();

                var layerIdx = REQUEST_CONFIG;

                for (var key in layerIdx) {

                    if (layerIdx.hasOwnProperty(key)) {

                        mod.dispatchLayerUpdate(
                            map,
                            key,
                            layerIdx[key]
                        );

                    }

                }

            },
            dispatchLayerUpdate: function (map, key, config) {

                var mod = this;

                var url = [
                    config.serviceUrl,
                    config.queryPath,
                    'query'
                ].join('/');

                $timeout(function () {

                    mod.updateNodeLayer(
                        map,
                        key,
                        url
                    );

                }, 500);

            },
            updateNodeLayer: function (map, sourceKey, url) {

                if (map === undefined) return;

                var zoom = map.getZoom();

                if (zoom < 5) return;

                var mod = this;

                var params = this.esriParams(sourceKey);

                var boundsArr = map.getBounds().toArray();

                params.geometry = [
                    boundsArr[0][0], // minY
                    boundsArr[0][1], // minX
                    boundsArr[1][0], // maxY
                    boundsArr[1][1]  // maxX
                ].join(',');

                $http({
                    method: 'GET',
                    url: url,
                    params: params,
                    headers: {}
                }).then(function successCallback(successResponse) {

                    console.log(
                        'updateNodeLayer:successResponse:',
                        successResponse);

                    if (!Array.isArray(successResponse.data.features)) return;

                    var sourceId = 'esri.' + sourceKey;

                    var source = map.getSource(sourceId);

                    if (source !== undefined) {

                        successResponse.data.features.forEach(function (feature) {

                            var key = REQUEST_CONFIG[sourceKey].pk;

                            feature.properties.id = feature.properties[key];

                            AtlasDataManager.trackFeature(
                                sourceId,
                                feature,
                                key
                            );

                        });

                        var fetchedFeatures = AtlasDataManager.getFetched(
                            sourceId
                        );

                        source.setData({
                            'type': successResponse.data.type,
                            'features': fetchedFeatures
                        });

                    }

                }, function errorCallback(errorResponse) {

                    console.log(
                        'updateNodeLayer:errorResponse:',
                        errorResponse
                    );

                });

            }
        };

    });