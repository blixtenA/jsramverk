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

    createTicket: async function createTicket(req, res) {
        const client = new MongoClient(
            `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`,
        );

        try {
            await client.connect();
            const db = client.db("test"); // Replace with your MongoDB database name

            const result = await db.collection("tickets").insertOne({
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            });

            return res.json({
                data: {
                    id: result.insertedId, // Use insertedId to get the generated ID
                    code: req.body.code,
                    trainnumber: req.body.trainnumber,
                    traindate: req.body.traindate,
                },
            });
        } finally {
            client.close();
        }
    },
};

module.exports = tickets;
