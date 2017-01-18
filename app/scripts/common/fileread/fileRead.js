(function(ng) {
    'use strict';

    ng.module('editor.common.fileread')
        .directive('fileread', FileReadDirective);

    FileReadDirective.$inject = [];

    function FileReadDirective() {

        return {
            scope: {
                fileread: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            //console.log('result'+loadEvent.target.result);
                            scope.fileread.file = loadEvent.target.result;
                            //console.log('result'+loadEvent.target.result);
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }

})(angular);
