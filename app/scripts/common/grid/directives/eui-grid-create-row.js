(function (ng, $) {
    'use strict';
    ng.module('emias.ui.grid')
        .directive('euiGridCreateRow', GridCreateRow);

    GridCreateRow.$inject = [];

    function GridCreateRow() {
        return {
            restrict: 'AE',
            require: '^euiGrid',
            scope: {
                showSelectColumn: '@',
                showAddButton: '@',
                row: '=newRecord',
                onCreate: '&'
            },
            templateUrl: '/pages/common/grid/templates/eui-grid-create-row.html',
            link: function (scope, element, attrs, gridCtrl) {
                scope.gridCtrl = gridCtrl;
                scope.config = gridCtrl.config;

                attrs.$observe('showAddButton', function () {
                    scope.showAddButton = scope.showAddButton !== 'false';
                });
                attrs.$observe('showSelectColumn', function () {
                    scope.showSelectColumn = scope.showSelectColumn === 'true';
                });
                scope.stopPropagation = function ($event) {
                    $event.stopImmediatePropagation();
                };

                scope.onCreateRow = function () {
                    var row = ng.copy(scope.row);
                    if (row && row._renderData) {
                        delete row._renderData;
                    }
                    if (scope.onCreate) {
                        scope.onCreate({ row: row });
                    }
                };
            }
        };
    }
})(angular, jQuery);
