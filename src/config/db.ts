import mongoose, { ConnectOptions } from "mongoose";
import { dbUser, dbPassword } from "../../credentials";

const uri: string = `mongodb+srv://${dbUser}:${dbPassword}@fintrack.wwglm.mongodb.net/?retryWrites=true&w=majority&appName=FinTrack`;
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
        console.log("Pinged your deployment. You succsessfully connected to MongoDB!");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connecToMongo;
