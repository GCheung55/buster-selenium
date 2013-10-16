var sw = require('selenium-webdriver');

module.exports = function(options){
	options = options || {};

	return {
		driver: sw,
		browser: function(){
			var b = new sw.Builder().withCapabilities(options.environment);
			if (options.server) {
				b.usingServer(options.server);
			}

			return b.build();
		}
	}
};