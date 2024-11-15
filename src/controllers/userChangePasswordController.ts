import { Response } from "express";
import { User } from "../schemas/userSchema";
import { AuthRequest } from "../middleawares/token";

async function changeUserPassword(req: AuthRequest, res: Response) {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const userPassword = user?.password;
        const newPassword = req.body.password;
        if (newPassword == userPassword) {
            res.status(400).send({ message: "The password needs to be different!" });
            return;
        }
        await user?.updateOne(req.body);
        res.status(200).send({ message: "Password was successfully changed!" });
    } catch (error) {
        console.error("Error while changing password:", error);
        res.status(304).send({ error: "Password change failed!" });
    }
}

export { changeUserPassword };
