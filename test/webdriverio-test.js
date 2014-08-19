var buster = require('buster');
var webdriver = require('../lib/factory/webdriverio')
var webdriverio = require('webdriverio');

var assert = buster.assert;
var testCase = buster.testCase;

testCase('webdriverio', {
    'should be a function': function(){
        assert.isFunction(webdriver);
    },

    'when executed should return an object': function(){
        var driver = webdriver();
        assert.isObject(driver);
    },

    'returned object': {
        setUp: function(){
            this.driver = webdriver();
        },

        tearDown: function(){
            delete this.driver;
        },

        'has a wd module': function(){
            assert.equals(this.driver.driver, webdriverio);
        },

        // WebdriverIO could try to connect to a non-existing selenium-server, so deferring
        '// has a browser function that returns a remote': function(){
            var browser = this.driver.browser();
            var webdriverioBrowser = webdriverio.remote().init();

            assert.equals(browser, webdriverioBrowser);
        }
    }
});
