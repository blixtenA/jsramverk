"use strict";
require('dotenv').config();

const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const binaryPath = process.env.FIREFOX_BINARY_PATH;

const { ServiceBuilder } = require('selenium-webdriver/firefox');
const geckodriver = new ServiceBuilder()
  .setFirefoxBinary(binaryPath)
  .setFirefoxDriverLog("./geckodriver.log") // Specify the log file
  .build();

if (!binaryPath) {
    throw new Error("FIREFOX_BINARY_PATH environment variable is not set. Please set it to the path of the Firefox binary.");
}

const options = new firefox.Options()
  .set("moz:firefoxOptions", {
    binary: binaryPath,
  });

const browser = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();

(async function () {
    try {
        console.log("Attempting to launch Firefox...");
        await browser.get("about:blank"); // Open a blank page
        console.log("Firefox launched successfully.");
    } catch (error) {
        console.error("Error launching Firefox:", error);
    } finally {
        await browser.quit();
    }
})();
