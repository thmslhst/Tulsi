'use strict';

/**
* @ngdoc directive
* @name App.directive:fader
* @description
* # fader
*/

App.directive('fader', function ($filter) {

    return {

        restrict: 'EA',
        replace: true,

        scope:{
            address:'=',
            y: '=',
            callback:'='
        },

        templateUrl: 'templates/fader.html',

        link: function (scope, element, attrs) {

            var container = element[0];
            var cursor = element.children()[0];

            /*
            *
            * helpers
            *
            * */

            var windowToFader = function (input) {
                return input / (container.offsetHeight - cursor.offsetHeight);
            };

            var faderToWindow = function (input) {
                return input * (container.offsetHeight - cursor.offsetHeight);
            };

            /*
            *
            * fader
            *
            * */

            var fader = new Draggabilly(cursor, {
                axis: 'y',
                containment: true
            });

            fader.on('dragMove', function (instance) {
                var value = windowToFader(instance.position.y);
                if(scope.$parent.isMaster){
                    scope.$apply(scope.callback(scope.address, value));
                }
            });

            /*
            *
            *
            * set position
            * - localStorage or remote (socket.io, OSC) -
            *
            * */

            var id = $filter('stringToDigit')(scope.address);
            fader.dragPoint.y = faderToWindow(scope.$parent.faders[id].y);
            fader.positionDrag();

            // bind y

            scope.$watch('y', function(newValue){
                if(!scope.$parent.isMaster){
                    fader.dragPoint.y = faderToWindow(newValue);
                    fader.positionDrag();
                }
            });

            // todo : reflow

            /*
            *
            * reflow
            *
            * */

            $(window).on('resize', function(){
                //fader.reflow();
            });

            /*
            *
            * master
            *
            * */

            element.children().on('mousedown touchstart', function(){
                scope.$parent.isMaster = true;
            });

            // todo : should listen to element instead of document, but buggy...

            $(document).on('mouseup touchend', function(){
                scope.$parent.isMaster = false;
            });

        }
    };
});