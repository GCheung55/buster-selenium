var sw = require('selenium-webdriver');
var wd = require('wd');

module.exports = {
	name: "buster-selenium",

	create: function(options){
		var ext = Object.create(this);

		ext.options = options || {};

		ext.remote = new sw.Builder().withCapabilities(options.environment);

		return ext;
	},

	configure: function(conf){

		// conf.on('load:testHelpers', function(obj){
		// 	console.log('load:testHelpers', obj);
		// });

		// conf.on('load:tests', function(obj){
		// 	console.log('load:tests', obj);
		// });
	},

	testRun: function(testRunner){
		var self = this;
		var browser;

		testRunner.on('context:start', function(){
			console.log('context:start');
			browser = self.remote.build();
		});

		testRunner.on('context:end', function(){
			console.log('context:end');
			browser.quit();
		});

		testRunner.on('test:setUp', function(test){
			test.testCase.timeout = 10000;
			test.testCase.webdriver = sw;
			test.testCase.remote = self.remote;
			test.testCase.browser = browser;
		});

		testRunner.on('test:tearDown', function(test){
			delete test.testCase.sw;
			delete test.testCase.remote;
			delete test.testCase.browser
		});
		
		// console.log('testRun', typeof testRunner, testRunner);
	},

	beforeRun: function(config, analyzer){
		// try {

		// } catch (e) {			
		// 	console.log(e.name);
		// 	console.log(e.message);
		// 	throw Error(e.name, e.message);
		// }
		// console.log('beforeRun', config, analyzer, this);
	}
};