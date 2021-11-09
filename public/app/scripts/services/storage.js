'use strict';

/**
* @ngdoc service
* @name App.storage
* @description
* # storage
* Factory in the App.
*/
App.factory('storage', ['$rootScope', function ($rootScope) {

    var service = {

        model: {},

        saveState: function (key, model) {
            service.model[key] = model;
            localStorage[key] = angular.toJson(service.model[key]);
        },

        restoreState: function (key) {
            if (localStorage.getItem(key) !== null) {
                service.model[key] = angular.fromJson(localStorage[key]);
            }
        },

        autoSave: function (key, model) {
            $(window).on('unload', function () {
                service.saveState(key, model);
            });
        }
    };

    $rootScope.$on("savestate", service.saveState);
    $rootScope.$on("restorestate", service.restoreState);

    return service;
}]);
