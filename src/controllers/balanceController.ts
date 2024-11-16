import { Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleawares/token";

async function showBalance(req: AuthRequest, res: Response) {
    try {
        const incomes = await Income.find({ userId: req.userId });
        const expenses = await Expense.find({ userId: req.userId });
        const totalIncome = incomes.reduce((sum, income) => sum + income.value, 0);
        const totalExpense = expenses.reduce((sum, expense) => sum + expense.value, 0);

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

        const balance = totalIncome - totalExpense;
        res.status(200).send({
            totalIncome,
            totalExpense,
            balance,
        });
    } catch (error) {
        console.error("Error while getting balance:", error);
        res.status(500).send({ error: "Failed to calculate balance!" });
    }
}

export { showBalance };
