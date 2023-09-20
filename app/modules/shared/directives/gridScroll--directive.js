(function() {

    'use strict';

    angular.module('OilGasWatch')
        .directive('gridScroll', [
            '$timeout',
            function($timeout) {
                return {
                    restrict: 'A',
                    link: function(scope, elem, attrs) {

                        // console.log(
                        //     'gridScroll:elem:',
                        //     elem
                        // );

                        // elem.on('mousedown', function(evt) {
                        //
                        //     this.style.pointerEvents = 'none';
                        //
                        //     document.elementFromPoint(evt.clientX, evt.clientY).click();
                        //
                        // });

                        var gridOverlay = document.getElementById('grid-overlay');

                        angular.element(gridOverlay).on('click', function(evt) {

                            // console.log(
                            //     'gridOverlay:click:',
                            //     this,
                            //     evt
                            // );

                            var targetTags = [
                                'a',
                                'button',
                                'th'
                                // 'td'
                            ];

                            var elements = document.elementsFromPoint(evt.clientX, evt.clientY);

                            // console.log(
                            //     'gridOverlay:click:elements:',
                            //     elements
                            // );

                            for (var i = 0; i < elements.length; i++) {

                                var matchEl = elements[i];

                                if (targetTags.indexOf(matchEl.tagName.toLowerCase()) >= 0) {

                                    // console.log(
                                    //     'gridOverlay:click:matchEl:',
                                    //     matchEl
                                    // );

                                    var clickHandler = matchEl.getAttribute('data-ng-click');

                                    // console.log(
                                    //     'gridOverlay:click:matchEl:clickHandler:',
                                    //     clickHandler
                                    // );

                                    // if (angular.isDefined(clickHandler)) {
                                    //
                                    //     $timeout(function() {
                                    //
                                    //         angular.element(matchEl).triggerHandler('click');
                                    //
                                    //         // angular.element(matchEl).click();
                                    //
                                    //         return false;
                                    //
                                    //     }, 0);
                                    //
                                    // } else {
                                    //
                                    //     matchEl.click();
                                    //
                                    //     return false;
                                    //
                                    // }

                                    matchEl.click();

                                    // return false;

                                }

                            }

                        });

                        // angular.element(gridOverlay).on('mouseup', function(evt) {
                        //
                        //     var target = angular.element(elem);
                        //
                        //     target[0].style.pointerEvents = 'auto';
                        //
                        //     // var target = document.getElementById('grid-overlay-scroll-container');
                        //
                        //     // angular.element(target).style.pointerEvents = 'auto';
                        //
                        // });

                        // elem.on('mouseup', function(evt) {
                        //
                        //     this.style.pointerEvents = 'all';
                        //
                        // });

                        // var gridOverlay = document.getElementById('grid-overlay');

                        // angular.element(gridOverlay).on('click', function(evt) {
                        //
                        //     evt.preventDefault();
                        //
                        //     return false;
                        //
                        // });
                        //
                        // elem.on('click', function(evt) {
                        //
                        //     evt.preventDefault();
                        //
                        //     return false;
                        //
                        // });

                        elem.on('scroll', function(evt) {

                            // console.log(
                            //     'gridScroll:evt:',
                            //     evt
                            // );
                            //
                            // console.log(
                            //     'gridScroll:evt.target.scrollTop:',
                            //     evt.target.scrollTop
                            // );

                            var scrollLeft = evt.target.scrollLeft;

                            var leftMargin = 0;

                            if (scrollLeft > 0) {

                                leftMargin = scrollLeft;

                            }

                            var rightPane = document.getElementById('fluid-rows');

                            // console.log(
                            //     'gridScroll:rightPane:',
                            //     rightPane
                            // );

                            var rightPaneHeader = document.getElementById('grid-right-content-header');

                            // console.log(
                            //     'gridScroll:rightPane:',
                            //     rightPane
                            // );

                            // console.log(
                            //     'gridScroll:rightPane.scrollTop:',
                            //     rightPane.scrollTop
                            // );
                            //
                            // console.log(
                            //     'gridScroll:rightPane.offsetTop:',
                            //     rightPane.offsetTop
                            // );

                            // if (leftMargin <= evt.target.scrollLeftMax) {
                            //
                            //     // $timeout(function () {
                            //
                            //         scope.$apply(function () {
                            //
                            //             rightPane.style.marginLeft = '-' + leftMargin + 'px';
                            //
                            //         });
                            //
                            //     // }, 10);
                            //
                            //     // scope.$apply(function () {
                            //     //
                            //     //     rightPane.style.marginLeft = '-' + leftMargin + 'px';
                            //     //
                            //     // });
                            //
                            // }

                            // var rightContent = document.getElementById('grid-right-content');
                            //
                            // console.log(
                            //     'gridScroll:rightContent:',
                            //     rightContent
                            // );
                            //
                            // console.log(
                            //     'gridScroll:rightContent.scrollTop:',
                            //     rightContent.scrollTop
                            // );
                            //
                            // console.log(
                            //     'gridScroll:rightContent.offsetTop:',
                            //     rightContent.offsetTop
                            // );

                            var leftPane = document.getElementById('fixed-rows');

                            // console.log(
                            //     'gridScroll:leftPane[1]:',
                            //     leftPane
                            // );

                            // console.log(
                            //     'gridScroll:leftPane.scrollTop:',
                            //     leftPane.scrollTop
                            // );

                            // if (leftMargin < evt.target.scrollLeftMax) {

                                // $timeout(function () {

                                    scope.$apply(function () {

                                        // rightPane.style.marginLeft = '-' + leftMargin + 'px';

                                        var leftOffset = leftPane.offsetWidth - leftMargin;

                                        // if (evt.target.scrollLeft > 0) {
                                        //
                                        //     leftOffset = '-' + leftOffset;
                                        //
                                        // }

                                        // console.log(
                                        //     'gridScroll:leftOffset:',
                                        //     leftOffset
                                        // );

                                        rightPane.style.transform = [
                                            'translate3d(',
                                            (leftOffset + 'px, '),
                                            ('-' + evt.target.scrollTop + 'px'),
                                            ', 0px)'
                                        ].join('');

                                        // console.log(
                                        //     'gridScroll:rightPane[2]:',
                                        //     rightPane
                                        // );

                                        rightPaneHeader.style.transform = [
                                            'translate3d(',
                                            (leftOffset + 'px, '),
                                            '0px, 0px)'
                                        ].join('');

                                        // leftPane.style.left = leftMargin + 'px';

                                        leftPane.style.transform = [
                                            'translate3d(',
                                            // ('-' + leftMargin + 'px, '),
                                            '0px, ',
                                            ('-' + evt.target.scrollTop + 'px'),
                                            ', 0px)'
                                        ].join('');

                                        // console.log(
                                        //     'gridScroll:leftPane[2]:',
                                        //     leftPane
                                        // );

                                    });

                                // }, 10);

                            // }

                            // if (evt.target.scrollTop < evt.target.scrollTopMax) {
                            //
                            //     // $timeout(function () {
                            //
                            //         scope.$apply(function () {
                            //
                            //             leftPane.scrollTop = evt.target.scrollTop;
                            //
                            //         });
                            //
                            //     // }, 10);
                            //
                            // }

                        });

                    }
                };
            }

        ]);

}());