import { Router } from "express";
import balance from "../controllers/balanceController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.get("/", authMiddleware, balance.show);
router.get("/filter", authMiddleware, balance.showByDate);

export default router;
