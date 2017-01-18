(function (ng, $) {
    'use strict';

    ng.module('editor.common.loadImage')
        .directive('loadimage', LoadImageDirective);

    LoadImageDirective.$inject = [];

    function LoadImageDirective() {

        return {
            restrict: "AE",
            scope: {
                task: "="

            },
            templateUrl: '/pages/loadImage/index.html',
            link: function (scope, element, attributes) {
                function readURL(input) {

                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $('#blah').attr('src', e.target.result);
                            //scope.task.icon = e.target.result;
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }

                $("#imgInp").change(function () {
                    readURL(this);
                });
            }
        }
    }

})(angular, jQuery);
