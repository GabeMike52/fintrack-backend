import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { User } from "../schemas/userSchema";
import { dbUser, dbPassword, jwtSecret } from "../../credentials";
import { Income } from "../schemas/incomeSchema";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest, authMiddleware, generateToken } from "../middleawares/token";
import { registerUser, loginUser } from "../controllers/userController";
//TODO: apply the middleware into the routes so it can work. ;-;

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
        console.log("Pinged your deployment. You succsessfully connected to MongoDB!");
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

//Register Route
app.post("/register", registerUser);

//Login Route
app.post("/login", loginUser);

//TODO: password changer route

//Income creation: Working, tested
app.post("/incomes", authMiddleware, async (req: AuthRequest, res: express.Response) => {
    try {
        const { title, value, isRecurrent } = req.body;
        const userId = req.userId;
        const incomeExists = await Income.findOne({ title });
        if (incomeExists) {
            res.status(400).send({
                error: "An income with this title was already created!",
            });
            return;
        }
        // const userId = req.userId;
        const income = new Income({ title, value, isRecurrent, userId });
        console.log(income);
        await income.save();
        res.status(201).send(income);
    } catch (error) {
        console.error("Error creating income!", error);
        res.status(400).send({ error: "Income creation failed!" });
    }
});

//Income list: Working, tested
app.get("/incomes/list", authMiddleware, async (req: AuthRequest, res: express.Response) => {
    try {
        const income = await Income.find({ userId: req.userId });
        res.status(200).send(income);
    } catch (error) {
        console.error("Error while getting incomes!", error);
        res.status(404).send({
            error: "Couldn't find any incomes with this userId!",
        });
    }
});

//Income delete: Working, tested
app.delete(
    "/incomes/:incomeId",
    authMiddleware,
    async (req: AuthRequest, res: express.Response) => {
        try {
            const income = await Income.findOne({ _id: req.params.incomeId });
            await income?.deleteOne();
            res.status(204).send({ ok: "ok" });
        } catch (error) {
            console.error("Error while deleting income!", error);
            res.status(500).send({ error: "Failed to delete!" });
        }
    }
);

export { app };
