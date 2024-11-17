import { Router } from "express";
import { registerUser } from "../controllers/userRegisterController";
import { loginUser } from "../controllers/userLoginController";
import { changeUserPassword } from "../controllers/userChangePasswordController";
import { authMiddleware } from "../middleware/token";

const router = Router();

router.post("/register", registerUser);
router.post("/login", authMiddleware, loginUser);
router.patch("/:userId", authMiddleware, changeUserPassword);

export default router;
