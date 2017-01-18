(function(ng) {
    ng.module('editor', [
        'templates',
        'ngRoute',
        'angular-medium-editor',

        'editor.editTask',
        'editor.editTaskSet',
        'editor.taskSetList',
        'editor.common'
    ]);

})(angular);
