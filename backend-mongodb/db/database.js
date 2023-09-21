const { MongoClient } = require("mongodb");

const database = {
    openDb: async function openDb() {
        const uri =
            "mongodb+srv://adriandedorson2:8PJFVm5m6xStZS59@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas URI

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
