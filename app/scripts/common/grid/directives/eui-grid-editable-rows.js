(function (ng, $) {
    'use strict';

    var GridEditableRows = function () {
        return {
            restrict: 'AE',
            require: '^euiGrid',
            scope: {
                selectType: '@',
                selectedItem: '=',
                globalEditMode: '=',
                editType: '@',
                showButtons: '@',
                onUpdate: '&',
                onDelete: '&',
                onRowsSelected: '&'
            },
            templateUrl: '/pages/common/grid/templates/eui-grid-editable-rows.html',
            link: function (scope, element, attrs, gridCtrl) {
                scope.gridCtrl = gridCtrl;
                scope.config = gridCtrl.config;
                gridCtrl.selectedRowsCallback = scope.onRowsSelected;

                scope.$watch('gridCtrl.selectedItem', function (newValue, oldValue) {
                    scope.selectedItem = newValue;
                });

                scope.$watch('globalEditMode', function (newValue, oldValue) {
                    gridCtrl.disableSelectAll = newValue;
                });

                attrs.$observe('deletable', function (newValue, oldValue) {
                    scope.deletable = newValue === "true";
                });

                attrs.$observe('showButtons', function (newValue, oldValue) {
                    scope.showButtons = newValue === "true";
                    scope.config.actionsColumn = scope.showButtons;
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

                scope.isEditMode = function (row, col) {
                    if (scope.editType === 'always') return true;

                    if (scope.selectType !== 'single') {
                        if (col === undefined) return row.editMode;
                        return col.editable && row.editMode;
                    }
                };

                scope.onBeginEdit = function (row) {
                    row._originalData = ng.copy(row);
                    row.editMode = true;
                };

                scope.onSaveEdit = function (row) {
                    row.editMode = false;
                    delete row._originalData;
                    gridCtrl._renderRow(row, gridCtrl.rows.indexOf(row));
                    if (scope.onUpdate) scope.onUpdate({ row: row });
                };

                scope.onCancelEdit = function (row) {
                    ng.extend(row, row._originalData);
                    row.editMode = false;
                    delete row._originalData;
                };
            }
        };
    };

    ng.module('emias.ui.grid')
        .directive('euiGridEditableRows', [ GridEditableRows ]);
})(angular, jQuery);
