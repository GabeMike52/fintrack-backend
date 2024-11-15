import { Request, Response, NextFunction } from "express";
import { Schema, model } from "mongoose";
import { User } from "../schemas/userSchema";
import { AuthRequest, generateToken } from "../middleawares/token";

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

async function loginUser(req: AuthRequest, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(401).send({ message: "Invalid credentials" });
        } else {
            const token = generateToken(user._id.toString());
            const userNoPassword = user.toJSON();
            delete (userNoPassword as { password?: string }).password;
            res.status(200).send({
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ error: "Login failed" });
    }
}

export { registerUser, loginUser };
