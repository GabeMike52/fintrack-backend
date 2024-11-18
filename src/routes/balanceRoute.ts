import { Router } from "express";
import { showBalance } from "../controllers/balanceController";
import { showBalanceByDate } from "../controllers/balanceFilterByDateController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.get("/", authMiddleware, showBalance);
router.get("/filter", authMiddleware, showBalanceByDate);

export default router;
