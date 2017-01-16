(function (ng, $) {
    'use strict';

    var GridColumns = function ($document, $timeout) {
        return {
            restrict: "AE",
            require: '^euiGrid',
            scope: {
                sticky: "@",
                firstColumn: "@",
                resizable: "@",
                onResize: "&",
                reorderable: "@",
                onReorder: "&",
                onColumnSorted: "&",
                onColumnFiltered: "&"
            },
            templateUrl: '/pages/common/grid/templates/eui-grid-columns.html',
            link: function (scope, element, attrs, gridCtrl) {
                scope.gridCtrl = gridCtrl;
                scope.config = gridCtrl.config;
                scope.currentPanel = null;

                scope.sticky = scope.sticky !== "false";

                attrs.$observe("resizable", function (newValue) {
                    scope.resizable = scope.resizable !== "false";
                });

                attrs.$observe("sticky", function (newValue) {
                    scope.sticky = scope.sticky !== "false";
                });

                attrs.$observe("firstColumn", function (newValue, oldValue) {
                    if (newValue === oldValue) return;
                    scope.firstColumn = newValue;
                });

                if (scope.sticky) {
                    $timeout(function() {
                        gridCtrl.setStickyColumns();
                    }, 10);
                }

                scope.onSetSortColumn = function (col, direction, $event) {
                    col.direction = direction;
                    if (scope.onColumnSorted) scope.onColumnSorted({column: col, $event: $event});
                };

                scope.onOpenFilter = function (column) {
                    gridCtrl.columns.forEach(function (col) {
                        col.isExpanded = false;
                    });
                };

                scope.onApplyFilterPanel = function(column) {
                    if (scope.onColumnFiltered) scope.onColumnFiltered({column: column});
                };

                var resizer = {
                    prevX: 0,
                    col: null,
                    colElement: null,
                    onMouseDown: function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        resizer.startX = event.clientX;
                        resizer.col = ng.element(event.target).scope().column;
                        resizer.startWidth = resizer.col.width;
                        resizer.colElement = $(event.target).parents('.eui-table-cell');
                        $document.on('mousemove', resizer.onMouseMove);
                        $document.on('mouseup', resizer.onMouseUp);
                        $document[0].body.style.cursor = 'col-resize';
                    },
                    onMouseMove: function (event) {
                        var newWidth = (resizer.startWidth + event.clientX - resizer.startX);
                        if (resizer.col.minWidth && newWidth <= (resizer.col.minWidth + 3))
                        {
                            newWidth = resizer.col.minWidth;
                        }

                        if (newWidth < 40) {
                            newWidth = 40;
                        }

                        scope.$apply(function () {
                            resizer.col.width = newWidth;
                        });
                    },
                    onMouseUp: function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $document.unbind('mousemove', resizer.onMouseMove);
                        $document.unbind('mouseup', resizer.onMouseUp);
                        if (scope.onResize) scope.onResize({column: resizer.col});
                        $document[0].body.style.cursor = 'auto';
                    }
                };
                if (scope.resizable) {
                    element.on('mousedown', '.eui-grid-resize-handler', resizer.onMouseDown);
                }

                var reorder = {
                    prevX: 0,
                    prevY: 0,
                    col: null,
                    prevColumnMark: null,
                    columnsCoords: [],
                    debounceTimer: null,
                    handler: $('.eui-grid-drag-handler', element),
                    columnMark: $('.eui-grid-column-place-mark', element),
                    elementOffset: 0,
                    onMouseDown: function (event) {
                        reorder.elementOffset = element.offset();
                        $document.on('mouseup', reorder.resetTimer);
                        $document.on('selectstart', reorder.preventSelection);
                        reorder.debounceTimer = setTimeout(function () { reorder.handleMouseDown(event); }, 500);
                    },
                    resetTimer: function () {
                        $document.unbind('mouseup', reorder.resetTimer);
                        $document.unbind('selectstart', reorder.preventSelection);
                        clearTimeout(reorder.debounceTimer);
                    },
                    preventSelection: function (event) {
                        event.preventDefault();
                        return false;
                    },
                    handleMouseDown: function (event) {
                        $document.unbind('mouseup', reorder.resetTimer);
                        event.preventDefault();
                        event.stopPropagation();

                        reorder.prevX = event.clientX;
                        reorder.prevY = event.clientY;

                        var scope = ng.element(event.target).scope();
                        reorder.col = scope.col;

                        var nextOrder = 1;
                        reorder.columnsCoords = Array.prototype.map.call($('.eui-grid-head-cell-title', element), function (el) {
                            var $cell = $(el).parents(".eui-grid-head-cell");
                            return {
                                limit: $cell.offset().left + ($cell.width() / 2),
                                col: ng.element(el).scope().col,
                                el: $cell.get(0)
                            };
                        });

                        reorder.columnsCoords.forEach(function (x) {
                            if (!x.col.order) x.col.order = nextOrder++;
                        });

                        if (reorder.columnsCoords.length <= 1) return;

                        reorder.handler.show().text(reorder.col.title);
                        reorder.handler.offset({top: reorder.prevY, left: reorder.prevX});

                        reorder.columnMark.css({left: reorder.columnsCoords[1].el.offsetLeft - 12});
                        reorder.columnMark.show();

                        $document.on('mousemove', reorder.onMouseMove);
                        $document.on('mouseup', reorder.onMouseUp);
                        $document[0].body.style.cursor = 'move';
                    },
                    onMouseMove: function (event) {
                        reorder.prevX = event.clientX + element.scrollLeft();
                        reorder.prevY = event.clientY;
                        var newColumn = null;
                        if (reorder.columnsCoords[0].limit >= reorder.prevX) {
                            newColumn = reorder.columnsCoords[0];
                            reorder.col.newOrder = 0.5;
                        } else if (reorder.columnsCoords[reorder.columnsCoords.length - 1].limit <= reorder.prevX) {
                            newColumn = reorder.columnsCoords[reorder.columnsCoords.length - 1];
                            reorder.columnMark.css({left: newColumn.el.offsetLeft + newColumn.el.offsetWidth - 8});
                            reorder.col.newOrder = newColumn.col.order + 0.5;
                            return;
                        } else {
                            for (var i = 0; i < reorder.columnsCoords.length; i++) {
                                var cur = reorder.columnsCoords[i];
                                if (cur.limit < reorder.prevX) {
                                    newColumn = reorder.columnsCoords[i + 1];
                                }
                            }
                        }
                        if (newColumn !== null) {
                            reorder.prevColumnMark = newColumn;
                            reorder.col.newOrder = newColumn.col.order - 0.5;
                            reorder.columnMark.css({left: newColumn.el.offsetLeft - 5});
                        }

                        reorder.handler.offset({top: event.pageY, left: event.pageX});
                    },
                    onMouseUp: function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        reorder.handler.hide();
                        reorder.columnMark.hide();

                        reorder.columnsCoords.sort(function (a, b) {
                            if (a.col.newOrder) return a.col.newOrder - b.col.order;
                            if (b.col.newOrder) return a.col.order - b.col.newOrder;
                            return a.col.order - b.col.order;
                        });

                        var nextOrder = 1;
                        reorder.columnsCoords.forEach(function (x) {
                            delete x.col.newOrder;
                            x.col.order = nextOrder++;
                        });

                        scope.$apply(function () {
                            gridCtrl.setColumns(reorder.columnsCoords.map(function (x) { return x.col; }));
                            if (scope.onReorder) {
                                scope.onReorder({
                                    columns: gridCtrl.columns
                                });
                            }
                        });

                        $document.unbind('selectstart', reorder.preventSelection);
                        $document.unbind('mousemove', reorder.onMouseMove);
                        $document.unbind('mouseup', reorder.onMouseUp);
                        $document[0].body.style.cursor = 'auto';
                    }
                };

                element.on('mousedown', '.eui-grid-head-cell-title', reorder.onMouseDown);
            }
        };
    };

    ng.module('emias.ui.grid')
        .directive('euiGridColumns', [ '$document', '$timeout', GridColumns ]);
})(angular, jQuery);
