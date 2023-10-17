const { MongoClient } = require("mongodb");

const tickets = {
    getTickets: async function getTickets(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            const allTickets = await db.collection("tickets").find().toArray();

            return res.json({
                data: allTickets,
            });
        } finally {
            client.close();
        }
    },

    getTicketsByActivityId: async function getTicketsByActivityId(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            const activityId = req.params.activityId; // Get the Activity ID from the URL parameter

            // Query the database to find tickets based on the provided Activity ID
            const tickets = await db
                .collection("tickets")
                .find({ ActivityId: activityId })
                .toArray();

            return res.json({
                data: tickets,
            });
        } catch (error) {
            console.error("Error fetching tickets by Activity ID:", error);
            return res.status(500).json({
                error: "An internal server error occurred.",
            });
        } finally {
            client.close();
        }
    },

    createTicket: async function createTicket(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            // Get the selected error code from the request
            const selectedErrorCode = req.body.code;


            // Check if the selected error code exists in your error codes data
            // You can load the error codes data from your API or a file
            // For now, let's assume you have it loaded as an array called `errorCodes`
            const errorCodes = [
                // Your error codes data here
            ];

            const errorCodeExists = errorCodes.some(
                (errorCode) => errorCode.Code === selectedErrorCode
            );

            if (!errorCodeExists) {
                return res.status(400).json({
                    error: "Invalid error code selected.",
                });
            }

            // Create the ticket
            const result = await db.collection("tickets").insertOne({
                code: selectedErrorCode,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            });

            return res.json({
                data: {
                    id: result.insertedId, // Use insertedId to get the generated ID
                    code: selectedErrorCode,
                    trainnumber: req.body.trainnumber,
                    traindate: req.body.traindate,
                },
            });
        } catch (error) {
            console.error("Error creating ticket:", error);
            return res.status(500).json({
                error: "An internal server error occurred.",
            });
        } finally {
            client.close();
        }
    },
    updateTicket: async function updateTicket(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            const ticketId = req.params.id; // Get the ticket ID from the URL
            const updatedTicketData = req.body; // Get the updated ticket data from the request body

            const result = await db.collection("tickets").updateOne(
                { _id: ObjectId(ticketId) }, // Specify the ticket to update by its ID
                { $set: updatedTicketData } // Set the new data
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: "Ticket not found." });
            }

            return res.json({ message: "Ticket updated successfully." });
        } catch (error) {
            console.error("Error updating ticket:", error);
            return res
                .status(500)
                .json({ error: "An internal server error occurred." });
        } finally {
            client.close();
        }
    },

    deleteTicket: async function deleteTicket(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            const ticketId = req.params.id; // Get the ticket ID from the URL

            const result = await db.collection("tickets").deleteOne(
                { _id: ObjectId(ticketId) } // Specify the ticket to delete by its ID
            );

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Ticket not found." });
            }

            return res.json({ message: "Ticket deleted successfully." });
        } catch (error) {
            console.error("Error deleting ticket:", error);
            return res
                .status(500)
                .json({ error: "An internal server error occurred." });
        } finally {
            client.close();
        }
    },
};

module.exports = tickets;
