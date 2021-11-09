'use strict';

/*
*
*
* todo: create address verif filter
*
*
* */


App.controller('MainCtrl', function ($scope, socket, storage, $filter) {

    // todo : create directive for master device checking

    $scope.isMaster = false;

    /*
    *
    * OSC model + localStorage
    *
    * */


    // todo : create a "return to default" button + directive
    //localStorage.clear();

    storage.restoreState('osc');

    if(storage.model['osc'] !== undefined){
        $scope.osc = storage.model['osc'];
    } else {
        $scope.osc = {
            input: "1515",
            output: "2020"
        };
    }

    storage.autoSave('osc', $scope.osc);

    /*
    *
    * faders model + localStorage
    *
    * */

    storage.restoreState('faders');

    // todo : create a system to add new faders dynamically

    if(storage.model['faders'] !== undefined){
        $scope.faders = storage.model['faders'];
    } else {
        $scope.faders = [
            {address:'/f0', y:0},
            {address:'/f1', y:0},
            {address:'/f2', y:0},
            {address:'/f3', y:0},
            {address:'/f4', y:0},
            {address:'/f5', y:0},
            {address:'/f6', y:0},
            {address:'/f7', y:0}
        ];
    }

    storage.autoSave('faders', $scope.faders);

    /*
    *
    *
    *
    *
    * */

    // callback from fader directive

    $scope.onFaderInput = function (address, value) {

        var normVal = $filter('normalizeRange')(value);

        socket.emit('osc-send', {
            address: address,
            args: [normVal]
        });

        updateFader(address, normVal);
    };

    // socket.io

    $scope.onPortChange = function () {
        socket.emit('port-change', {
            inport: $scope.osc.input,
            outport: $scope.osc.output
        });
    };

    socket.on('osc-broadcast', function (m) {
        updateFader(m.address, m.args['0']);
    });

    socket.on('osc-receive', function (m) {
        if(!$scope.isMaster){
            updateFader(m['0'][0], m['0'][1]);
        }
    });

    /*
    *
    *
    * privates
    *
    *
    * */

    var updateFader = function (address, value) {

        // todo : modify id assignment system to save CPU

        var id = $filter('stringToDigit')(address);
        $scope.faders[id].y = value;
    };

});
