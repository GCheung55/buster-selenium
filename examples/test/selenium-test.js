var buster = require('buster');
var assert = buster.assert;
var refute = buster.refute;
var expect = buster.expect;
var testCase = buster.testCase;

buster.spec.expose();

var goToGoogle = function(done) {
    var swd = this.driver;
    var browser = this.browser;

    return browser.get('http://www.google.com').then(function(){
        return browser.getTitle();
    }).then(function(title) {
        assert.equals(title, 'Google')
        return browser.findElement(swd.By.name('q'));
    }).then(function(element) {
        element.sendKeys('webdriver');
        return browser.findElement(swd.By.name('btnG'));
    }).then(function(button) {
        button.click();

        var defer = swd.promise.defer();
        browser.wait(function() {
            return browser.getTitle().then(function(title) {
                return title === 'webdriver - Google Search';
            });
        }).then(defer.fulfill);

        return defer.promise;
    }).then(function() {
        return browser.getTitle();
    }).then(function(title) {
        assert.equals(title, 'webdriver - Google Search');
    }).then(done);
}

describe('Selenium', function(){
    before(function(){
        var webdriver = this.webdriver;
        this.driver = webdriver.driver;
        this.browser = webdriver.browser();
    });

    after(function(){
        // Returned promise will wait for the browser to close before completing this test
        return this.browser.quit();
    });

    for(var i = 0; i < 1;){
        it('goes to Google + ' + (i++), goToGoogle);
    }
});