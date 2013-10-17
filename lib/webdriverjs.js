module.exports = function(options){
	var webdriverjs = require('webdriverjs');

    return {
        driver: webdriverjs,
        browser: function(){
            var browser = webdriverjs.remote(options);
            browser.init();
            return browser;
        }
    }
};