var webdriverjs = require('webdriverjs');

module.exports = function(options){
    return {
        driver: webdriverjs,
        browser: function(){
            var browser = webdriverjs.remote(options);
            browser.init();
            return browser;
        }
    }
};