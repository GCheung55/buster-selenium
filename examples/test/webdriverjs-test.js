var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;
var testCase = buster.testCase;

buster.spec.expose();

var goToGoogle = function(done){
	var browser = this.browser;

	browser
		.url('http://www.google.com')
		.title(function(err, title){
			assert.equals(title.value, 'Google');
			done();
		});
		// .setValue('[name=q]', 'webdriver')
		// .click('[name=btnG]', function(err, results){
		// 	var timeout = setInterval(function(){
		// 		browser.getTitle(function(err, title){
		// 			if (title == 'webdriver - Google Search') {
		// 				clearInterval(timeout);
		// 				assert(true);
		// 				browser.end(done)
		// 			}
		// 		});
		// 	}, 5000);
		// });
};

describe('Webdriverjs', function(){
	before(function(){
		this.browser = this.webdriver.browser();
	});

	after(function(done){
		// Returned promise will wait for the browser to close before completing this test
		this.browser.end(done);
	});

	for(var i = 0; i < 1;){
		it('goes to Google + ' + (i++), goToGoogle);
	}
});