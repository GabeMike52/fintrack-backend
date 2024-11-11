import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { User } from "../schemas/userSchema";
import { dbUser, dbPassword } from "../../mongoCredential";

//Setting up MongoDB connection
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
    }
}

run().catch(console.error);

//Setting up express
const app = express();
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

//Register Endpoint: Working, tested
app.post("/register", async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, theme } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).send({ error: "Email already in use" });
            return;
        }
        const user = new User({ name, email, password, theme });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error("Error while registrating:", error);
        res.status(400).send({ error: "Registration failed!" });
    }
});

//Login Endpoint: Working, tested
app.post("/login", async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(401).send("Invalid Credentials!");
        } else {
            const userNoPassword = user.toJSON();
            delete (userNoPassword as { password?: string }).password;
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export { app };
