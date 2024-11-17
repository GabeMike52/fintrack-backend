import { Response } from "express";
import { User } from "../schemas/userSchema";
import { AuthRequest, generateToken } from "../middleware/token";

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

export { loginUser };
