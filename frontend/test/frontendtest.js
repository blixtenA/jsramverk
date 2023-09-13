const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const { assert } = require("chai");
const { ExpectedConditions } = require('selenium-webdriver');

// Load environment variables from .env
require('dotenv').config();

// Get ChromeDriver path and port from environment variables
const chromeDriverPath = process.env.CHROME_DRIVER_PATH;
const chromeDriverPort = parseInt(process.env.CHROME_DRIVER_PORT || 9000);

console.log(`ChromeDriver path: ${chromeDriverPath}`);
console.log(`ChromeDriver port: ${chromeDriverPort}`);

// Set the ChromeDriver path as a system property
process.env['webdriver.chrome.driver'] = chromeDriverPath;

// Configure Chrome options
const options = new Options()
  .setChromeBinaryPath(chromeDriverPath) // Use the specified binary path

console.log('Chrome options:', options);

// Build the WebDriver instance for Chrome
const browser = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

console.log('WebDriver instance created');

const targetURL = "http://localhost:9000";

describe("Sample Test Suite", function () {
  this.timeout(20000);

  before(async function () {
    console.log('Launching Chrome...');
    await browser.get(targetURL);
    console.log('Navigation completed');
    console.log('Current URL:', await browser.getCurrentUrl());
  });

  it('should find the <body> element', async function () {
    const bodyElement = await browser.findElement(By.tagName('body'));
    assert.isNotNull(bodyElement, 'Found the <body> element');
  });
  
  it('should find the <head> element', async function () {
    const headElement = await browser.findElement(By.tagName('head'));
    assert.isNotNull(headElement, 'Found the <head> element');
  });

  it('should wait for element to be visible', async function () {    
    const element = await browser.findElement(By.id('delayed-trains'));
    await browser.wait(until.elementIsVisible(element), 20000);
    
    assert.isTrue(await element.isDisplayed());
  });
  
  after(async function () {
    console.log('Quitting browser');
    await browser.quit();
  });
});
