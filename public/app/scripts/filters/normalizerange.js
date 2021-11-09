'use strict';

/**
* @ngdoc filter
* @name App.filter:normalizeRange
* @function
* @description
* # normalizeRange
* Filter in the App.
*/

App.filter('normalizeRange', function () {
    return function (input) {
        return 1 - (Math.round(input * 100) / 100);
    };
});