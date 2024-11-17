import { Router } from "express";
import { showBalance } from "../controllers/balanceController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.get("/", authMiddleware, showBalance);

export default router;
