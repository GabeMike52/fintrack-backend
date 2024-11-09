import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { User } from "../schemas/userSchema";
import { dbUser, dbPassword } from "../../mongoCredential";

const uri: string = `mongodb+srv://${dbUser}:${dbPassword}@fintrack.wwglm.mongodb.net/?retryWrites=true&w=majority&appName=FinTrack`;

const clientOptions: ConnectOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};

async function run(): Promise<void> {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db?.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You succsessfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    } finally {
        await mongoose.disconnect();
    }
}

run().catch(console.error);

const app = express();
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("Hello, World!");
});

export { app };
