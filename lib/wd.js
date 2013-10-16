var wd = require('wd');

module.exports = function(options){
	options = options || {};
	
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