import { Router } from "express";
import expense from "../controllers/expenseController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/", authMiddleware, expense.createExpense);
router.get("/", authMiddleware, expense.listExpenses);
router.delete("/:expenseId", authMiddleware, expense.deleteExpense);
router.patch("/:expenseId", authMiddleware, expense.updateExpense);

export default router;
