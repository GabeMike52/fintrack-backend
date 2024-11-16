import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleawares/token";

async function expenseUpdate(req: AuthRequest, res: Response) {
    try {
        const expense = await Expense.findOne({ _id: req.params.expenseId });
        const expenseTitle = expense?.title;
        const expenseValue = expense?.value;
        if (!expenseTitle || !expenseValue) {
            res.status(400).send({ message: "You need to fill the expense fields!" });
            return;
        }
        await expense.updateOne(req.body);
        res.status(200).send({ message: "Expense was successfully updated!" });
    } catch (error) {
        console.error("Error while updating expense:", error);
        res.status(304).send({ error: "Expense update failed!" });
    }
}
