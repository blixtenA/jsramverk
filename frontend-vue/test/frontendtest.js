const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Options } = require("selenium-webdriver/chrome");
const { assert } = require("chai");

// Load environment variables from .env
require("dotenv").config();

// Get ChromeDriver path and port from environment variables
const chromeDriverPath = process.env.CHROME_DRIVER_PATH;
const chromeDriverPort = parseInt(process.env.CHROME_DRIVER_PORT || 8080);

console.log(`ChromeDriver path: ${chromeDriverPath}`);
console.log(`ChromeDriver port: ${chromeDriverPort}`);

// Set the ChromeDriver path as a system property
process.env["webdriver.chrome.driver"] = chromeDriverPath;

// Configure Chrome options for headless mode
const options = new Options()
    .setChromeBinaryPath(chromeDriverPath) // Use the specified binary path
    .headless(); // Enable headless mode

console.log("Chrome options:", options);

// Build the WebDriver instance for Chrome
const browser = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

console.log("WebDriver instance created");

//const targetURL = "https://www.student.bth.se/~anbx22/editor/#/";
// const targetURL = "http://localhost:8080";
const targetURL = "https://www.student.bth.se/~adde22/editor/#/";

describe("Test Suite", function () {
    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function (element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function (url) {
            assert.ok(url.endsWith("multipage/" + target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function (element) {
            element.getText().then(function (text) {
                assert.equal(text, target);
            });
        });
    }

    this.timeout(20000);

    before(async function () {
        console.log("Launching Chrome...");
        await browser.get(targetURL);
        console.log("Current URL:", await browser.getCurrentUrl());
    });

    it("should find the <body> element", async function () {
        const bodyElement = await browser.findElement(By.tagName("body"));
        assert.isNotNull(bodyElement, "Found the <body> element");
    });

    it("should find the <head> element", async function () {
        const headElement = await browser.findElement(By.tagName("head"));
        assert.isNotNull(headElement, "Found the <head> element");
    });

    it("should wait for element to be visible", async function () {
        const element = await browser.findElement(By.className("delayed-trains"));
        await browser.wait(until.elementIsVisible(element), 20000); // Wait for element to be visible

        assert.isTrue(await element.isDisplayed());
    });

    it("Test index", function (done) {
        browser.getTitle().then(function (title) {
            assert.equal(
                title,
                "Train controller",
                "Page title should match 'Train controller'"
            );
        });

        assertH1("Home");
        matchUrl("#!/");

        done();
    });

    it("Test go to Home", function (done) {
        // try using the nav link
        goToNavLink("Home");

        assertH1("Home");
        matchUrl("#!/");

        done();
    });

    it("should count the number of markers = 1 after clicking and assert same train nr", async function () {
        // Simulate clicking the first delay (should be at least one, because Sweden)
        console.log("Locating .train-number element...");

        const firstDelayedItem = await browser.wait(
            until.elementLocated(By.css(".train-item:first-child .train-number")),
            10000
        );

        console.log(".train-number element located. Clicking...");

        await browser.wait(until.elementIsEnabled(firstDelayedItem), 20000); // Wait for element to be clickable
        await firstDelayedItem.click();

        const markerSelector = By.css(".leaflet-marker-icon");
        const markerElements = await browser.findElements(markerSelector);
        const markerCount = markerElements.length;

        assert.equal(markerCount, 1, "Expected 1 marker after the click");
        console.log(`Number of markers on the map after click: ${markerCount}`);

        // Get the train number from the clicked item
        const clickedItemTrainNumber = await firstDelayedItem.getText();

        const leafletMarker = await browser.findElement(
            By.css(".leaflet-marker-icon")
        );

        // Extract the train number from the Leaflet
        const trainNumberFromMarker = await browser.executeScript(function (
            marker
        ) {
            return marker.dataset.trainnumber || null;
        },
        leafletMarker);

        assert.equal(
            clickedItemTrainNumber,
            trainNumberFromMarker,
            "Train numbers should match"
        );
    });

    it("should open the ticket view when clicking a delayed item", async function () {
        // Simulate clicking the first delay (should be at least one, because Sweden)
        console.log("Locating .train-number element...");
        const firstDelayedItem = await browser.wait(
            until.elementLocated(By.css(".train-item:first-child .train-number")),
            10000
        );

        /* Swap the modal to a button from a post in the list */
        const openErrandButton = await browser.findElement(
            By.xpath('//button[@class="edit-button1" or @class="create-button"]')
        );
        await openErrandButton.click();

        // Wait for the ticket view container to be visible
        console.log("Waiting for ticket view container to be visible...");
        const ticketViewContainer = await browser.wait(
            until.elementLocated(By.className("modal")),
            10000
        );

        await browser.wait(until.elementIsVisible(ticketViewContainer), 20000); // Wait for element to be visible

        // Find elements within the ticket view
        console.log("Finding elements within the ticket view...");
        const ticketTitle = await ticketViewContainer.findElement(By.css("h1"));
        const backButton = await ticketViewContainer.findElement(
            By.css("button")
        );

        // asserts
        assert.isTrue(await ticketTitle.isDisplayed());
        assert.isTrue(await backButton.isDisplayed());
    });

    it("should refresh the page", async function () {
        console.log("refreshing");
        await browser.navigate().refresh();
    });

    it("Map element displays and markers are filtered when clicking a marker on the map", async function () {
        await browser.sleep(5000);

        /* Check that we have a map */
        const mapSelector = By.css(".map");
        const mapElement = await browser.findElement(mapSelector);
        assert.isTrue(
            await mapElement.isDisplayed(),
            "Map element should be displayed"
        );

        /* Get marker data-trainnumber */
        const markerDataTrainNumbers = await browser.executeScript(function () {
            const markers = document.querySelectorAll(
                ".leaflet-marker-icon[data-trainnumber]"
            );
            const trainNumbers = [];
            markers.forEach(function (marker) {
                trainNumbers.push(marker.getAttribute("data-trainnumber"));
            });
            return trainNumbers;
        });

        /* Simulate clicking the first marker */
        const markerIndex = 0;
        await browser.executeScript(function (index) {
            const markers = document.querySelectorAll(
                ".leaflet-marker-icon[data-trainnumber]"
            );
            markers[index].click();
        }, markerIndex);

        await browser.sleep(2000);

        /* Get marker data-trainnumber after click */
        const markerDataAfter = await browser.executeScript(function () {
            const markers = document.querySelectorAll(
                ".leaflet-marker-icon[data-trainnumber]"
            );
            const trainNumbers = [];
            markers.forEach(function (marker) {
                trainNumbers.push(marker.getAttribute("data-trainnumber"));
            });
            return trainNumbers;
        });

        assert.equal(
            markerDataAfter.length,
            1,
            "Expected 1 marker after the click"
        );
        assert.equal(
            markerDataAfter[0],
            markerDataTrainNumbers[markerIndex],
            "Clicked marker trainNumber should match"
        );
    });

    after(async function () {
        console.log("Quitting browser");
        await browser.quit();
    });
});
