# buster-selenium

[![Build Status](https://travis-ci.org/GCheung55/buster-selenium.png)](https://travis-ci.org/GCheung55/buster-selenium)

An extension for [buster.js](http://busterjs.org) to make it easy to write functional tests with either [selenium-webdriver](https://npmjs.org/package/selenium-webdriver) or [wd](https://npmjs.org/package/wd). This is only for tests run in node environment.

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

**When using wd, executing `this.webdriver.browser()` will automiatcally execute [`init(desired, cb)`](https://github.com/admc/wd#supported-methods) for you.**

## Configuration

* `driver` - (*string*) - required, choose between `wd` or `selenium-webdriver`
* `server` - (*object* or *string*) - Selenium Server/Hub properties or url. [wd](https://github.com/admc/wd#named-parameters) takes a `string` or `* object`. `selenium-webdriver` only takes a `string`
`environment` - (*object*) - the capabilities of the browser, `browserName`, `platform`, etc, as described in the [selenium wiki](https://code.google.com/p/selenium/wiki/DesiredCapabilities)