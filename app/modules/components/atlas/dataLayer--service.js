'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('DataLayer', function (ZoomUtil, EsriLayerService) {

        var zoomConfig = ZoomUtil.getZoom();

        var DATA_LAYERS = [
            {
                config: {
                    'id': 'esri.schools',
                    'source': 'esri.schools',
                    'minzoom': 10,
                    'type': 'fill',
                    'layout': {},
                    'paint': {
                        'fill-color': '#ff1493',
                        'fill-opacity': 1,
                        'fill-outline-color': '#ffffff'
                    }
                },
                beforeId: 'ogw-facility'
            },
            {
                config: {
                    'id': 'esri.prison',
                    'source': 'esri.prison',
                    'minzoom': 10,
                    'type': 'fill',
                    'layout': {},
                    'paint': {
                        'fill-color': '#ff0000',
                        'fill-opacity': 1,
                        'fill-outline-color': '#ffffff'
                    }
                },
                beforeId: 'ogw-facility'
            },
            {
                config: {
                    'id': 'esri.worship',
                    'source': 'esri.worship',
                    'minzoom': 10,
                    'type': 'symbol',
                    'layout': {
                        'icon-image': `place-of-worship-15`,
                        'icon-allow-overlap': true,
                        'text-field': '{name}',
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold'
                        ],
                        'text-size': 11,
                        // 'text-transform': 'uppercase',
                        'text-letter-spacing': 0.05,
                        'text-offset': [0, 1.5]
                    },
                    'paint': {
                        'text-color': '#202',
                        'text-halo-color': '#fff',
                        'text-halo-width': 2
                    }
                },
                beforeId: 'ogw-facility'
            },
            {
                config: {
                    'id': 'esri.nursing',
                    'source': 'esri.nursing',
                    'minzoom': 10,
                    'type': 'circle',
                    'layout': {},
                    'paint': {
                        'circle-color': '#00ff00',
                        'circle-radius': [
                            'interpolate',
                            ['exponential', 0.5],
                            ['zoom'],
                            2,
                            0.5,
                            20,
                            6
                        ],
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#FFFFFF'
                    }
                },
                beforeId: 'ogw-facility'
            },
            {
                config: {
                    'id': 'esri.medical',
                    'source': 'esri.medical',
                    'minzoom': 10,
                    'type': 'symbol',
                    'layout': {
                        'icon-image': `hospital-15`,
                        'icon-allow-overlap': true,
                        'text-field': '{name}',
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold'
                        ],
                        'text-size': 11,
                        // 'text-transform': 'uppercase',
                        'text-letter-spacing': 0.05,
                        'text-offset': [0, 1.5]
                    },
                    'paint': {
                        'text-color': '#202',
                        'text-halo-color': '#fff',
                        'text-halo-width': 2
                    }
                },
                beforeId: 'ogw-facility'
            }
        ];

        return {
            addDataLayers: function (map, context) {

                var layers = DATA_LAYERS.filter(function (layer) {

                    return !(context === 'facility' &&
                        layer.config.id === 'esri.ozone');

                });

                layers.forEach(function (layerSpec) {

                    if (map.getLayer(layerSpec.config.id) === undefined) {

                        map.addLayer(layerSpec.config, null);

                        map.on('click', layerSpec.config.id, function (e) {

                            var description = EsriLayerService.buildPopup(
                                e.features[0].properties,
                                layerSpec.config.id
                            );

                            new mapboxgl.Popup({
                                maxWidth: 'none'
                            })
                                .setLngLat(e.lngLat)
                                .setHTML(description)
                                .addTo(map);

                        });

                    }

                });

            },
            list: function () {

                return DATA_LAYERS;

            }
        };

    });