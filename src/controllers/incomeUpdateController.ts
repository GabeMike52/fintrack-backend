import { Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleware/token";

async function updateIncome(req: AuthRequest, res: Response) {
    try {
        const income = await Income.findOne({ _id: req.params.incomeId });
        const incomeTitle = income?.title;
        const incomeValue = income?.value;
        if (!incomeTitle || !incomeValue) {
            res.status(400).send({ message: "You need to fill the income fields!" });
            return;
        }
        await income?.updateOne(req.body);
        res.status(200).send({ message: "Income was successfully updated!" });
    } catch (error) {
        console.error("Error while updating income:", error);
        res.status(304).send({ error: "Income update failed!" });
    }
}

export { updateIncome };
