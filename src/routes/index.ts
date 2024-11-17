import { Router } from "express";
import userRoutes from "./userRoutes";
import incomeRoutes from "./incomeRoutes";
import expenseRoutes from "./expenseRoutes";
import balanceRoute from "./balanceRoute";

const router = Router();

router.use("/users", userRoutes);
router.use("/incomes", incomeRoutes);
router.use("/expenses", expenseRoutes);
router.use("/balance", balanceRoute);

export default router;
