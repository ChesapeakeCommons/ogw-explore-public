'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('SourceUtil', function(AtlasDataManager) {

        var FEATURE_SOURCES = {
            'esri.race_pop': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                generateId: true
            },
            'esri.poverty_by_age': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                generateId: true
            },
            'esri.total_pop': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                generateId: true
            },
            'esri.class1': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                generateId: true
            },
            'esri.ozone': {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                generateId: true
            }
        };

        return {
            _index: {},
            list: function () {

                var vals = [];

                for (var key in this._index) {

                    if (this._index.hasOwnProperty(key)) {

                        vals.push({
                            id: key,
                            config: this._index[key]
                        });

                    }

                }

                return vals;

            },
            resetFeatureStates: function (map, urlComponents) {

                urlComponents.forEach(function (combination) {

                    var prefix = 'fd';

                    if (combination[0] === 'station' ||
                        combination[0] === 'post') {

                        prefix = 'wr';

                    }

                    var layerId = [
                        prefix,
                        combination[0],
                        combination[1]
                    ].join('.');

                    map.removeFeatureState({
                        source: layerId
                    });

                });

            },
            restoreSources: function (map) {

                var sourceIds = Object.keys(FEATURE_SOURCES);

                sourceIds.forEach(function (sourceId) {

                    var source = map.getSource(sourceId);

                    var fetchedFeatures = AtlasDataManager.getFetched(
                        sourceId
                    );

                    if (source !== undefined) {

                        source.setData({
                            'type': 'FeatureCollection',
                            'features': fetchedFeatures
                        });

                    }

                });

            }

        };

    });