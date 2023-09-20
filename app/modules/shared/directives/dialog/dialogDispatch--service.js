'use strict';

/**
 * @ngdoc service
 * @name OilGasWatch.template
 * @description
 * # template
 * Provider in the OilGasWatch.
 */
angular.module('OilGasWatch')
    .service('DialogDispatch', [
        '$rootScope',
        function ($rootScope) {

            return {
                send: function (event, data, toggleScroll) {

                    console.log(
                        'DialogDispatch.send:event:',
                        event
                    );

                    console.log(
                        'DialogDispatch.send:data:',
                        data
                    );

                    console.log(
                        'DialogDispatch.send:toggleScroll:',
                        toggleScroll
                    );

                    $rootScope.$broadcast(event, data);

                    if (toggleScroll) this.toggleScroll();

                },
                resetScroll: function () {

                    console.log(
                        'DialogDispatch.resetScroll:startSet:',
                        $rootScope.disableBodyScroll
                    );

                    setTimeout(function () {

                        $rootScope.$apply(function () {
                            $rootScope.disableBodyScroll = false;
                        });

                        console.log(
                            'DialogDispatch.resetScroll:endSet:',
                            $rootScope.disableBodyScroll
                        );

                    }, 10);

                },
                toggleScroll: function () {

                    console.log(
                        'DialogDispatch.toggleScroll:startSet:',
                        $rootScope.disableBodyScroll
                    );

                    setTimeout(function () {

                        $rootScope.$apply(function () {
                            $rootScope.disableBodyScroll = !$rootScope.disableBodyScroll;
                        });

                        console.log(
                            'DialogDispatch.toggleScroll:endSet:',
                            $rootScope.disableBodyScroll
                        );

                    }, 10);

                }
            };

        }]);