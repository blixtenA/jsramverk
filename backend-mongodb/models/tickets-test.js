const { MongoClient } = require("mongodb");

const tickets = {
    getTickets: async function getTickets(req, res) {
        const client = new MongoClient(`mongodb://localhost:27017/testlocal`);

        try {
            await client.connect();
            const db = client.db("testlocal"); // Use the "testlocal" database name

            const allTickets = await db.collection("tickets").find().toArray();

            return res.json({
                data: allTickets,
            });
        } finally {
            client.close();
        }
    },

    createTicket: async function createTicket(req, res) {
        const client = new MongoClient(`mongodb://localhost:27017/testlocal`);

        try {
            await client.connect();
            const db = client.db("testlocal"); // Use the "testlocal" database name

            const result = await db.collection("tickets").insertOne({
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
                activityid: req.body.activityid,
            });

            return res.json({
                data: {
                    id: result.insertedId, // Use insertedId to get the generated ID
                    code: req.body.code,
                    trainnumber: req.body.trainnumber,
                    traindate: req.body.traindate,
                    activityid: req.body.activityid,
                },
            });
        } finally {
            client.close();
        }
    },
};

module.exports = tickets;
