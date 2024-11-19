import { Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleware/token";

const income = { createIncome, listIncomes, updateIncome, deleteIncome };

async function createIncome(req: AuthRequest, res: Response) {
    try {
        const { title, description, value, isMonthly, receiptDate } = req.body;
        const userId = req.userId;
        const incomeExists = await Income.findOne({ title });
        if (incomeExists) {
            res.status(400).send({
                error: "An income with this title already exists!",
            });
            return;
        }
        const income = new Income({
            title,
            description,
            value,
            isMonthly,
            receiptDate,
            userId,
        });
        await income.save();
        res.status(201).send({ message: "Income successfully created!", income });
    } catch (error) {
        console.error("Error creating income:", error);
        res.status(400).send({ error: "Income creation failed!" });
    }
}

async function deleteIncome(req: AuthRequest, res: Response) {
    try {
        const income = await Income.findOne({ _id: req.params.incomeId });
        await income?.deleteOne();
        res.status(204).send({ ok: "ok" });
    } catch (error) {
        console.error("Error while deleting income:", error);
        res.status(500).send({ error: "Failed to delete!" });
    }
}

async function listIncomes(req: AuthRequest, res: Response) {
    try {
        const income = await Income.find({ userId: req.userId });
        res.status(200).send(income);
    } catch (error) {
        console.error("Error while getting incomes:", error);
        res.status(404).send({
            error: "Couldn't find any incomes with this userId!",
        });
    }
}

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

export default income;
