import { Router } from "express";
import { createExpense } from "../controllers/expenseCreateController";
import { listExpenses } from "../controllers/expenseListController";
import { deleteExpense } from "../controllers/expenseDeleteController";
import { updateExpense } from "../controllers/expenseUpdateController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, listExpenses);
router.delete("/:expenseId", authMiddleware, deleteExpense);
router.patch("/:expenseId", authMiddleware, updateExpense);

export default router;
