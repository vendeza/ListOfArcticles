(function(ng, $) {
    'use strict';

    ng.module('editor.editTask')
        .directive('editTask', EditTask);
    EditTask.$inject = [];

    function EditTask() {
        return {
            restrict: "AE",
            scope: {
                onEditArticle: '&'
            },
            // bindToController: true,
            controllerAs: 'editTaskCtrl',
            controller: 'EditTaskCtrl',
            templateUrl: '/pages/index.html',
            link: function(scope, element, attrs, editTaskCtrl) {
            }
        };
    }
})(angular, jQuery);
