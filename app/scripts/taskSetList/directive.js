(function(ng, $) {
    'use strict';

    ng.module('editor.taskSetList')
        .directive('taskSetList', TaskSetList);
    TaskSetList.$inject = [];

    function TaskSetList() {
        return {
            restrict: "AE",
            scope: {
                onEditArticle: '&'
            },
            // bindToController: true,
            controllerAs: 'taskSetListCtrl',
            controller: 'TaskSetListCtrl',
            templateUrl: 'taskSetListCtrl/index.html',
            link: function(scope, element, attrs, taskSetListCtrl) {
            }
        };
    }
})(angular, jQuery);
