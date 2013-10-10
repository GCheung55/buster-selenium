var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;
var testCase = buster.testCase;

buster.spec.expose();

var goToGoogle = function(){
	var browser = this.browser;

	return browser.init().then(function(){
		return browser.get('http://www.google.com');
	}).then(function(){
		return browser.title();
	}).then(function(title){
		assert.equals(title, 'Google');

		return browser.elementByName('q');
	}).then(function(input){
		return input.type('webdriver');
	}).then(function(){
		return browser.elementByName('btnG');
	}).then(function(button){
		return button.click();
	}).then(function(){
		var defer = browser.Q.defer();

		browser.waitForCondition('document.title === "webdriver - Google Search"', 5000, defer.resolve);

		return defer.promise;
	}).then(function(){
		return browser.title();
	}).then(function(title){
		assert.equals(title, 'webdriver - Google Search');
	});
};

// testCase("WD", {
// 	setUp: function(){},

// 	tearDown: function(){},

// 	"go to google": 
// });

describe('WD', function(){
	before(function(){
		this.browser = this.webdriver.browser('promise');
	});

	after(function(){
		// Returned promise will wait for the browser to close before completing this test
		return this.browser.quit();
	});

	for(var i = 0; i < 1;){
		it('goes to Google + ' + (i++), goToGoogle);
	}
});