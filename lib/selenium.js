module.exports = function(options){
    var sw = require('selenium-webdriver');

    options = options || {};

    return {
        driver: sw,
        browser: function(){
            var b = new sw.Builder().withCapabilities(options.desiredCapabilities);
            if (options.server) {
                b.usingServer(options.server);
            }

            return b.build();
        }
    }
};