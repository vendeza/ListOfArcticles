(function (ng, $) {
    'use strict';

    ng.module('emias.ui.grid')
        .controller('gridCtrl', GridController);
    GridController.$inject =[ '$scope' ];

    function GridController($scope) {
        var ctrl = this;
        ctrl.allSelected = false;
        ctrl.config = { };

        ctrl.onChangeRow = function (row) {
            ctrl.onRowsSelected();
        };

        ctrl.deselectRow = function (row) {

            if (ctrl.selectType === 'multiple') {
                ctrl.rows.forEach(function (x) {
                    x.selected = false;
                });
                row.selected = true;
                ctrl.onRowsSelected();
            }

            if (ctrl.selectType === 'single') {
                ctrl.selectedItem = row;
            }
        };

        ctrl.onRowsSelected = function () {
            var selectedRows = ctrl.rows.filter(function (x) {
                return x.selected;
            });
            if (ctrl.selectedRowsCallback) ctrl.selectedRowsCallback({rows: selectedRows});
            ctrl.calculateSelected();
        };

        ctrl.calculateSelected = function () {
            ctrl.selectedCount = ctrl.rows.filter(function (x) {
                return x.selected;
            }).length;
            ctrl.allSelected = ctrl.selectedCount === ctrl.rows.length;
        };

        ctrl.toggleSelectAll = function () {
            ctrl.rows.forEach(function (x) {
                x.selected = ctrl.allSelected;
            });
            ctrl.onRowsSelected();
            ctrl.calculateSelected();
        };
    }
})(angular, jQuery);
