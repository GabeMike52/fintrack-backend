import { Response } from "express";
import { AuthRequest } from "../middleware/token";
import { getBalance } from "../service/getBalance";
import { getBalanceByDate } from "../service/getBalanceByDate";

const balance = { show, showByDate };

async function show(req: AuthRequest, res: Response) {
    try {
        const balance = getBalance;
        res.status(200).send({
            message: "Balance generated",
            balance,
        });
    } catch (error) {
        console.error("Error while getting balance:", error);
        res.status(500).send({ error: "Failed to calculate balance!" });
    }
}

async function showByDate(req: AuthRequest, res: Response) {
    try {
        const balance = getBalanceByDate;
        res.status(200).send({
            message: "Balance by date generated",
            balance,
        });
    } catch (error) {
        console.error("Error while filtering balance: ", error);
        res.status(500).send({ error: "Failed to retrieve data" });
    }
}

export default balance;
