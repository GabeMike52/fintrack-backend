import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleware/token";

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

export { deleteExpense };
