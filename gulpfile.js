'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var base64 = require('gulp-base64');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var templateCache = require('gulp-angular-templatecache');

var nga = ['bower_components/angular/angular.min.js'];
var jq = ['bower_components/jquery/dist/jquery.min.js'];

var editTaskSetJS = [

    'bower_components/rangy/rangy-core.min.js',
    'bower_components/rangy/rangy-classapplier.min.js',
    'bower_components/rangy/rangy-textrange.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-loader/angular-loader.min.js',
    'bower_components/angular-upload/angular-upload.min.js',
    'bower_components/medium-editor/dist/js/medium-editor.min.js',
    'bower_components/angular-medium-editor/dist/angular-medium-editor.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-resource/angular-resource.min.js',
    'bower_components/gentelella/build/custom.min.js',

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/*.js',
    'app/scripts/editTaskSet/_*.js',
    'app/scripts/editTaskSet/components/**/*.js',
    'app/scripts/editTaskSet/*.js'
];
var editTaskSetTemplates = ['app/scripts/editTaskSet/*.html', 'app/scripts/common/**/*.html', 'app/scripts/editTaskSet/components/**/*.html'];

var editTaskJS = [

    'bower_components/rangy/rangy-core.min.js',
    'bower_components/rangy/rangy-classapplier.min.js',
    'bower_components/rangy/rangy-textrange.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-loader/angular-loader.min.js',
    'bower_components/angular-upload/angular-upload.min.js',
    'bower_components/medium-editor/dist/js/medium-editor.min.js',
    'bower_components/angular-medium-editor/dist/angular-medium-editor.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-resource/angular-resource.min.js',

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/*.js',
    'app/scripts/editTask/_*.js',
    'app/scripts/editTask/components/**/*.js',
    'app/scripts/editTask/*.js'
];
var editTaskTemplates = ['app/scripts/editTask/*.html', 'app/scripts/common/**/*.html', 'app/scripts/editTask/components/**/*.html'];

var taskSetListJS = [

    'bower_components/rangy/rangy-core.min.js',
    'bower_components/rangy/rangy-classapplier.min.js',
    'bower_components/rangy/rangy-textrange.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-loader/angular-loader.min.js',
    'bower_components/angular-upload/angular-upload.min.js',
    'bower_components/medium-editor/dist/js/medium-editor.min.js',
    'bower_components/angular-medium-editor/dist/angular-medium-editor.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-resource/angular-resource.min.js',

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/*.js',
    'app/scripts/taskSetList/_*.js',
    'app/scripts/taskSetList/components/**/*.js',
    'app/scripts/taskSetList/*.js',
];
var taskSetListTemplates = ['app/scripts/taskSetList/*.html', 'app/scripts/common/**/*.html', 'app/scripts/taskSetList/components/**/*.html'];

var styles = [
    'app/styles/emias.ui.css',
    'bower_components/angular-upload/src/directives/btnUpload.min.css',
    'bower_components/normalize.css/normalize.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/medium-editor/dist/css/medium-editor.min.css',

    'bower_components/gentelella/vendors/font-awesome/css/font-awesome.min.css',
    'bower_components/gentelella/vendors/nprogress/nprogress.css',

    'bower_components/gentelella/build/css/custom.min.css'

];

var fonts = [
    'bower_components/bootstrap/fonts/*.woff',
    'bower_components/bootstrap/fonts/*.ttf',
    'bower_components/bootstrap/fonts/*.woff2',
    'bower_components/gentelella/vendors/font-awesome/fonts/*.*'
];

var stylesLess = ['app/styles/index.less'];

var images = ['app/images/svg/*.svg', 'bower_components/gentelella/production/images/*.*'];


var server;

gulp.task('images', function () {
    return gulp.src(images)
    // .pipe(imagemin({
    //     svgoPlugins: [{
    //         removeHiddenElems: false
    //     }]
    // }))
    // .pipe(rename({
    //     prefix: 'ui-icon-'
    // }))
    // .pipe(svgstore({}))
        .pipe(gulp.dest('dist/images'))

});

gulp.task('editTaskSetJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(editTaskSetTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(editTaskSetJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('editTaskSet.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('editTaskJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(editTaskTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(editTaskJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('editTask.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('taskSetListJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(taskSetListTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(taskSetListJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('taskSetList.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('scripts', ['editTaskSetJS', 'editTaskJS', 'taskSetListJS']);

gulp.task('fonts', function () {
    gulp.src(fonts)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function () {
    var cssStream = gulp.src(styles)
        .pipe(concat('app.css'));

    var lessStream = gulp.src(stylesLess)
        .pipe(less())
        .pipe(concat('less-files.less'));

    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;

});

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Editor"
};

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('watch', function () {

    gulp.watch(editTaskSetJS, function (event, cb) {
        gulp.start('editTaskSetJS');
    });

    gulp.watch(editTaskJS, function (event, cb) {
        gulp.start('editTaskJS');
    });

    gulp.watch(taskSetListJS, function (event, cb) {
        gulp.start('taskSetListJS');
    });

    gulp.watch('app/styles/*.less', function (event, cb) {
        gulp.start('styles');
    });

    gulp.watch(['app/scripts/**/*.html', 'app/index.html'], function (event, cb) {
        gulp.start('scripts');
    });

});
gulp.task('build', ['images', 'scripts', 'styles', 'fonts']);

gulp.task('run', ['images', 'scripts', 'styles', 'fonts', 'server', 'watch']);
