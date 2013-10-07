var wd = require('wd');

var WebDriver = function(options){
	return {
		driver: wd,
		browser: function(type){
			var browser;
			
			if (type == 'promise') {
				browser = wd.promiseRemote(options.init);
			} else {
				browser = wd.remote(options.init);
			}

			var init = browser.init;

			browser.init = init.bind(browser, options.environment);

			return browser;
		}
	}
}

module.exports = {
	name: "buster-wd",

	create: function(options){
		var ext = Object.create(this);

		ext.options = options || {};

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

		testRunner.on('test:setUp', function(test){
			test.testCase.timeout = 10000;
			test.testCase.webdriver = WebDriver(self.options);
		});

		testRunner.on('test:tearDown', function(test){
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