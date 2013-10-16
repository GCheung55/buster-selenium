var buster = require('buster');
var webdriver = require('../lib/wd')
var wd = require('wd');

var assert = buster.assert;
var testCase = buster.testCase;

testCase('wd', {
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
			assert.equals(this.driver.driver, wd);
		},

		'has a browser function': {
			'that returns a promiseRemote': function(){
				var browser = this.driver.browser('promise');
				var wdPromiseBrowser = wd.promiseRemote();

				// Need to delete the init because it is replaced by lib/wd
				delete browser.init;
				delete wdPromiseBrowser.init;
				
				assert.equals(browser, wdPromiseBrowser);
			},

			'that returns a remote': function(){
				var browser = this.driver.browser();
				var wdBrowser = wd.remote();

				// Need to delete the init because it is replaced by lib/wd
				delete browser.init;
				delete wdBrowser.init;
				
				assert.equals(browser, wdBrowser);
			}
		}
	}
});