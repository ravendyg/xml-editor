const singleRun = !!process.argv.find(e => e === '--single');

module.exports = function(config) {
    config.set({
        /*
         * Enable or disable watching files and executing the tests whenever
         * one of the files in the "files" field is changed.
         */
        autoWatch: true,
        /*
         * The root path location that will be used to resolve all relative
         * paths defined in "files" and "exclude".
         */
        basePath: "",

        /*
         * List of browsers to launch and capture tests in. In order to use a
         * specified browser, you must npm install the corresponding
         * karma-***-launcher.
         * http://karma-runner.github.io/0.13/config/browsers.html
         */
        browsers: ["PhantomJS"],

        // Enable or disable colors in the output (reporters and logs)
        colors: true,

        // List of files/patterns to exclude from loaded files
        exclude: [],

        /*
         * The files array determines which files are included in the browser
         * and which files are watched and served by Karma. The order of patterns
         * determines the order in which files are included in the browser.
         * http://karma-runner.github.io/0.13/config/files.html
         */
        files: [
            "build-test/test.bundle.js"
        ],

        /*
         * List of test frameworks you want to use. For example, if you want to
         * use mocha, chai, and sinon, you'll need to npm install their
         * corresponding karma-*** modules and include them in the list of plugins
         * as well as below.
         */
        frameworks: ["mocha", "chai", "sinon"],

        logLevel: config.LOG_INFO,

        /*
         * By default, Karma loads all sibling NPM modules which have a name
         * starting with karma-*. You can also explicitly list plugins you want
         * to load via the plugins configuration setting.
         */
        plugins: [
            "karma-*"
        ],

        // The port where the Karma web server will be listening.
        port: 9876,


        /*
         * A list of reporters to use to display the test results. In order to
         * use the karma-mocha-reporter, you must npm install the module and
         * include it in the list of plugins.
         */
        reporters: ["mocha"],

        /*
         * If true, Karma will start and capture all configured browsers, run
         * tests and then exit with an exit code of 0 or 1 depending on whether
         * all tests passed or any tests failed.
         */
        singleRun,

    });
};
