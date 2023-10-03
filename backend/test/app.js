/* global it describe */

process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const HTMLparser = require("node-html-parser");
const app = require("../../backend-mongodb/app.js"); // Import the 'app' variable from your main application file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe("Server Connection Behavior", () => {
    let server; // Declare a variable to hold the server instance
    const testPort = 3000; // Choose a port for your test environment (e.g., 3000)

    // Before running the tests, start the server on the selected port
    before((done) => {
        server = app.listen(testPort, () => {
            console.log(`Test server is running on port ${testPort}`);
            done();
        });
    });

    // After running the tests, close the server to release the port
    after(() => {
        server.close();
    });

    // This is just an example test. Replace it with your actual test cases.
    it("should return a 200 status code when connecting to the server", (done) => {
        chai.request(app)
            .get("/") // Replace with the appropriate route or endpoint on your server
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    // Add more test cases for your server's behavior as needed
});
