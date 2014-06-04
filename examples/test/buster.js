var buster_selenium = require("../../lib/buster-selenium");

var config = module.exports;

config["Selenium Tests"] = {
    rootPath: "../",
    environment: "node",
    extensions: [
        buster_selenium
    ],
    tests: [
        "test/selenium-test.js"
    ],
    "buster-selenium": {
        driver: 'selenium-webdriver',
        timeout: 250, // this may cause the test to timeout, done intentionally
        config: {
            server: 'http://localhost:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'phantomjs',
                // 'phantomjs.binary.path': '../node_modules/.bin/phantomjs'
            }
        }
    }
};

config["WD Tests"] = {
    rootPath: "../",
    environment: "node",
    extensions: [
        buster_selenium
    ],
    tests: [
        "test/wd-test.js"
    ],
    "buster-selenium": {
        driver: 'wd',
        config: {
            server: {
                port: 4444
            },
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        }
    }
};

config["Webdriverjs Tests"] = {
    rootPath: "../",
    environment: "node",
    extensions: [
        buster_selenium
    ],
    tests: [
        "test/webdriverjs-test.js"
    ],
    "buster-selenium": {
        driver: 'webdriverjs',
        config: {
            port: 4444,
            desiredCapabilities: {
                browserName: 'phantomjs'
            },
            logLevel: 'silent'
        }
    }
};