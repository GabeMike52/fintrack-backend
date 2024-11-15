import { Response } from "express";
import { User } from "../schemas/userSchema";
import { authMiddleware, AuthRequest } from "../middleawares/token";

async function changeUserPassword(req: AuthRequest, res: Response) {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        await user?.updateOne();
        res.status(200).send(user);
    } catch (error) {
        console.error("Error while changing password:", error);
        res.status(304).send({ error: "Password change failed!" });
    }
}

export { changeUserPassword };
