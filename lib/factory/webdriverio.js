module.exports = function(options){
    var webdriverio = require('webdriverio');

    return {
        driver: webdriverio,
        browser: function(){
            var browser = webdriverio.remote(options);
            browser.init();
            return browser;
        }
    }
};
