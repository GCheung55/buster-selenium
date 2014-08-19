# buster-selenium

[![Build Status](https://travis-ci.org/GCheung55/buster-selenium.png)](https://travis-ci.org/GCheung55/buster-selenium)

An extension for [buster.js](http://busterjs.org) to make it easy to write functional tests with either [selenium-webdriver](https://npmjs.org/package/selenium-webdriver), [wd](https://npmjs.org/package/wd), and [webdriverio](https://npmjs.org/package/webdriverio).

**This extensions is only for tests run in node environment.**

## Install

Installation is done using npm:

```bash
$ npm install buster-selenium
```

## Usage

Add `buster-selenium` extension and corresponding options, to the buster.js config file:

```javascript
var config = module.exports;

config["Browser tests"] = {
    rootPath: "../",
    tests: ["test/**/*.js"],
    extensions: [require('buster-selenium')],
    'buster-selenium': {
        // required, can be either selenium-webdriver or wd
        driver: 'selenium-webdriver'
    }
}
```

Write the tests! Please check the documentation of the webdriver module you choose to use. Remember to quit the browser!

```javascript
var buster = require('buster');

buster.testCase('goToGoogle', {
    'Load google.com': function(){
        var browser = this.webdriver.browser();

        return browser.get('http://www.google.com').then(function(){
            return browser.getTitle();
        }).then(function(title) {
            assert.equals(title, 'Google');
        }).then(function(){
            browser.quit();
        });
    }
});

```

Go check out [Examples](https://github.com/GCheung55/buster-selenium/tree/master/examples/test) of how to setup `buster.js` config and tests.

## Configuration

* `driver` - (*string* or *function*) - required, choose `selenium-webdriver`, `wd`, or `webdriverio` strings or define a function that returns anything you want to use as the driver.
* `config` - (*object*) - optional, configuration for the webdriver library. Each library is slightly different.
* `timeout` - (*number*) - optional, defaults to 10000. Define how long a test runs before it timesout. Extend the time of your tests if the webdriver-driven browser takes a really long time to complete tasks.

#### Example

```javascript
{
    driver: function(config){
        return new require('someOtherWebdriver')(config);
    },
    config: {
        exampleOption: true,
        exampleOption2: false
    }
}
```

### selenium-webdriver `config`

* `server` - (*string*) - url to the Selenium Server/Hub.
* `desiredCapabilities` - (*object*) - define capabilities for the browser

**Note: If `phantomjs` is not found in `$PATH` variable, it may be necessary to define the path in `desiredCapabilities`.**

#### Example
```javascript
{
    server: 'http://localhost:4444',
    desiredCapabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': './node_modules/.bin/phantomjs'
    }
}
```

### wd `config`

* `server` - (*string* or *object*) - url or parameters to the Selenium Server/Hub. Check [wd browser-initialization docs](https://github.com/admc/wd#browser-initialization) for examples
* `desiredCapabilities` - (*object*) - define capabilities for the browser

**Note: Defining path to `phantomjs` is not necessary.**

#### Example
```javascript
{
    server: 'http://localhost:444',
    desiredCapabilities: {
        browserName: 'phantomjs'
    }
}
```

### webdriverio `config`

Refer to [webdriverio options docs](https://github.com/webdriverio/webdriverio#options) for an explanation of the `config` options.

**Consider setting `logLevel` property to "silent" when using `xml` reporter.**

#### Example (taken from a [webdriverio example](https://github.com/webdriverio/webdriverio/tree/master/examples))
```javascript
{
    desiredCapabilities: {
        browserName: 'chrome',
        version: '27',
        platform: 'XP'
    },
    host: 'hub.browserstack.com',
    port: 80,
    user : process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    logLevel: 'silent',
}
```

## Usage

Every test will be extended with a `webdriver` object with access to two properties.

* `driver` - (*object*) - The `require`'d webdriver node module. Ex. require('wd'); or require('selenium-webdriver');
* `browser` - (*function*) - A wrapper function around the webdrivers browser builder/initializer. Returns a browser session object with the `desiredCapbilities` config.

### Example

```javascript
// assume we are using selenium-webdriver
buster.testCase('google', {
    setUp: function(){
        // Get a browser session
        this.browser = this.webdriver.browser();
    },

    tearDown: function(){
        // Quit the browser session, you should clean up every time
        this.browser.quit();
    },

    'go to google.com': function(){
        // Go to the google webpage and assert that its true
        // Buster tests can accept promises!
        return browser.get('http://www.google.com').then(function(){
            assert(true);
        })
    }
});
```

### Notes: `wd`

`wd` provides three (at the time of this writing) types of remote/browser objects. A regular continuation style, a promise, and a promise chain. To access them, pass the `browser` function a string!

```javascript
// Give me the promise remote/browser!
this.browser = this.webdriver.browser('promise');

// or

// Give me the promise chain remote/browser!
this.browser = this.webdriver.browser('promiseChain');

// or

// Give me the regular continuation style remote/browser!
this.browser = this.webdriver.browser();
```

Refer to [`wd docs`](https://github.com/admc/wd) for more info.
