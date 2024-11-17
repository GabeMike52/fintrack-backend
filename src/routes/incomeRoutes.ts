import { Router } from "express";
import { createIncome } from "../controllers/incomeCreateController";
import { listIncomes } from "../controllers/incomeListController";
import { deleteIncome } from "../controllers/incomeDeleteController";
import { updateIncome } from "../controllers/incomeUpdateController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/", authMiddleware, createIncome);
router.get("/", authMiddleware, listIncomes);
router.delete("/:incomeId", authMiddleware, deleteIncome);
router.patch("/:incomeId", authMiddleware, updateIncome);

export default router;
