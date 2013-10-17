var drivers = {
    'selenium-webdriver': require('./selenium'),
    wd: require('./wd'),
    webdriverjs: require('./webdriverjs')
};

module.exports = {
    name: "buster-selenium",

    create: function(options){
        var ext = Object.create(this);
        
        var driver = options.driver;

        // driver option can be a string or a function.
        // A string would be used to look up one of the pre-defined driver object creator.
        // A function would be used as the driver object creator.
        if (typeof driver == 'string') {
            driver = drivers[driver];
        }

        if (!driver) {
            throw Error("driver option is undefined.");
        }

        ext.options = options || {};

        ext.webdriver = driver ? driver(options.config) : undefined;

        return ext;
    },

    // configure: function(conf){
    //  console.log(conf);
    // },

    testRun: function(testRunner){
        var self = this;
        var timeout = self.options.timeout || 10000;

        testRunner.on('test:setUp', function(test){
            this.timeout = timeout;
            test.testCase.webdriver = self.webdriver;
        });

        testRunner.on('test:tearDown', function(test){
            delete test.testCase.webdriver
        });
    }

    // , beforeRun: function(config, analyzer){
    //  try {

    //  } catch (e) {           
    //      console.log(e.name);
    //      console.log(e.message);
    //      throw Error(e.name, e.message);
    //  }
    //  console.log('beforeRun', config, analyzer, this);
    // }
};