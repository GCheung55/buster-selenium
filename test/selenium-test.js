var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;
var testCase = buster.testCase;

buster.spec.expose();

var goToGoogle = function(done) {
	var swd = this.webdriver;
	var browser = this.browser;

	return browser.get('http://www.google.com').then(function(){
		var d = swd.promise.defer();

		browser.wait(function(){
			return browser.getTitle().then(function(title){
				return title === 'Google'
			});
		}).then(d.fulfill);

		return d.promise;
	}).then(function(){
		return browser.getTitle();
	}).then(function(title) {
		assert.equals(title, 'Google')
		return browser.findElement(swd.By.name('q'));
	}).then(function(element) {
		element.sendKeys('webdriver');
		return browser.findElement(swd.By.name('btnG'));
	}).then(function(button) {
		button.click();

		var defer = swd.promise.defer();
		browser.wait(function() {
			return browser.getTitle().then(function(title) {
				return title === 'webdriver - Google Search';
			});
		}).then(defer.fulfill);

		return defer.promise;
	}).then(function() {
		return browser.getTitle();
	}).then(function(title) {
		assert.equals(title, 'webdriver - Google Search');
	}).then(done);
}

describe('Selenium', function(){
	// console.log('describe', this);

	// beforeAll(function(){
	// 	console.log('beforeAll', this);
	// });

	// afterAll(function(){
	// 	console.log('afterAll', this);
	// });

	for(var i = 0; i < 1;){
		it('goes to Google + ' + (i++), goToGoogle);
	}
});

// var cases = {
// 	setUp: function(){
// 		// this.browser = this.remote.build();
// 	},

// 	tearDown: function(){
// 		// this.browser.quit();
// 		// delete this.browser;
// 	}
// };

// for(var i = 0; i < 10;){
// 	cases['go to google' + (i++)] = goToGoogle;
// }

// testCase("Selenium", cases);