import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleware/token";
import { getExpenseData } from "../service/getExpenseData";

const expense = { createExpense, deleteExpense, listExpenses, updateExpense };

async function createExpense(req: AuthRequest, res: Response) {
    try {
        const { title, description, value, isMonthly, paymentDate } = req.body;
        const userId = req.userId;
        const expense = new Expense({
            title,
            description,
            value,
            isMonthly,
            paymentDate,
            userId,
        });
        await expense.save();
        res.status(201).send({ message: "Expense was successfully created!", expense });
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(400).send({ error: "Expense creation failed" });
    }
}

async function deleteExpense(req: AuthRequest, res: Response) {
    try {
        const expense = await Expense.findOne({ _id: req.params.expenseId });
        await expense?.deleteOne();
        res.status(204).send({ ok: "ok" });
    } catch (error) {
        console.error("Error while deleting expense:", error);
        res.status(500).send({ error: "Failed to delete!" });
    }
}

async function listExpenses(req: AuthRequest, res: Response) {
    try {
        const expense = await Expense.find({ userId: req.userId });
        res.status(200).send(expense);
    } catch (error) {
        console.error("Error while getting expenses:", error);
        res.status(404).send({ error: "Couldn't find any expenses with this userId!" });
    }
}

async function updateExpense(req: AuthRequest, res: Response) {
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

export default expense;
