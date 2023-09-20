'use strict';

/**
 * @ngdoc service
 * @name cleanWaterCommunitiesApp.Site
 * @description
 * # Site
 * Service in the cleanWaterCommunitiesApp.
 */

var accessToken = '{accessToken}';

angular.module('Mapbox')
    .constant('mapbox', {
        geocodingUrl: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/',
        accessToken: accessToken,
        baseStyles: [
            {
                'name': 'Streets',
                'url': 'mapbox://styles/mapbox/streets-v11'
            },
            {
                'name': 'Satellite',
                'url': 'mapbox://styles/mapbox/satellite-streets-v11'
            },
            {
                'name': 'Outdoors',
                'url': 'mapbox://styles/mapbox/outdoors-v11'
            },
            {
                'name': 'Light',
                'url': 'mapbox://styles/mapbox/light-v10'
            },
            {
                'name': 'Dark',
                'url': 'mapbox://styles/mapbox/dark-v10'
            }
        ],
        backdropOptions: {
            center: [-103.771556, 44.967243], // starting position [lng, lat]
            container: 'backdrop-map',
            zoom: 5, // starting zoom,
            maxZoom: 16,
            interactive: false,
            style: 'mapbox://styles/mapbox/satellite-v9'
        },
        staticOptions: {
            center: [0, 0], // starting position [lng, lat]
            container: 'static-map',
            zoom: 12, // starting zoom,
            maxZoom: 16,
            interactive: false,
            style: 'mapbox://styles/mapbox/dark-v10'
        },
        defaultOptions: {
            center: [-103.771556, 44.967243], // starting position [lng, lat]
            zoom: 2, // starting zoom,
            // maxBounds: [
            //     -180,
            //     -90,
            //     10,
            //     90
            // ],
            minZoom: 2,
            maxZoom: 20
        },
        standardStyles: [
            {
                'label': 'Streets',
                'id': 'mapbox://styles/mapbox/streets-v11',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-73.985656,40.748433,10/100x100@2x?access_token=' + accessToken
            },
            {
                'label': 'Outdoors',
                'id': 'mapbox://styles/mapbox/outdoors-v11',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/-121.7752,36.2514,14/300x200?access_token=' + accessToken
            },
            {
                'label': 'Light',
                'id': 'mapbox://styles/mapbox/light-v10',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-73.985277,40.748333,11/300x200?access_token=' + accessToken
            },
            {
                'label': 'Dark',
                'id': 'mapbox://styles/mapbox/dark-v10',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-71.09,42.36,11/300x200?access_token=' + accessToken
            },
            {
                'label': 'Satellite',
                'id': 'mapbox://styles/mapbox/satellite-v9',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/140.01,-21.24,3/300x200?access_token=' + accessToken
            },
            {
                'label': 'Satellite Streets',
                'id': 'mapbox://styles/mapbox/satellite-streets-v11',
                'staticSrc': 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/-77.02361,38.89,13,0,0/300x200?access_token=' + accessToken
            }
        ]
    });