'use strict';

/**
 * @ngdoc filter
 * @name App.filter:addressToId
 * @function
 * @description
 * # addressToId
 * Filter in the App.
 */

App.filter('stringToDigit', function () {
    return function (input) {
        return input.replace(/[^0-9\.]+/g, '');
    };
});