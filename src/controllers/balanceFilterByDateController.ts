import { Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleware/token";

async function showBalanceByDate(req: AuthRequest, res: Response) {
    try {
        const { month, year } = req.query;
        if (!month || !year || isNaN(Number(month)) || isNaN(Number(year))) {
            res.status(400).send({ message: "Month and Year are required!" });
            return;
        }
        const monthNumber = parseInt(month as string, 10);
        const yearNumber = parseInt(year as string, 10);

        const incomes = await Income.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, monthNumber] },
                    { $eq: [{ $year: "$date" }, yearNumber] },
                ],
            },
        });

        const expenses = await Expense.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, monthNumber] },
                    { $eq: [{ $year: "$date" }, yearNumber] },
                ],
            },
        });

        const totalIncomes = incomes.reduce((sum, incomes) => sum + incomes.value, 0);
        const totalExpenses = incomes.reduce((sum, expenses) => sum + expenses.value, 0);
        const balance = totalIncomes - totalExpenses;
        res.status(200).send({
            totalIncomes,
            totalExpenses,
            balance,
        });
    } catch (error) {
        console.error("Error while filtering balance: ", error);
        res.status(500).send({ error: "Failed to retrieve data" });
    }
}

export { showBalanceByDate };
