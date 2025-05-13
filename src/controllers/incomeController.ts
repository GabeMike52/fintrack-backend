import { Response } from "express";
import { AuthRequest } from "../middleware/token";
import incomeService from "../services/incomeService";
import logger from "../config/logger";

const income = { createIncome, listIncomes, updateIncome, deleteIncome };

async function createIncome(req: AuthRequest, res: Response) {
    try {
        const { title, description, value, isMonthly, receiptDate } = req.body;
        const userId = req.userId;
        const income = await incomeService.incomeCreate(
            title,
            description,
            value,
            userId,
            isMonthly,
            receiptDate
        );
        res.status(201).send({ message: "Income successfully created!", income });
    } catch (error) {
        logger.error("Error creating income:", error);
        res.status(400).send({ error: "Income creation failed!" });
    }
}

async function listIncomes(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId;
        const incomes = await incomeService.incomesGet(userId);
        res.status(200).send(incomes);
    } catch (error) {
        logger.error("Error while getting incomes:", error);
        res.status(404).send({
            error: "Couldn't find any incomes with this userId!",
        });
    }
}

async function updateIncome(req: AuthRequest, res: Response) {
    try {
        const incomeId = req.params.incomeId;
        const { title, description, value, isMonthly, receiptDate } = req.body;
        const income = await incomeService.incomeUpdate(
            incomeId,
            title,
            description,
            value,
            isMonthly,
            receiptDate
        );
        res.status(200).send({ message: "Income was successfully updated!", income });
    } catch (error) {
        logger.error("Error while updating income:", error);
        res.status(304).send({ error: "Income update failed!" });
    }
}

async function deleteIncome(req: AuthRequest, res: Response) {
    try {
        const incomeId = req.params.incomeId;
        await incomeService.incomeDelete(incomeId);
        res.status(204).send({ ok: "ok" });
    } catch (error) {
        logger.error("Error while deleting income:", error);
        res.status(500).send({ error: "Failed to delete!" });
    }
}

export default income;
