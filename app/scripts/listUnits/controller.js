(function (ng, rangy) {
    'use strict';

    ng.module('editor.listUnits')
        .controller('ListUnitsCtrl', ListUnitsCtrl);

    ListUnitsCtrl.$inject = ['$scope', '$location'];

    function ListUnitsCtrl($scope, $location) {
        this.$location = $location;

        $scope.getFakeRows = function (length, page) {
            length = length || 50
            return Array.apply(null, {
                length: length
            }).map(Number.call, function (idx) {
                return {
                    id: idx,
                    value1: idx,
                    value2: "Статья " + (page || 1) + ":2:" + idx,
                    value3: "Дата " + (page || 1) + ":3:" + idx,
                    value4: "Дата " + (page || 1) + ":4:" + idx,
                    value5: "Значение " + (page || 1) + ":5:" + idx
                };
            });
        };


        $scope.getColumns = function () {
            return [{
                name: 'value1',
                title: 'id',
                width: 40,
                filterType: 'combobox',
                filterValues: [{
                    value: 0,
                    displayText: 'Не Активен'
                }, {
                    value: 1,
                    displayText: 'Активен'
                }, {
                    value: 2,
                    displayText: 'Новый'
                }, {
                    value: 3,
                    displayText: 'Изменен'
                }, {
                    value: 4,
                    displayText: 'Удален'
                }]
            }, {
                name: 'value2',
                title: 'Заголовок',
                width: 510,
                minWidth: 95,
                filterType: 'text'
            }, {
                name: 'value3',
                title: 'Дата создания',
                width: 100,
                filterType: 'date'
            }, {
                name: 'value4',
                title: 'Дата публикации',
                width: 100,
                filterType: 'date'
            }];
        };

        $scope.columns1 = $scope.getColumns();


        $scope.rows1 = $scope.getFakeRows();

        $scope.onColumnReordered = function (target, columns) {
            target = columns;
        };

        $scope.onColumnSorted = function (target, column, $event) {
            var sort = column.sort || 'desc';
            if (!$event.ctrlKey) {
                $scope.resetSort(target);
            }
            column.sort = sort === 'asc' ? 'desc' : 'asc';
        };

        $scope.resetSort = function () {

        }

    }

    ListUnitsCtrl.prototype = {
        onEditArticle: function () {
            this.$location.path('/article/edit/' + 123);
        }
    }

})(angular, rangy);
