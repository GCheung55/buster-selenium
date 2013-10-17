var buster_selenium = require("../../lib/buster-selenium");

var config = module.exports;

config["Selenium Tests"] = {
    rootPath: "../",
    environment: "node",
    tests: [
        "test/selenium-test.js"
    ],
    extensions: [
        buster_selenium
    ],
    "buster-selenium": {
        driver: 'selenium-webdriver',
        timeout: 2050, // this may cause the test to timeout, done intentionally
        config: {
            server: '',
            desiredCapabilities:
            {
                browserName: 'phantomjs',
                'phantomjs.binary.path': './node_modules/.bin/phantomjs'
            }
        }
    }
};

config["WD Tests"] = {
    extends: "Selenium Tests",
    tests: [
        "test/wd-test.js"
    ],
    "buster-selenium": {
        driver: 'wd',
        config: {
            server: {},
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        }
    }
};

config["Webdriverjs Tests"] = {
    extends: "Selenium Tests",
    tests: [
        "test/webdriverjs-test.js"
    ],
    "buster-selenium": {
        driver: 'webdriverjs',
        config: {
            desiredCapabilities: {
                browserName: 'phantomjs'
            },
            logLevel: 'silent'
        }
    }
};