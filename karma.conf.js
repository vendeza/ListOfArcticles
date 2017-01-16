//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'bower_components/rangy/rangy-core.min.js',
            'bower_components/angular/angular.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-loader/angular-loader.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/medium-editor/dist/js/medium-editor.min.js',
            'bower_components/angular-medium-editor/dist/angular-medium-editor.min.js',
            'bower_components/angular-mocks/angular-mocks.js',


            'app/scripts/_*.js',
            'app/scripts/*.js',
            'app/scripts/**/_*.js',
            'app/scripts/**/*.js',

            'app/scripts/**/tests/unit/*_test.js'

        ],
        exclude: [
            'app/scripts/**/tests/e2e/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',

            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
