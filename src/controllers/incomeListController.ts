import { Request, Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleawares/token";

async function listIncome(req: AuthRequest, res: Response) {
    try {
        const income = await Income.find({ userId: req.userId });
        res.status(200).send(income);
    } catch (error) {
        console.error("Error while getting incomes!", error);
        res.status(404).send({
            error: "Couldn't find any incomes with this userId!",
        });
    }
}

export { listIncome };
