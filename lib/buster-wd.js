var wd = require('wd');

module.exports = {
	name: "buster-wd",

	create: function(options){
		var ext = Object.create(this);

		ext.options = options || {};

		ext.remote = wd.promiseRemote(options.init);

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
		var promise;

		testRunner.on('context:start', function(){
			promise = self.remote.init(self.options.environment);
			browser = self.remote;
		});

		testRunner.on('context.end', function(){
			browser.quit();
		});

		testRunner.on('test:setUp', function(test){
			test.testCase.timeout = 10000;
			test.testCase.webdriver = wd;
			test.testCase.browser = browser;
			test.testCase.browserPromise = promise;
		});

		testRunner.on('test:tearDown', function(test){
			delete test.testCase.browserPromise;
			delete test.testCase.browser;
			delete test.testCase.webdriver;
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