const { MongoClient } = require("mongodb");

const database = {
    openDb: async function openDb() {
        // Construct the MongoDB Atlas URI using environment variables
        const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority`;

        const client = new MongoClient(uri);

        try {
            await client.connect();
            console.log("Connected to MongoDB Atlas");
            const db = client.db("test"); // Use your desired database name here

            return db;
        } catch (error) {
            console.error("Error connecting to MongoDB Atlas:", error);
            throw error;
        }
    },
};

module.exports = database;
