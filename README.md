# buster-selenium

[![Build Status](https://travis-ci.org/GCheung55/buster-selenium.png)](https://travis-ci.org/GCheung55/buster-selenium)

An extension for [buster.js](http://busterjs.org) to make it easy to write functional tests with either [selenium-webdriver](https://npmjs.org/package/selenium-webdriver), [wd](https://npmjs.org/package/wd), and [webdriverjs](https://npmjs.org/package/webdriverjs).

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

* `driver` - (*string*) - required, choose between `selenium-webdriver`, `wd`, or `webdriverjs`.
* `config` - (*object*) - configuration for the webdriver library. Each library is slightly different.

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

### webdriverjs `config`

Refer to [webdriverjs options docs](https://github.com/camme/webdriverjs#options) for an explanation of the `config` options.

**Consider setting `logLevel` property to "silent" when using `xml` reporter.**

#### Example (taken from a [webdriverjs example](https://github.com/camme/webdriverjs/tree/master/examples))
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