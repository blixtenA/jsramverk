const { MongoClient } = require("mongodb");

const database = {
    openDb: async function openDb() {
        let dbName = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === "test") {
            dbName = "testlocal"; // Use "testlocal" as the database name for testing
        }

        const client = new MongoClient(uri);

        try {
            await client.connect();
            console.log("Connected to MongoDB Atlas");
            const db = client.db(dbName); // Use the selected database name

            return db;
        } catch (error) {
            console.error("Error connecting to MongoDB Atlas:", error);
            throw error;
        }
    },
};

module.exports = database;
