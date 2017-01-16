exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        "app/scripts/categoriesList/tests/e2e/scenarios.js"
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:9000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }

};