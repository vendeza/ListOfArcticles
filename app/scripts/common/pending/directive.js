(function (ng, $) {
    'use strict';

    ng.module('editor.common.pending')
        .directive('pending', Pending);
    Pending.$inject = [];

    function Pending() {
        return {
            restrict: 'AE',
            scope: {
                isLoading: '='
            },
            templateUrl: '/pages/common/pending/index.html',
            link: function (scope, element, attrs) {

            }
        };
    }
})(angular, jQuery);
