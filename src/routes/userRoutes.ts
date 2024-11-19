import { Router } from "express";
import user from "../controllers/userController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/register", user.register);
router.post("/login", user.login);
router.patch("/:userId", authMiddleware, user.changePassword);

export default router;
