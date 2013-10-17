var buster = require('buster');
var webdriver = require('../lib/webdriverjs')
var webdriverjs = require('webdriverjs');

var assert = buster.assert;
var testCase = buster.testCase;

testCase('webdriverjs', {
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
			assert.equals(this.driver.driver, webdriverjs);
		},

		// webdriverjs could try to connect to a non-existing selenium-server, so deferring
		'// has a browser function that returns a remote': function(){
			var browser = this.driver.browser();
			var webdriverjsBrowser = webdriverjs.remote().init();
			
			assert.equals(browser, webdriverjsBrowser);
		}
	}
});