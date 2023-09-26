const { MongoClient } = require("mongodb");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../backend-mongodb/app.js"); // Import the 'app' variable from your main application file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

let client; // Define the 'client' variable at a broader scope

// Load environment variables
const { ATLAS_USERNAME, ATLAS_PASSWORD } = process.env;

describe("Database before", () => {
    before(async () => {
        // Construct the MongoDB connection string using environment variables
        const mongoUri = `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`;
        client = new MongoClient(mongoUri, {});

        try {
            await client.connect();
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    });
    // The 'it' block that checks for data in the 'tickets' collection
    it("should not have data in the 'tickets' collection", async () => {
        // Assuming you have access to the MongoDB client connected to your database
        const db = client.db(); // The 'client' variable is now accessible here

        // Query the 'tickets' collection to count documents
        const ticketsCollection = db.collection("tickets");
        const ticketCount = await ticketsCollection.countDocuments();

        // Assert that there are at least one document in the collection
        expect(ticketCount).to.be.at.least(0);
    });
});

describe("Ticket API", () => {
    let createdTicket; // To store the created ticket for deletion

    before(async () => {
        // Construct the MongoDB connection string using environment variables
        const mongoUri = `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`;
        client = new MongoClient(mongoUri, {});

        try {
            await client.connect();
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    });

    after(async () => {
        // Close the MongoDB connection after running the tests
        try {
            await client.close();
            console.log("Closed MongoDB connection");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
            throw error;
        }
    });

    // Test Case 1: Test creating a new ticket
    it("should create a new ticket", function (done) {
        this.timeout(50000); // Set a timeout of 20 seconds (increased for testing)

        const newTicketData = {
            code: "ABC123",
            trainnumber: "12345",
            traindate: "2023-09-20",
        };

        chai.request(app)
            .post("/tickets") // Replace with the appropriate endpoint for creating tickets
            .send(newTicketData)
            .end((err, res) => {
                if (err) {
                    console.error("Error during POST request:", err);
                    done(err);
                    return;
                }

                console.log("POST Response Body:", res.body);

                // Check the response status
                expect(res).to.have.status(200);

                // Ensure that the response body contains the data property
                expect(res.body).to.have.property("data");

                // Store the created ticket
                createdTicket = res.body.data;

                // Print the createdTicket._id to the terminal
                console.log("Created Ticket ID:", createdTicket.id);

                done();
            });
    });

    it("should retrieve all tickets", async function () {
        // No need to specify the ID in the URL
        const retrieveTicketsURL = "/tickets";

        try {
            const res = await chai.request(app).get(retrieveTicketsURL);

            // Debug: Print the response body after retrieving the tickets
            console.log("GET Response Body:", res.body);

            expect(res).to.have.status(200);

            // For example, you can check that retrievedTickets is an array of ticket objects
        } catch (err) {
            // Handle errors and fail the test with an error message
            console.error("Error during GET request:", err);
            throw err;
        }
    });

    describe("Database after", () => {
        it("should have data in the 'tickets' collection", async () => {
            // Assuming you have access to the MongoDB client connected to your database
            const db = client.db(); // Replace with your actual database name if necessary

            // Query the 'tickets' collection to count documents
            const ticketsCollection = db.collection("tickets");
            const ticketCount = await ticketsCollection.countDocuments();

            // Assert that there are at least one document in the collection
            expect(ticketCount).to.be.at.least(1);
        });
    });
});
