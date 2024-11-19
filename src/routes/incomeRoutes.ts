import { Router } from "express";
import income from "../controllers/incomeController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/", authMiddleware, income.createIncome);
router.get("/", authMiddleware, income.listIncomes);
router.delete("/:incomeId", authMiddleware, income.deleteIncome);
router.patch("/:incomeId", authMiddleware, income.updateIncome);

export default router;
