import mongoose, { ConnectOptions } from "mongoose";
import ENV from "./env";
import logger from "./logger";

const uri = ENV.MONGO_URI;
const clientOptions: ConnectOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};

async function connecToMongo(): Promise<void> {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db?.admin().command({ ping: 1 });
        logger.info("Pinged your deployment. You succsessfully connected to MongoDB!");
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connecToMongo;
