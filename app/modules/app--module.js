'use strict';

/**
 * @ngdoc overview
 * @name
 * @description
 */
angular
    .module('OilGasWatch', [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ipCookie',
        'angularFileUpload',
        'geolocation',
        'monospaced.elastic',
        'angularMoment',
        'config',
        'MapboxGL',
        'MapboxGLGeocoding',
        'Mapbox',
        'save2pdf',
        'collaborator',
        'ui.bootstrap',
        'angular-progress-arc',
        'StorageService',
    ]).config(function ($sceDelegateProvider, environment) {

    //
    // Wrap `console.log` for conditional logging.
    //

    (function (fn) {
        console.log = function () {
            if (environment.name.indexOf('local') >= 0 ||
                environment.name.indexOf('dev') >= 0) {
                fn.apply(void 0, arguments);
            }
        };
    })(console.log);

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://localhost:8000/**',
        // Allow loading from API endpoints.
        'http://localhost:4000/v1/tpl/**',
    ]);

});