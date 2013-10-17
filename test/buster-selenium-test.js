var buster = require('buster');
var extension = require('../lib/buster-selenium');
var c = require('buster-configuration');

var testCase = buster.testCase;
var assert = buster.assert;
var refute = buster.refute;

var withGroup = function (body, tests) {
    var group, rs, err, data, loadedTests;
    var instance = tests(
        function() { return group; },
        function() { return rs; },
        function() { return err; },
        function() { return data; },
        function() { return loadedTests; }
    );

    instance.setUp = function(done) {
        body.extensions = [extension];
        group = c.createConfiguration().addGroup("test", body, __dirname + "/fixtures");

        group.resolve().then(function(resourceSet) {
            rs = resourceSet;
            var paths = resourceSet.loadPath.paths();
            loadedTests = paths.filter(function(p) {
                return p.indexOf("/buster") !== 0;
            });

            done();
            // rs.get("/buster/load-all.js").content().then(done(function(content) {
            //  data = content;
            // }));
        });
    };

    return instance;
};

testCase('Buster Selenium', {
    'extension should be an object': function(){
        assert.isObject(extension);
    },

    'create should consume an object with driver option': {
        'as a string': {
            'wd, selenium-webdriver, or webdriverjs': function(){
                assert.defined(extension.create({
                    driver: 'wd'
                }).webdriver);

                assert.defined(extension.create({
                    driver: 'selenium-webdriver'
                }).webdriver);

                assert.defined(extension.create({
                    driver: 'webdriverjs'
                }).webdriver);
            },

            'anything besides wd, selenium-webdriver, or webdriverjs throws': function(){
                assert.exception(function(){
                    extension.create({
                        driver: 'notAnyModule'
                    });
                });
            }
        },

        'as a function and use the returned value as the webdriver object': function(){
            var webdriverObj = {
                'webdriverObj': true,
                'browser': function(){}
            };

            var ext = extension.create({
                driver: function(){
                    return webdriverObj;
                }
            });

            assert.same(webdriverObj, ext.webdriver);
        }
    },

    'configuration': {
        'with buster-selenium options': {
            'where driver is selenium': withGroup({
                'buster-selenium': {
                    driver: 'selenium-webdriver'
                }
            }, function(group, rs, err, data, loadedTests){
                return {
                    'sets options and webdriver object': function(){
                        var groupExt = group().extensions[0];

                        assert.isObject(groupExt.options);
                        assert.isObject(groupExt.webdriver);
                    }
                }
            }),

            'where driver is wd': withGroup({
                'buster-selenium': {
                    driver: 'wd'
                }
            }, function(group, rs, err, data, loadedTests){
                return {
                    'sets options and webdriver object': function(){
                        var groupExt = group().extensions[0];

                        assert.isObject(groupExt.options);
                        assert.isObject(groupExt.webdriver);
                    }
                }
            }),

            'where driver is webdriverjs': withGroup({
                'buster-selenium': {
                    driver: 'webdriverjs'
                }
            }, function(group, rs, err, data, loadedTests){
                return {
                    'sets options and webdriver object': function(){
                        var groupExt = group().extensions[0];

                        assert.isObject(groupExt.options);
                        assert.isObject(groupExt.webdriver);
                    }
                }
            })
        }
    },

    '// create consumes options and returns an instance': function(){},
    '// configure': function(){},
    '// beforeRun': function(){},
    '// testRun should add a webdriver object to the test context': function(){}
});