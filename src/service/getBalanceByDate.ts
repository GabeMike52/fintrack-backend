import { Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleware/token";
import { getBalance } from "../service/getBalance";

async function getBalanceByDate(req: AuthRequest, res: Response) {
    const { month, year } = req.query;
    if (!month || !year) {
        res.status(400).send({ message: "Month and year are required!" });
        return;
    }

    const numericMonth = parseInt(month as string, 10);
    const numericYear = parseInt(year as string, 10);
    if (isNaN(numericMonth) || isNaN(numericYear) || numericMonth < 1 || numericMonth > 12) {
        res.status(400).send({ message: "Invalid month or year" });
        return;
    }

    const startDate = new Date(Date.UTC(numericYear, numericMonth - 1, 1));
    const endDate = new Date(Date.UTC(numericYear, numericMonth - 1, 1));
    endDate.setMonth(endDate.getMonth() + 1);

    const incomes = await Income.find({
        userId: req.userId,
        receiptDate: { $gte: startDate, $lt: endDate },
    });
    const expenses = await Expense.find({
        userId: req.userId,
        paymentDate: { $gte: startDate, $lt: endDate },
    });
    const totalIncomes = incomes.reduce((sum, incomes) => sum + incomes.value, 0);
    const totalExpenses = expenses.reduce((sum, expenses) => sum + expenses.value, 0);
    const balance = totalIncomes - totalExpenses;
    return { month, year, totalIncomes, totalExpenses, balance };
}

export { getBalanceByDate };
