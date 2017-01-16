(function (ng, $) {
    'use strict';

    ng.module('emias.ui.grid')
        .directive('euiGridRows', GridRows);
    GridRows.$inject = [];

    function GridRows() {
        return {
            restrict: 'AE',
            require: '^euiGrid',
            scope: {
                truncateText: '@',
                onRowsSelected: '&',
                onRowClicked: '&'
            },
            templateUrl: '/pages/common/grid/templates/eui-grid-rows.html',
            link: function (scope, element, attrs, gridCtrl) {
                scope.gridCtrl = gridCtrl;
                scope.config = gridCtrl.config;
                gridCtrl.selectedRowsCallback = scope.onRowsSelected;

                attrs.$observe('truncateText', function (newValue) {
                    scope.truncateText = scope.truncateText !== 'false';
                });

                scope.$watch('gridCtrl.selectedItem', function (newValue) {
                    scope.selectedItem = newValue;
                });

                scope.stopPropagation = function ($event) {
                    $event.stopImmediatePropagation();
                };

                scope.isRowSelected = function (row) {
                    if (scope.selectType !== 'single') {
                        return row.selected;
                    }

                    return scope.selectedItem === row;
                };
            }
        };
    }
})(angular, jQuery);
