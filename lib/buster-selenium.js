var selenium = require('./selenium');
var wd = require('./wd');
var webdriverjs = require('./webdriverjs');

var drivers = {
	'selenium-webdriver': selenium,
	wd: wd,
	webdriverjs: webdriverjs
}

module.exports = {
	name: "buster-selenium",

	create: function(options){
		var ext = Object.create(this);
		
		var driver = drivers[options.driver];

		ext.options = options || {};

		ext.webdriver = driver ? new driver(ext.options.config) : undefined;

		return ext;
	},

	// configure: function(conf){
	// 	console.log(conf);
	// },

	testRun: function(testRunner){
		var self = this;

		testRunner.on('test:setUp', function(test){
			this.timeout = 99999;
			test.testCase.webdriver = self.webdriver;
		});

		testRunner.on('test:tearDown', function(test){
			delete test.testCase.webdriver
		});
	}

	// , beforeRun: function(config, analyzer){
	// 	try {

	// 	} catch (e) {			
	// 		console.log(e.name);
	// 		console.log(e.message);
	// 		throw Error(e.name, e.message);
	// 	}
	// 	console.log('beforeRun', config, analyzer, this);
	// }
};