import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { dbUser, dbPassword } from "../../credentials";
import { authMiddleware } from "../middleawares/token";
import { registerUser } from "../controllers/registerController";
import { loginUser } from "../controllers/loginController";
import { createIncome } from "../controllers/incomeCreateController";
import { listIncomes } from "../controllers/incomeListController";
import { deleteIncome } from "../controllers/incomeDeleteController";
import { createExpense } from "../controllers/expenseCreateController";
import { listExpenses } from "../controllers/expenseListController";
import { deleteExpense } from "../controllers/expenseDeleteController";
import { create } from "domain";

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

//Income Create Route
app.post("/incomes", authMiddleware, createIncome);

//Income List Route
app.get("/incomes/list", authMiddleware, listIncomes);

//Income Delete Route
app.delete("/incomes/:incomeId", authMiddleware, deleteIncome); //This endpoint possibly has a weak point, but I'll treat it later

//Expense Create Route
app.post("/expenses", authMiddleware, createExpense);

//Expense List Route
app.get("/expenses/list", authMiddleware, listExpenses);

//Expense Delete Route
app.delete("/expenses/:expenseId", authMiddleware, deleteExpense);

export { app };
