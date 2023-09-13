"use strict";

const webdriver = require("selenium-webdriver");
const { By, until } = require("selenium-webdriver");
const { assert } = require("chai");

const browser = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .build();

const targetURL = "http://localhost:9000";

describe("Sample Test Suite", function () {
    this.timeout(20000); // Set a timeout of 10 seconds

    before(async function () {
        await browser.get(targetURL);
    });

    it("should have a specific element", async function () {
        const element = await browser.findElement(By.id("delayed-trains"));
        assert.isTrue(await element.isDisplayed());
    });

    after(async function () {
        await browser.quit();
    });
});
