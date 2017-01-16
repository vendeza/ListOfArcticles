(function(ng) {
    ng.module('editor', [
        'templates',
        'ngRoute',
        'angular-medium-editor',

        'editor.editorContent',
        'editor.editorUnit',
        'editor.listUnits',
        'editor.common'
    ]);

})(angular);
