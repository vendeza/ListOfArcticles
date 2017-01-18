(function(ng, $) {
    'use strict';

    ng.module('editor.editTaskSet')
        .directive('editTaskSet', EditTaskSet);
    EditTaskSet.$inject = [];

    function EditTaskSet() {
        return {
            restrict: "AE",
            scope: {
                onEditArticle: '&'
            },
            // bindToController: true,
            controllerAs: 'editTaskSetCtrl',
            controller: 'EditTaskSetCtrl',
            templateUrl: 'editTaskSetCtrl/index.html',
            link: function(scope, element, attrs, editTaskSetCtrl) {
            }
        };
    }
})(angular, jQuery);
