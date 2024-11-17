import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleware/token";

async function listExpenses(req: AuthRequest, res: Response) {
    try {
        const expense = await Expense.find({ userId: req.userId });
        res.status(200).send(expense);
    } catch (error) {
        console.error("Error while getting expenses:", error);
        res.status(404).send({ error: "Couldn't find any expenses with this userId!" });
    }
}

export { listExpenses };
