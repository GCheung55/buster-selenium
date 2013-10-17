var buster = require('buster');
var webdriver = require('../lib/selenium');
var selenium = require('selenium-webdriver');

var assert = buster.assert;
var testCase = buster.testCase;

testCase('selenium', {
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

        'has a selenium-webdriver module': function(){
            assert.equals(this.driver.driver, selenium);
        },

        // selenium-webdriver could try to connect to a non-existing selenium-server, so deferring
        '// has a browser function that returns a remote': function(){
            var browser = this.driver.browser();
            
            assert.isObject(browser);
        }
    }
});