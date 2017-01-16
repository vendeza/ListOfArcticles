(function (ng, $) {
    'use strict';

    ng.module('emias.ui.grid')
        .directive('euiGrid', Grid);
    Grid.$inject = [ '$parse', '$filter', '$timeout' ];

    function Grid($parse, $filter, $timeout) {
        return {
            restrict: "AE",
            scope: {
                columns: '=',
                rows: '=',
                theme: '@',
                selectType: '@',
                selectedItem: '=',
                autoWidth: '@',
                scrollable: '@'
            },
            bindToController: true,
            controllerAs: 'gridCtrl',
            controller: 'gridCtrl',
            transclude: true,
            template: '<div class="eui-grid" ng-class="{\'eui-m-scrollable\': scrollable}"  ng-transclude></div>',
            link: function (scope, element, attrs, gridCtrl) {
                var tableWrapper = $('.eui-grid', element);
                gridCtrl.config.theme = attrs.theme;

                attrs.$observe('scrollable', function (newValue) {
                    scope.scrollable = scope.scrollable === "true";
                });

                attrs.$observe('selectType', function (newValue) {
                    gridCtrl.selectType = newValue;
                });

                gridCtrl.setStickyColumns = function () {
                    tableWrapper.scroll(function (event) {
                        var clientRect = $(event.target).scrollTop();
                        $('.eui-grid-head-wrapper', element).css({top: clientRect + 'px'});
                    });
                };

                gridCtrl.setColumns = function (columns) {
                    scope.columns = gridCtrl.columns = columns;
                };

                gridCtrl._renderRows = function () {
                    if (!gridCtrl.rows) return;

                    gridCtrl.columns.forEach(function (col) {
                        col.parser = $parse(col.name);
                    });

                    gridCtrl.rows.forEach(function (row, rowIndex) {
                        gridCtrl._renderRow(row, rowIndex);
                    });
                };

                gridCtrl._renderRow = function (row, rowIndex) {
                    row._renderData = {};
                    gridCtrl.columns.forEach(function (column) {
                        var value = column.parser(row);
                        if (column.renderer) {
                            row._renderData[column.name] = column.renderer(value, row, rowIndex);
                        } else {
                            if (column.filterType === 'date') {
                                row._renderData[column.name] = $filter('date')(value, 'dd.MM.yyyy');
                            } else {
                                row._renderData[column.name] = value;
                            }
                        }
                    });
                };

                if (gridCtrl.rows && gridCtrl.rows.length > 0) {
                    gridCtrl._renderRows();
                }

                scope.$watchCollection('gridCtrl.columns', function (newValue, oldValue) {
                    if (newValue === oldValue) return;
                    gridCtrl._renderRows();
                });

                scope.$watchCollection('gridCtrl.rows', function (newValue, oldValue) {
                    if (newValue === oldValue) return;
                    gridCtrl._renderRows();
                });
            }
        };
    }
})(angular, jQuery);
