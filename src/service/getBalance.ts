import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleware/token";

async function getBalance(req: AuthRequest, res: Response) {
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
    return { totalIncome, totalExpense, balance };
}

export { getBalance };
