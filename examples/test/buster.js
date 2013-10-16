var config = module.exports;

config["Selenium Tests"] = {
	rootPath: "../",
	environment: "node",
	tests: [
		"test/selenium-test.js"
	],
	extensions: [
		require("../../lib/buster-selenium")
	],
	"buster-selenium": {
		driver: 'selenium-webdriver',
		server: '',
		environment:
		{
			browserName: 'phantomjs',
			'phantomjs.binary.path': './node_modules/.bin/phantomjs'
		}
		// {
		// 	browserName: 'firefox'
		// }
	}
};

config["WD Tests"] = {
	rootPath: "../",
	environment: "node",
	tests: [
		"test/wd-test.js"
	],
	extensions: [
		require("../../lib/buster-selenium")
	],
	"buster-selenium": {
		driver: 'wd',
		server: {},
		environment: {
			browserName: 'phantomjs'
		}
	}
}
