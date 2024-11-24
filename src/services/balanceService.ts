import { ParsedUrlQuery } from "querystring";
import { Expense } from "../schemas/expenseSchema";
import { Income } from "../schemas/incomeSchema";
import { Query, QueryOptions, QuerySelector } from "mongoose";

const balanceService = { getBalance, getBalanceByDate };

//OBS: Might be useless
async function getBalance(userId: string | undefined) {
    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });
    //This might be wrong, gotta test
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
    return { totalIncomes, totalExpenses, balance };
}

async function getBalanceByDate(
    userId: string | undefined,
    month: string | QueryOptions | string[] | undefined,
    year: string | QueryOptions | string[] | undefined
) {
    if (!month || !year) {
        throw new Error("Month and year are required!");
    }
    const numericMonth = parseInt(month as string, 10);
    const numericYear = parseInt(year as string, 10);
    if (isNaN(numericMonth) || isNaN(numericYear) || numericMonth < 1 || numericMonth > 12) {
        throw new Error("Invalid month or year!");
    }

    const startDate = new Date(Date.UTC(numericYear, numericMonth - 1, 1));
    const endDate = new Date(Date.UTC(numericYear, numericMonth - 1, 1));
    endDate.setMonth(endDate.getMonth() + 1);

    const incomes = await Income.find({
        userId,
        receiptDate: { $gte: startDate, $lt: endDate },
    });
    const expenses = await Expense.find({
        userId,
        paymentDate: { $gte: startDate, $lt: endDate },
    });

    const totalIncomes = incomes.reduce((sum, incomes) => sum + incomes.value, 0);
    const totalExpenses = expenses.reduce((sum, expenses) => sum + expenses.value, 0);
    const balance = totalIncomes - totalExpenses;
    return { totalIncomes, totalExpenses, balance };
}

export default balanceService;
