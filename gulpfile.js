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

var editorUnitJS = [

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
    'app/scripts/editorUnit/_*.js',
    'app/scripts/editorUnit/components/**/*.js',
    'app/scripts/editorUnit/*.js',
];
var editorUnitTemplates = ['app/scripts/editorUnit/*.html', 'app/scripts/editorUnit/components/**/*.html'];

var editorContentJS = [

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
    'app/scripts/editorContent/_*.js',
    'app/scripts/editorContent/components/**/*.js',
    'app/scripts/editorContent/*.js',
];
var editorContentTemplates = ['app/scripts/editorContent/*.html', 'app/scripts/editorContent/components/**/*.html'];

var listUnitsJS = [

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
    'app/scripts/listUnits/_*.js',
    'app/scripts/listUnits/components/**/*.js',
    'app/scripts/listUnits/*.js',
];
var listUnitsTemplates = ['app/scripts/listUnits/*.html', 'app/scripts/listUnits/components/**/*.html'];

var styles = [
    'app/styles/emias.ui.css',
    'bower_components/angular-upload/src/directives/btnUpload.min.css',
    'bower_components/normalize.css/normalize.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/medium-editor/dist/css/medium-editor.min.css'

];

var fonts = [
    'bower_components/bootstrap/fonts/*.woff',
    'bower_components/bootstrap/fonts/*.ttf',
    'bower_components/bootstrap/fonts/*.woff2'
];

var stylesLess = ['app/styles/index.less'];

var images = ['app/images/svg/*.svg'];


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



gulp.task('editorUnitJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(editorUnitTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(editorUnitJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('editorUnit.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('editorContentJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(editorContentTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(editorContentJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('editorContent.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('listUnitsJS', function () {

    var jqStream = gulp.src(jq);
    var angularStream = gulp.src(nga);

    var templatesStream = gulp.src(listUnitsTemplates)
        .pipe(templateCache({standalone: true, root: '/pages/'}));

    var appStream = gulp.src(listUnitsJS);


    var mergedStream = merge(jqStream, angularStream, templatesStream, appStream)
        .pipe(concat('listUnits.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('scripts', ['editorUnitJS', 'editorContentJS', 'listUnitsJS']);

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
        .pipe(gulp.dest('dist'))
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

    gulp.watch(editorUnitJS, function (event, cb) {
        gulp.start('editorUnitJS');
    });

    gulp.watch(editorContentJS, function (event, cb) {
        gulp.start('editorContentJS');
    });

    gulp.watch(listUnitsJS, function (event, cb) {
        gulp.start('listUnitsJS');
    });

    gulp.watch('app/styles/*.less', function (event, cb) {
        gulp.start('styles');
    });

    gulp.watch(['app/scripts/**/*.html', 'app/index.html'], function (event, cb) {
        gulp.start('scripts');
    });

});

gulp.task('run', ['images', 'scripts', 'styles', 'fonts', 'server', 'watch']);
