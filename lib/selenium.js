var sw = require('selenium-webdriver');

module.exports = function(options){
	return {
		driver: sw,
		browser: function(){
			return new sw.Builder().withCapabilities(options.environment).build();
		}
	}
};