import { Request, Response } from "express";
import userService from "../services/userService";
import { AuthRequest } from "../middleware/token";

const user = { register, login, changePassword };

async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser(name, email, password);
        res.status(201).send(user);
    } catch (error) {
        console.error("Error while registrating:", error);
        res.status(400).send({ error: "Failed to registrate user" });
    }
}

async function login(req: AuthRequest, res: Response) {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.status(200).send({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ error: "Login failed" });
    }
}

async function changePassword(req: AuthRequest, res: Response) {
    try {
        const { userId } = req.params;
        const { password } = req.body;
        const result = await userService.changeUserPassword(userId, password);
        res.status(200).send({ message: "Password was successfully changed!" });
    } catch (error) {
        console.error("Error while changing password:", error);
        res.status(304).send({ error: "Password change failed!" });
    }
}

export default user;
