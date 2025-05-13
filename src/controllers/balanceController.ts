import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleware/token";
import balanceService from "../services/balanceService";
import logger from "../config/logger";

const balance = { show, showByDate };

async function show(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;
        const { totalIncomes, totalExpenses, balance } = await balanceService.getBalance(userId);
        res.status(200).send({
            message: "Balance generated",
            totalIncomes,
            totalExpenses,
            balance,
        });
    } catch (error) {
        logger.error("Error while getting balance:", error);
        res.status(500).send({ error: "Failed to calculate balance!" });
    }
}

async function showByDate(req: AuthRequest, res: Response) {
    try {
        const { month, year } = req.query;
        const userId = req.userId;
        const { totalIncomes, totalExpenses, balance } = await balanceService.getBalanceByDate(
            userId,
            month,
            year
        );
        res.status(200).send({
            message: "Balance by date generated",
            month,
            year,
            totalIncomes,
            totalExpenses,
            balance,
        });
    } catch (error) {
        logger.error("Error while filtering balance: ", error);
        res.status(500).send({ error: "Failed to retrieve data" });
    }
}

export default balance;
