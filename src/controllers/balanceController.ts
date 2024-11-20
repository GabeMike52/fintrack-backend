import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleware/token";

const balance = { show, showByDate };

async function show(req: AuthRequest, res: Response) {
    try {
        const incomes = await Income.find({ userId: req.userId });
        const expenses = await Expense.find({ userId: req.userId });
        const totalIncomes = incomes.reduce((sum, income) => sum + income.value, 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);

        //In case the application expands
        /* const totalIncomeResult = await Income.aggregate([
            { $match: { userId: req.userId } },
            { $group: { _id: null, total: { $sum: "$value" } } },
        ]);
        const totalIncome = totalIncomeResult[0]?.total || 0; 
        
        const totalExpenseResult = await Expense.aggregate([
            { $match: { userId: req.userId } },
            { $group: { _id: null, total: { $sum: "$value" } } }
        ]);
        const totalExpense = totalExpenseResult[0]?.total || 0;*/

        const balance = totalIncomes - totalExpenses;
        res.status(200).send({
            message: "Balance generated",
            totalIncomes,
            totalExpenses,
            balance,
        });
    } catch (error) {
        console.error("Error while getting balance:", error);
        res.status(500).send({ error: "Failed to calculate balance!" });
    }
}

async function showByDate(req: AuthRequest, res: Response) {
    try {
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
        res.status(200).send({
            message: "Balance by date generated",
            month,
            year,
            totalIncomes,
            totalExpenses,
            balance,
        });
    } catch (error) {
        console.error("Error while filtering balance: ", error);
        res.status(500).send({ error: "Failed to retrieve data" });
    }
}

export default balance;
