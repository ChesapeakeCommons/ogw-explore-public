'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('MarkdownParser', function ($window) {

        var md = $window.markdownit();

        return {
            render: function (value) {

                try {

                    var result = md.render(value);

                    console.log(
                        'MarkdownParser:render().result:',
                        result
                    );

                    return result;

                } catch (e) {

                    return '';

                }

            }

        };

    });