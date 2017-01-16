(function (ng, $) {
    'use strict';

    ng.module('emias.ui.grid')
        .controller('customColumnController', CustomColumnController);
    CustomColumnController.$inject =[ '$scope' ];

    function CustomColumnController($scope) {
    }
})(angular, jQuery);
