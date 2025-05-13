import { Response } from "express";
import { AuthRequest } from "../middleware/token";
import expenseService from "../services/expenseService";
import logger from "../config/logger";

const expense = { createExpense, deleteExpense, listExpenses, updateExpense };

async function createExpense(req: AuthRequest, res: Response) {
    try {
        const { title, description, value, isMonthly, paymentDate } = req.body;
        const userId = req.userId;
        const expense = await expenseService.expenseCreate(
            title,
            description,
            value,
            userId,
            isMonthly,
            paymentDate
        );
        res.status(201).send({ message: "Expense was successfully created!", expense });
    } catch (error) {
        logger.error("Error creating expense:", error);
        res.status(400).send({ error: "Expense creation failed" });
    }
}

async function listExpenses(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;
        const expenses = await expenseService.expensesGet(userId);
        res.status(200).send(expenses);
    } catch (error) {
        logger.error("Error while getting expenses:", error);
        res.status(404).send({ error: "Couldn't find any expenses with this userId!" });
    }
}

async function updateExpense(req: AuthRequest, res: Response) {
    try {
        const expenseId = req.params.expenseId;
        const { title, description, value, isMonthly, paymentDate } = req.body;
        const expense = await expenseService.expenseUpdate(
            expenseId,
            title,
            description,
            value,
            isMonthly,
            paymentDate
        );
        res.status(200).send({ message: "Expense was successfully updated!", expense });
    } catch (error) {
        logger.error("Error while updating expense:", error);
        res.status(304).send({ error: "Expense update failed!" });
    }
}

async function deleteExpense(req: AuthRequest, res: Response) {
    try {
        const expenseId = req.params.expenseId;
        await expenseService.expenseDelete(expenseId);
        res.status(204).send({ ok: "ok" });
    } catch (error) {
        logger.error("Error while deleting expense:", error);
        res.status(500).send({ error: "Failed to delete!" });
    }
}

export default expense;
