var sw = require('selenium-webdriver');

var WebDriver = function(options){
	return {
		driver: sw,
		browser: function(){
			return new sw.Builder().withCapabilities(options.environment).build();
		}
	}
};

module.exports = {
	name: "buster-selenium",

	create: function(options){
		var ext = Object.create(this);

		ext.options = options || {};

		ext.webdriver = new WebDriver(ext.options);

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
			this.timeout = 10000;
			test.testCase.webdriver = self.webdriver;
		});

		testRunner.on('test:tearDown', function(test){
			delete test.testCase.webdriver
		});
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