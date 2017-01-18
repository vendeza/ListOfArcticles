(function (ng, rangy) {
    'use strict';

    ng.module('editor.editTask')
        .controller('EditTaskCtrl', EditTaskCtrl);

    EditTaskCtrl.$inject = ['$scope', '$location'];

    function EditTaskCtrl($scope, $location) {
        this.task = {
            title: '',
            icon: null,
            type: '',
            description: '',
            point: '',
            answer: [],
            hint: '',
            penaltyPoint: null
        };
    }

    EditTaskCtrl.prototype = {}

})(angular, rangy);
