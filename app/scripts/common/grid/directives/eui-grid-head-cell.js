(function (ng, $) {
    'use strict';

    ng.module('emias.ui.grid')
        .directive('euiGridHeadCell', GridHeadCell);
    GridHeadCell.$inject = ['$document', '$timeout'];

    function GridHeadCell($document, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                column: '=',
                resizable: '@',
                theme: '=',
                onSort: '&',
                onApplyFilter: '&',
                onOpenFilter: '&'
            },
            templateUrl: '/pages/common/grid/templates/eui-grid-head-cell.html',
            link: function (scope, element, attrs) {
                element.addClass('eui-grid-head-cell');

                scope.$watch('column.width', function (newValue) {
                    element.width(newValue - 40);
                });

                attrs.$observe("resizable", function () {
                    scope.resizable = scope.resizable !== "false";
                });

                scope.onSetSortColumn = function (col, direction, $event) {
                    col.direction = direction;
                    if (scope.onSort) scope.onSort({column: col, direction: direction, $event: $event});
                    scope.onCloseFilterPanel(col);
                };

                scope.onCloseFilterPanel = function (column) {
                    column.isExpanded = false;
                };

                scope.onSortColumn = function (col, $event) {
                    var direction = col.sort === 'asc' ? 'desc' : 'asc';
                    scope.onSetSortColumn(col, direction, $event);
                };

                scope.onApplyFilterPanel = function(column) {
                    scope.onCloseFilterPanel(column);
                    if (scope.onApplyFilter) scope.onApplyFilter({column: column});
                };

                scope.onOpenFilterPanel = function($event, column) {
                    $event.stopPropagation();

                    var $cell = $($event.target).parents(".eui-grid-head-cell");
                    var $grid = $cell.parents(".eui-grid");
                    var $panel = $(".eui-grid-head-cell-panel", $cell);
                    var cssStyles = { top: $cell.outerHeight() - 2 };
                    var alignLeft = ($cell.offset().left + $panel.width()) <= ($grid.width());
                    if (alignLeft) {
                        cssStyles.left = -1;
                        cssStyles.right = "auto";
                    } else {
                        cssStyles.right = -1;
                        cssStyles.left = "auto";
                    }

                    $panel.css(cssStyles);
                    if (scope.onOpenFilter) scope.onOpenFilter(column);
                    column.isExpanded = true;
                };

            }
        };
    }
})(angular, jQuery);
