module.exports = function(options){
    var wd = require('wd');

    options = options || {};

    return {
        driver: wd,
        browser: function(type){
            var browser;
            
            if (type == 'promise') {
                browser = wd.promiseRemote(options.server);
            } else if (type == 'promiseChain') {
                browser = wd.promiseChainRemote(options.server);
            } else {
                browser = wd.remote(options.server);
            }

            var init = browser.init;

            browser.init = function(){
                return init.call(browser, options.desiredCapabilities);
            };

            return browser;
        }
    }
}