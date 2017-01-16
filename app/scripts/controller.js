(function(ng, rangy) {
    'use strict';

    ng.module('editor')
        .controller('EditorCtrl', EditorCtrl);

    EditorCtrl.$inject = ['$scope', '$timeout'];

    function EditorCtrl($scope, $timeout) {
        fakeLoading();

        function fakeLoading() {
            $scope.isLoading = true;

            $timeout(function() {
                $scope.isLoading = false;
            }, 1000);
        }
    }

})(angular, rangy);
