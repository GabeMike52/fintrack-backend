import { Router } from "express";
import { showBalance, showBalanceByDate } from "../controllers/balanceController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.get("/", authMiddleware, showBalance);
router.get("/filter", authMiddleware, showBalanceByDate);

export default router;
