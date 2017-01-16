(function(ng, $) {
    'use strict';

    ng.module('editor.listUnits')
        .directive('listUnits', ListUnits);
    ListUnits.$inject = [];

    function ListUnits() {
        return {
            restrict: "AE",
            scope: {
                onEditArticle: '&'
            },
            // bindToController: true,
            controllerAs: 'articlesListCtrl',
            controller: 'ArticlesListCtrl',
            templateUrl: '/pages/articlesList/index.html',
            link: function(scope, element, attrs, articlesListCtrl) {
            }
        };
    }
})(angular, jQuery);
