(function (ng, $) {
    'use strict';

    ng.module('editor.common.window')
        .directive('window', Window);
    Window.$inject = ['$rootScope'];

    function Window($rootScope) {
        return {
            restrict: "AE",
            scope: {
            },
            templateUrl: '/pages/common/window/index.html',
            link: function (scope, element, attrs, ctrl) {

                $rootScope.$on('showWindow', function (event, title, text) {
                    scope.title = title;
                    scope.text = text;
                    $('#myModal').modal('show');
                });
            }
        };
    }
})(angular, jQuery);
