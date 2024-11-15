import { Request, Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleawares/token";

async function deleteIncome(req: AuthRequest, res: Response) {
    try {
        const income = await Income.findOne({ _id: req.params.incomeId });
        await income?.deleteOne();
        res.status(204).send({ ok: "ok" });
    } catch (error) {
        console.error("Error while deleting income!", error);
        res.status(500).send({ error: "Failed to delete!" });
    }
}

export { deleteIncome };
