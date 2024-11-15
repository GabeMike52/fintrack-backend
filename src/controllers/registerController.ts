import { Request, Response } from "express";
import { User } from "../schemas/userSchema";

async function registerUser(req: Request, res: Response) {
    try {
        const { name, email, password, theme } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).send({ error: "E-mail already in use" });
            return;
        }
        const user = new User({ name, email, password, theme });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error("Error while registrating:", error);
        res.status(400).send({ error: "Failed to registrate user" });
    }
}

export { registerUser };
