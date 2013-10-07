var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;
var testCase = buster.testCase;

buster.spec.expose();

var goToGoogle = function(){
	var browser = this.browser;
	var promise = this.browserPromise;

	return promise.then(function(){
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
	console.log('describe', this);

	beforeAll(function(){
		console.log('beforeAll', this);
	});

	afterAll(function(){
		console.log('afterAll', this);
	});

	for(var i = 0; i < 10;){
		it('goes to Google + ' + (i++), goToGoogle);
	}
});