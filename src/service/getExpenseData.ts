import { Response } from "express";
import { AuthRequest } from "../middleware/token";

async function getExpenseData(req: AuthRequest, res: Response) {
    const { title, description, value, isMonthly, paymentDate } = req.body;
    const userId = req.userId;
    const data = { title, description, value, isMonthly, paymentDate, userId };
    return data;
}

export { getExpenseData };
